# Instituto Luz na Rua

Site institucional para ONG que atua junto à população em situação de rua, oferecendo alimentação, acolhimento, encaminhamento para tratamento de dependência química e geração de oportunidades.

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![Versão](https://img.shields.io/badge/vers%C3%A3o-2.0.0-blue)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-lightgrey)

---

## 📖 Descrição

O **Instituto Luz na Rua** é uma organização fictícia criada para este projeto acadêmico. O site apresenta a instituição, seus projetos sociais e um formulário de cadastro para voluntários e doadores.

A aplicação foi construída como **Single Page Application (SPA)** com roteamento por hash, sem dependência de frameworks externos, priorizando acessibilidade, semântica HTML5 e código modular.

---

## ✨ Funcionalidades

- Apresentação institucional com hero, missão e valores
- Catálogo de projetos sociais com âncoras internas
- Formulário de cadastro com máscaras e validação de CPF, telefone e CEP
- Consulta automática de endereço via API ViaCEP
- Menu responsivo com hambúrguer e submenu dropdown
- Modal acessível do Termo de Voluntariado
- Notificações toast
- Persistência de rascunho do formulário em localStorage
- Navegação SPA com hash routing
- Sistema de templates dinâmicos com `<template>` e `cloneNode`

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Função no projeto |
|---|---|
| HTML5 semântico | Estrutura das páginas |
| CSS3 (variáveis, Grid, Flexbox) | Estilos e layout responsivo |
| JavaScript Vanilla ES6+ | Comportamento e interatividade |
| Hash routing | Navegação SPA sem recarregamento |
| `<template>` + `cloneNode` | Geração dinâmica de componentes |
| localStorage + JSON | Persistência do rascunho do formulário |
| API ViaCEP | Consulta de endereço por CEP |
| ARIA + `<dialog>` | Acessibilidade |

---

## 📋 Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge ou Safari)
- [Git](https://git-scm.com/) instalado
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensão **Live Server** do VS Code (ou `npx http-server`)

> ⚠️ **Importante:** o projeto **não funciona** abrindo o `index.html` diretamente pelo sistema de arquivos. O roteador usa `fetch`, que exige um servidor local por questões de CORS.

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Entre na pasta do projeto
cd seu-repositorio
