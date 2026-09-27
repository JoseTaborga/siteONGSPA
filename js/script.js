/* ============================================================
   INSTITUTO LUZ NA RUA — Módulo de interações (SPA-ready)
   Todas as interações usam delegação de eventos, então funcionam
   para conteúdo injetado dinamicamente pelo router.
   ============================================================ */
(function () {
  'use strict';

  /* ==========================================================
     0. TOAST
     ========================================================== */
  let toastTimer = null;

  function exibirToast(mensagem, tipo = 'info', duracao = 4000) {
    const toastEl = document.getElementById('toast');
    if (!toastEl) return;

    if (toastTimer) clearTimeout(toastTimer);

    toastEl.textContent = mensagem;
    toastEl.className = 'toast';
    if (tipo !== 'info') toastEl.classList.add(`toast--${tipo}`);

    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add('visivel'));

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('visivel');
      setTimeout(() => { toastEl.hidden = true; }, 300);
    }, duracao);
  }

  /* ==========================================================
     1. MENU HAMBÚRGUER + SUBMENU (delegação)
     ========================================================== */
  document.addEventListener('click', (e) => {

    // --- Abre / fecha menu hambúrguer ---
    const toggle = e.target.closest('.menu-toggle');
    if (toggle) {
      const nav = document.getElementById('menu-principal');
      const aberto = nav.classList.toggle('aberto');
      toggle.setAttribute('aria-expanded', aberto);
      return;
    }

    // --- Abre / fecha submenu ---
    const btnSub = e.target.closest('.navegacao__botao');
    if (btnSub) {
      const submenu = btnSub.nextElementSibling;
      const aberto = btnSub.getAttribute('aria-expanded') === 'true';
      btnSub.setAttribute('aria-expanded', !aberto);
      if (submenu) submenu.classList.toggle('aberto', !aberto);
      return;
    }

    // --- Fecha menus ao clicar fora ---
    const nav = document.getElementById('menu-principal');
    const toggleBtn = document.querySelector('.menu-toggle');
    if (nav && toggleBtn && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
      nav.classList.remove('aberto');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.submenu.aberto').forEach((s) => s.classList.remove('aberto'));
      document.querySelectorAll('.navegacao__botao[aria-expanded="true"]')
        .forEach((b) => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // Fecha com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const nav = document.getElementById('menu-principal');
    const toggleBtn = document.querySelector('.menu-toggle');
    if (nav) nav.classList.remove('aberto');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.submenu.aberto').forEach((s) => s.classList.remove('aberto'));
    document.querySelectorAll('.navegacao__botao[aria-expanded="true"]')
      .forEach((b) => b.setAttribute('aria-expanded', 'false'));
  });

  /* ==========================================================
     2. MODAIS (delegação)
     ========================================================== */
  document.addEventListener('click', (e) => {
    const abrir = e.target.closest('[data-abrir-modal]');
    if (abrir) {
      const modal = document.getElementById(abrir.dataset.abrirModal);
      if (modal && typeof modal.showModal === 'function') modal.showModal();
      return;
    }

    const fechar = e.target.closest('[data-fechar-modal]');
    if (fechar) {
      const dialog = fechar.closest('dialog');
      if (dialog) dialog.close();
      return;
    }

    // Fecha ao clicar no backdrop
    if (e.target.tagName === 'DIALOG') e.target.close();
  });

  /* ==========================================================
     3. MÁSCARAS E VALIDAÇÃO DE FORMULÁRIO (delegação)
     ========================================================== */

  const apenasDigitos = (v) => v.replace(/\D/g, '');

  function mascararCPF(valor) {
    const d = apenasDigitos(valor).slice(0, 11);
    return d.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function mascararTelefone(valor) {
    const d = apenasDigitos(valor).slice(0, 11);
    if (d.length <= 2)  return d.replace(/(\d{0,2})/, '($1');
    if (d.length <= 6)  return d.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }

  function mascararCEP(valor) {
    const d = apenasDigitos(valor).slice(0, 8);
    return d.replace(/(\d{5})(\d{0,3})/, '$1-$2').replace(/-$/, '');
  }

  function validarCPF(cpf) {
    const d = apenasDigitos(cpf);
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(d[i], 10) * (10 - i);
    let resto = (soma * 10) % 11; if (resto === 10) resto = 0;
    if (resto !== parseInt(d[9], 10)) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(d[i], 10) * (11 - i);
    resto = (soma * 10) % 11; if (resto === 10) resto = 0;
    return resto === parseInt(d[10], 10);
  }

  function validarTelefone(tel) {
    const d = apenasDigitos(tel);
    if (d.length < 10 || d.length > 11) return false;
    const ddd = parseInt(d.slice(0, 2), 10);
    if (ddd < 11 || ddd > 99) return false;
    const primeiro = parseInt(d[2], 10);
    if (d.length === 11) return primeiro === 9;
    if (d.length === 10) return primeiro >= 2 && primeiro <= 5;
    return false;
  }

  function validarCEP(cep) {
    const d = apenasDigitos(cep);
    return d.length === 8 && !/^0{8}$/.test(d);
  }

  function exibirErro(input, elementoErro, mensagem) {
    if (elementoErro) {
      elementoErro.textContent = mensagem;
      elementoErro.hidden = false;
    }
    input.setCustomValidity(mensagem);
    input.setAttribute('aria-invalid', 'true');
  }

  function limparErro(input, elementoErro) {
    if (elementoErro) {
      elementoErro.textContent = '';
      elementoErro.hidden = true;
    }
    input.setCustomValidity('');
    input.removeAttribute('aria-invalid');
  }

  // ----- Máscaras por delegação -----
  document.addEventListener('input', (e) => {
    const id = e.target.id;
    if (id === 'cpf') {
      e.target.value = mascararCPF(e.target.value);
      e.target.dispatchEvent(new Event('validar', { bubbles: true }));
    } else if (id === 'telefone') {
      e.target.value = mascararTelefone(e.target.value);
      e.target.dispatchEvent(new Event('validar', { bubbles: true }));
    } else if (id === 'cep') {
      e.target.value = mascararCEP(e.target.value);
      e.target.dispatchEvent(new Event('validar', { bubbles: true }));
    }
  });

  // ----- Validações por delegação -----
  document.addEventListener('validar', async (e) => {
    const t = e.target;

    if (t.id === 'cpf') {
      const erro = document.getElementById('erro-cpf');
      if (!t.value) { limparErro(t, erro); return; }
      if (t.value.length < 14) { exibirErro(t, erro, 'CPF incompleto.'); return; }
      if (!validarCPF(t.value)) { exibirErro(t, erro, 'CPF inválido. Verifique os números digitados.'); return; }
      limparErro(t, erro);
    }

    if (t.id === 'telefone') {
      const erro = document.getElementById('erro-telefone');
      const d = apenasDigitos(t.value);
      if (d.length === 0) { limparErro(t, erro); return; }
      if (d.length < 10) { exibirErro(t, erro, 'Telefone incompleto.'); return; }
      if (!validarTelefone(t.value)) { exibirErro(t, erro, 'Telefone inválido. Verifique DDD e número.'); return; }
      limparErro(t, erro);
    }

    if (t.id === 'cep') {
      const erro = document.getElementById('erro-cep');
      const status = document.getElementById('status-cep');
      const d = apenasDigitos(t.value);

      if (d.length === 0) {
        limparErro(t, erro);
        if (status) status.textContent = 'Preenche o endereço automaticamente.';
        return;
      }
      if (d.length < 8) { exibirErro(t, erro, 'CEP incompleto.'); return; }
      if (!validarCEP(t.value)) { exibirErro(t, erro, 'CEP inválido.'); return; }

      limparErro(t, erro);

      if (t.dataset.ultimoCep === d) return;
      t.dataset.ultimoCep = d;

      if (status) status.textContent = 'Buscando endereço...';
      try {
        const resp = await fetch(`https://viacep.com.br/ws/${d}/json/`);
        const dados = await resp.json();
        if (dados.erro) {
          exibirErro(t, erro, 'CEP não encontrado.');
          if (status) status.textContent = 'CEP não encontrado.';
          return;
        }
        const set = (id, valor) => {
          const el = document.getElementById(id);
          if (el && !el.value) el.value = valor || '';
        };
        set('logradouro', dados.logradouro);
        set('bairro',     dados.bairro);
        set('cidade',     dados.localidade);
        set('uf',         dados.uf);
        if (status) status.textContent = 'Endereço preenchido automaticamente.';
      } catch (err) {
        if (status) status.textContent = 'Não foi possível consultar o CEP agora. Preencha manualmente.';
      }
    }
  });

  // ----- Blur -----
  document.addEventListener('blur', (e) => {
    const id = e.target.id;
    if (['nome', 'cpf', 'telefone', 'cep'].includes(id) && e.target.value) {
      e.target.dispatchEvent(new Event('validar', { bubbles: true }));
    }
  }, true);

  // ----- Submit -----
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.id !== 'form-cadastro') return;

    ['cpf', 'telefone', 'cep'].forEach((id) => {
      const campo = document.getElementById(id);
      if (campo) campo.dispatchEvent(new Event('validar', { bubbles: true }));
    });

    if (!form.checkValidity()) {
      e.preventDefault();
      const invalido = form.querySelector(':invalid');
      if (invalido) {
        invalido.focus();
        invalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    e.preventDefault();
    form.hidden = true;
    const msg = document.getElementById('mensagem-sucesso');
    if (msg) {
      msg.hidden = false;
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      msg.focus();
    }
    exibirToast('Cadastro enviado! Entraremos em contato em até 2 dias úteis.', 'sucesso', 6000);
  });

  // ----- Reset -----
  document.addEventListener('reset', (e) => {
    if (e.target.id !== 'form-cadastro') return;
    ['erro-cpf', 'erro-telefone', 'erro-cep'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.textContent = ''; el.hidden = true; }
    });
    const status = document.getElementById('status-cep');
    if (status) status.textContent = 'Preenche o endereço automaticamente.';
    ['cpf', 'telefone', 'cep'].forEach((id) => {
      const c = document.getElementById(id);
      if (c) {
        c.setCustomValidity('');
        c.removeAttribute('aria-invalid');
        delete c.dataset.ultimoCep;
      }
    });
  });

  // Expor globalmente
  window.exibirToast = exibirToast;
})();