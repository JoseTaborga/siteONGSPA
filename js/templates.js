/* ============================================================
   INSTITUTO LUZ NA RUA — Renderização de templates
   Clona <template> do HTML e preenche com dados.
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     Helper: clona um template e retorna o primeiro elemento
     ------------------------------------------------------------ */
  function clonar(idTemplate) {
    const template = document.getElementById(idTemplate);
    if (!template) return null;
    return template.content.cloneNode(true);
  }

  /* ------------------------------------------------------------
     Renderiza os cartões de pilares (inicio.html)
     ------------------------------------------------------------ */
  function renderizarPilares() {
    const container = document.getElementById('lista-pilares');
    if (!container) return;
    container.innerHTML = '';

    window.DADOS.pilares.forEach((p) => {
      const clone = clonar('tpl-pilar');
      if (!clone) return;

      clone.querySelector('.cartao__icone').textContent = p.icone;
      clone.querySelector('.cartao__titulo').textContent = p.titulo;
      clone.querySelector('.cartao__descricao').textContent = p.descricao;

      const lista = clone.querySelector('.cartao__lista');
      p.itens.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        lista.appendChild(li);
      });

      const link = clone.querySelector('.link-seta');
      link.href = p.link;
      link.dataset.scrollTo = p.ancora;
      link.firstChild.textContent = p.linkTexto;

      const srOnly = link.querySelector('.sr-only');
      if (srOnly) srOnly.textContent = ` — ${p.linkSufixo}`;

      container.appendChild(clone);
    });
  }

  /* ------------------------------------------------------------
     Renderiza os cartões de ação (inicio.html)
     ------------------------------------------------------------ */
  function renderizarAcoes() {
    const container = document.getElementById('lista-acoes');
    if (!container) return;
    container.innerHTML = '';

    window.DADOS.acoes.forEach((a) => {
      const clone = clonar('tpl-acao');
      if (!clone) return;

      clone.querySelector('.cartao__icone').textContent = a.icone;
      clone.querySelector('.cartao__titulo').textContent = a.titulo;
      clone.querySelector('.cartao__descricao').textContent = a.descricao;

      const botao = clone.querySelector('.botao');
      botao.href = a.link;
      botao.textContent = a.botao;
      botao.classList.add(a.botaoClasse);

      container.appendChild(clone);
    });
  }

  /* ------------------------------------------------------------
     Renderiza os cartões de resultados (projetos.html)
     ------------------------------------------------------------ */
  function renderizarResultados() {
    const container = document.getElementById('lista-resultados');
    if (!container) return;
    container.innerHTML = '';

    window.DADOS.resultados.forEach((r) => {
      const clone = clonar('tpl-resultado');
      if (!clone) return;

      clone.querySelector('.cartao__numero').textContent = r.numero;
      clone.querySelector('.cartao__texto').textContent = r.texto;

      container.appendChild(clone);
    });
  }

  /* ------------------------------------------------------------
     Renderiza os chips de cursos (projetos.html)
     ------------------------------------------------------------ */
  function renderizarChips() {
    const container = document.getElementById('lista-cursos');
    if (!container) return;
    container.innerHTML = '';

    window.DADOS.chips.forEach((nome) => {
      const clone = clonar('tpl-chip');
      if (!clone) return;

      clone.querySelector('.chip').textContent = nome;
      container.appendChild(clone);
    });
  }

  /* ------------------------------------------------------------
     Função mestre — chamada pelo router após cada troca de rota
     ------------------------------------------------------------ */
  function renderizarTemplates() {
    renderizarPilares();
    renderizarAcoes();
    renderizarResultados();
    renderizarChips();
  }

  window.renderizarTemplates = renderizarTemplates;
})();