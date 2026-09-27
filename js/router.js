/* ============================================================
   INSTITUTO LUZ NA RUA — Roteador SPA (hash routing)
   ============================================================ */
(function () {
  'use strict';

  const rotas = {
    '/inicio':   { arquivo: 'paginas/inicio.html',   titulo: 'Instituto Luz na Rua | Alimentar, acolher e recomeçar' },
    '/projetos': { arquivo: 'paginas/projetos.html', titulo: 'Projetos e Iniciativas Solidárias | Instituto Luz na Rua' },
    '/cadastro': { arquivo: 'paginas/cadastro.html', titulo: 'Cadastro de Voluntários e Doadores | Instituto Luz na Rua' },
  };

  const ROTA_PADRAO = '/inicio';
  const app = document.getElementById('app');

  let scrollPendente = null;

  /* ------------------------------------------------------------
     Destaca o link ativo no menu
     ------------------------------------------------------------ */
  function destacarLinkAtivo(caminho) {
    document.querySelectorAll('[data-rota]').forEach((el) => {
      el.removeAttribute('aria-current');
      if (el.dataset.rota === caminho) el.setAttribute('aria-current', 'page');
    });
  }

  /* ------------------------------------------------------------
     Parse do hash: '/cadastro?perfil=doador' → {caminho, params}
     ------------------------------------------------------------ */
  function parseHash(hash) {
    const bruto = hash.replace(/^#/, '') || '/' + ROTA_PADRAO.slice(1);
    const [caminho, queryString] = bruto.split('?');
    return {
      caminho: caminho || ROTA_PADRAO,
      params: new URLSearchParams(queryString || ''),
    };
  }

  /* ------------------------------------------------------------
     Limpa e injeta o fragmento HTML no container #app
     ------------------------------------------------------------ */
  async function renderizarRota() {
    const { caminho, params } = parseHash(window.location.hash);
    const rota = rotas[caminho] || rotas[ROTA_PADRAO];

    // 1. Feedback visual imediato
    app.innerHTML = '<p class="carregando">Carregando…</p>';

    // 2. Busca o fragmento
    try {
      const resposta = await fetch(rota.arquivo);
      if (!resposta.ok) throw new Error('Rota não encontrada');
      const html = await resposta.text();

      // 3. Limpa e injeta o novo conteúdo
      app.innerHTML = html;

      // 4. Atualiza título, menu ativo e foco
      document.title = rota.titulo;
      destacarLinkAtivo(caminho);
      app.focus({ preventScroll: true });

      // 5. Pré-seleção de perfil via query string
      const perfil = params.get('perfil');
      if (perfil) {
        const radio = app.querySelector(`input[name="perfil"][value="${perfil}"]`);
        if (radio) radio.checked = true;
      }

      // 6. Rola para o topo ou para uma âncora específica
      if (scrollPendente) {
        const alvo = document.getElementById(scrollPendente);
        if (alvo) {
          alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        scrollPendente = null;
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    } catch (erro) {
      app.innerHTML = `
        <section class="secao">
          <div class="container">
            <h1>Ops, algo deu errado</h1>
            <p>Não foi possível carregar esta página agora.</p>
            <p><a href="#/inicio" class="botao botao--primario">Voltar ao início</a></p>
          </div>
        </section>`;
    }
  }

  /* ------------------------------------------------------------
     Intercepta cliques em links internos
     ------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (!link) return;

    // Guarda a âncora para rolar depois
    if (link.dataset.scrollTo) scrollPendente = link.dataset.scrollTo;

    // Se for a mesma rota já aberta, força apenas o scroll
    const atual = parseHash(window.location.hash).caminho;
    const destino = parseHash(link.getAttribute('href')).caminho;

    if (atual === destino && scrollPendente) {
      e.preventDefault();
      const alvo = document.getElementById(scrollPendente);
      if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      scrollPendente = null;

      // Fecha menu hambúrguer se estiver aberto
      const nav = document.getElementById('menu-principal');
      const toggle = document.querySelector('.menu-toggle');
      if (nav) nav.classList.remove('aberto');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ------------------------------------------------------------
     Escuta mudanças de rota
     ------------------------------------------------------------ */
  window.addEventListener('hashchange', renderizarRota);

  /* ------------------------------------------------------------
     Primeira renderização
     ------------------------------------------------------------ */
  window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
      window.location.hash = '#/inicio';
    }
    renderizarRota();
  });
})();