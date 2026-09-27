/* ============================================================
   INSTITUTO LUZ NA RUA — Fonte de dados para templates
   ============================================================ */
window.DADOS = {

  pilares: [
    {
      icone: '🍲',
      titulo: '1. Alimentar e acolher',
      descricao: 'Cozinhas solidárias, distribuição noturna de refeições quentes, kits de higiene, cobertores e vagas em abrigos parceiros nos meses de frio intenso.',
      itens: ['600 refeições por noite', '4 pontos fixos de distribuição', 'Acolhimento sem exigência de documentos'],
      link: '#/projetos',
      ancora: 'prato-cheio',
      linkTexto: 'Ver o projeto Prato Cheio',
      linkSufixo: 'Alimentar e acolher'
    },
    {
      icone: '💚',
      titulo: '2. Cuidar e encaminhar',
      descricao: 'Apoio para tratamento de dependência química, consultas, emissão de documentos e reconexão com a rede pública de saúde e assistência social.',
      itens: ['Encaminhamento a CAPS-AD e comunidades terapêuticas', 'Mutirão mensal de documentação', 'Acompanhamento por 12 meses'],
      link: '#/projetos',
      ancora: 'recomeco',
      linkTexto: 'Ver o Projeto Recomeço',
      linkSufixo: 'Cuidar e encaminhar'
    },
    {
      icone: '🌱',
      titulo: '3. Oportunizar e recomeçar',
      descricao: 'Capacitação profissional, bolsa-aprendiz, intermediação com empresas parceiras e apoio na busca por moradia e renda.',
      itens: ['6 cursos técnicos gratuitos', '38 empresas parceiras', '62% de inserção em até 6 meses'],
      link: '#/projetos',
      ancora: 'maos-a-obra',
      linkTexto: 'Ver o Mãos à Obra',
      linkSufixo: 'Oportunizar e recomeçar'
    }
  ],

  acoes: [
    {
      icone: '❤️',
      titulo: 'Doar',
      descricao: 'R$ 45 mantêm uma pessoa alimentada por uma semana. A doação é 100% aplicada nos projetos e o relatório financeiro é público.',
      link: '#/cadastro?perfil=doador',
      botao: 'Quero doar',
      botaoClasse: 'botao--primario'
    },
    {
      icone: '🙌',
      titulo: 'Voluntariar',
      descricao: 'Precisamos de cozinheiros, motoristas, psicólogos, advogados, professores e também de quem nunca fez nada disso antes.',
      link: '#/cadastro?perfil=voluntario',
      botao: 'Quero ser voluntário',
      botaoClasse: 'botao--primario'
    },
    {
      icone: '📣',
      titulo: 'Divulgar',
      descricao: 'Compartilhar nosso trabalho amplia a rede de apoio e reduz o preconceito que afasta essas pessoas de serviços públicos.',
      link: '#/projetos',
      botao: 'Compartilhar projetos',
      botaoClasse: 'botao--contorno'
    }
  ],

  resultados: [
    { numero: '210.480', texto: 'refeições quentes servidas' },
    { numero: '2.730',   texto: 'pessoas acolhidas em alguma frente' },
    { numero: '197',     texto: 'reinserções em trabalho formal' },
    { numero: '1.940',   texto: 'documentos emitidos' },
    { numero: '287',     texto: 'encaminhamentos para tratamento' },
    { numero: '94%',     texto: 'das doações aplicadas diretamente em campo' }
  ],

  chips: [
    'Panificação', 'Auxiliar de cozinha', 'Logística e estoque',
    'Construção civil', 'Jardinagem urbana', 'Atendimento e recepção'
  ]

};