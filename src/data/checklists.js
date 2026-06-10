export const SERVICES = {
  branding: {
    id: 'branding',
    label: 'Branding',
    color: 'blue',
    packages: {
      diagnostico: { id: 'diagnostico', label: 'Diagnóstico' },
      diagnostico_direcao: { id: 'diagnostico_direcao', label: 'Diagnóstico e Direção Criativa' },
      identidade_visual: { id: 'identidade_visual', label: 'Identidade Visual' },
      identidade_papelaria: { id: 'identidade_papelaria', label: 'Identidade Visual e Papelaria' },
      posicionamento_identidade: { id: 'posicionamento_identidade', label: 'Posicionamento e Identidade Visual' },
      estrategia_marca: { id: 'estrategia_marca', label: 'Estratégia de Marca' },
      estrategia_identidade: { id: 'estrategia_identidade', label: 'Estratégia e Identidade' },
      marca_convicao: { id: 'marca_convicao', label: 'Marca com Convicção — Método NAYA Completo' }
    }
  },
  web: {
    id: 'web',
    label: 'Web Design',
    color: 'orange',
    packages: {
      landing: { id: 'landing', label: 'Landing Page' },
      landing_conversao: { id: 'landing_conversao', label: 'Landing Page com Conversão' },
      site_completo: { id: 'site_completo', label: 'Site Completo' }
    }
  },
  social: {
    id: 'social',
    label: 'Redes Sociais',
    color: 'yellow',
    packages: {
      gestao_completa: { id: 'gestao_completa', label: 'Gestão Completa' },
      presenca_ativa: { id: 'presenca_ativa', label: 'Presença Ativa' },
      consistencia_editorial: { id: 'consistencia_editorial', label: 'Consistência Editorial' },
      presenca_essencial: { id: 'presenca_essencial', label: 'Presença Essencial' },
      identidade_redes: { id: 'identidade_redes', label: 'Identidade nas Redes' },
      ponto_partida: { id: 'ponto_partida', label: 'Ponto de Partida' }
    }
  }
}

export const CHECKLIST_TEMPLATES = {
  branding_diagnostico: [
    {
      id: 'diagnostico_marca',
      title: 'Diagnóstico de Marca',
      subtitle: 'DIAGNÓSTICO',
      letter: 'D',
      color: 'blue',
      items: [
        'Análise do estado atual da marca',
        'Diagnóstico de percepção e oportunidades',
        'Relatório estratégico com recomendações',
        'Apresentação dos resultados ao cliente'
      ]
    }
  ],

  branding_diagnostico_direcao: [
    {
      id: 'diagnostico_marca',
      title: 'Diagnóstico de Marca',
      subtitle: 'DIAGNÓSTICO',
      letter: 'D',
      color: 'blue',
      items: [
        'Análise do estado atual da marca',
        'Diagnóstico de percepção e oportunidades',
        'Relatório estratégico com recomendações'
      ]
    },
    {
      id: 'direcao_criativa',
      title: 'Direção Criativa',
      subtitle: 'CRIATIVIDADE',
      letter: 'C',
      color: 'blue',
      items: [
        'Território criativo e referências estéticas',
        'Conceito visual e direção para os próximos passos',
        'Apresentação e aprovação da direção criativa'
      ]
    }
  ],

  branding_identidade_visual: [
    {
      id: 'identidade_visual',
      title: 'Identidade Visual',
      subtitle: 'IDENTIDADE',
      letter: 'I',
      color: 'blue',
      items: [
        'Briefing e alinhamento de expectativas',
        'Conceito criativo aprovado',
        'Logotipo principal',
        'Variações e versões do logotipo',
        'Paleta de cores oficial',
        'Tipografia oficial',
        'Elementos gráficos de suporte',
        'Guia de uso da marca',
        'Entrega do pacote de arquivos final'
      ]
    }
  ],

  branding_identidade_papelaria: [
    {
      id: 'identidade_visual',
      title: 'Identidade Visual',
      subtitle: 'IDENTIDADE',
      letter: 'I',
      color: 'blue',
      items: [
        'Briefing e alinhamento de expectativas',
        'Conceito criativo aprovado',
        'Logotipo principal',
        'Variações e versões do logotipo',
        'Paleta de cores oficial',
        'Tipografia oficial',
        'Elementos gráficos de suporte',
        'Guia de uso da marca'
      ]
    },
    {
      id: 'papelaria',
      title: 'Papelaria',
      subtitle: 'PAPELARIA',
      letter: 'P',
      color: 'blue',
      items: [
        'Definição das peças de papelaria',
        'Cartão de visita',
        'Papel timbrado',
        'Assinatura de e-mail',
        'Demais aplicações acordadas',
        'Entrega do pacote de arquivos final'
      ]
    }
  ],

  branding_posicionamento_identidade: [
    {
      id: 'posicionamento',
      title: 'Posicionamento',
      subtitle: 'ESTRATÉGIA',
      letter: 'P',
      color: 'blue',
      items: [
        'Briefing estratégico',
        'Estratégia de posicionamento — propósito, território e promessa',
        'Identidade verbal — tom de voz',
        'Aprovação da plataforma estratégica'
      ]
    },
    {
      id: 'identidade_visual',
      title: 'Identidade Visual',
      subtitle: 'IDENTIDADE',
      letter: 'I',
      color: 'blue',
      items: [
        'Conceito criativo aprovado',
        'Logotipo principal',
        'Variações e versões do logotipo',
        'Paleta de cores oficial',
        'Tipografia oficial',
        'Elementos gráficos de suporte',
        'Guia de uso da marca',
        'Entrega do pacote de arquivos final'
      ]
    }
  ],

  branding_estrategia_marca: [
    {
      id: 'navegar_contexto',
      title: 'Navegar o Contexto',
      subtitle: 'ONBOARDING',
      letter: 'N',
      color: 'blue',
      items: [
        'Briefing de onboarding com o cliente',
        'Diagnóstico de mercado, concorrência e oportunidades',
        'Mapeamento de oportunidades',
        'Entrega: Mapa de Contexto'
      ]
    },
    {
      id: 'arquitetar_marca',
      title: 'Arquitetar a Marca',
      subtitle: 'ESTRATÉGIA',
      letter: 'A',
      color: 'blue',
      items: [
        'Estratégia de posicionamento — propósito, território e promessa',
        'Pilares estratégicos',
        'Entrega: Plataforma de Marca'
      ]
    },
    {
      id: 'your_voice',
      title: 'Your Voice',
      subtitle: 'VOZ',
      letter: 'Y',
      color: 'blue',
      items: [
        'Identidade verbal — tom de voz e manifesto',
        'Narrativa de marca e mensagens centrais',
        'Entrega: Documento de Voz e Narrativa'
      ]
    },
    {
      id: 'plataforma_final',
      title: 'Plataforma Final',
      subtitle: 'PLATAFORMA',
      letter: 'F',
      color: 'blue',
      items: [
        'Compilação da plataforma estratégica completa',
        'Apresentação ao cliente',
        'Aprovação e entrega do documento estratégico'
      ]
    }
  ],

  branding_estrategia_identidade: [
    {
      id: 'navegar_contexto',
      title: 'Navegar o Contexto',
      subtitle: 'ONBOARDING',
      letter: 'N',
      color: 'blue',
      items: [
        'Briefing de onboarding com o cliente',
        'Diagnóstico de mercado, concorrência e oportunidades',
        'Mapeamento de oportunidades',
        'Entrega: Mapa de Contexto'
      ]
    },
    {
      id: 'arquitetar_marca',
      title: 'Arquitetar a Marca',
      subtitle: 'ESTRATÉGIA',
      letter: 'A',
      color: 'blue',
      items: [
        'Estratégia de posicionamento — propósito, território e promessa',
        'Pilares estratégicos',
        'Entrega: Plataforma de Marca'
      ]
    },
    {
      id: 'your_voice',
      title: 'Your Voice',
      subtitle: 'VOZ',
      letter: 'Y',
      color: 'blue',
      items: [
        'Identidade verbal — tom de voz e manifesto',
        'Narrativa de marca e mensagens centrais',
        'Entrega: Documento de Voz e Narrativa'
      ]
    },
    {
      id: 'ativar_marca',
      title: 'Ativar a Marca',
      subtitle: 'IDENTIDADE',
      letter: 'A',
      color: 'blue',
      items: [
        'Conceito criativo e referências aprovadas',
        'Logotipo principal',
        'Variações e versões do logotipo',
        'Paleta de cores oficial',
        'Tipografia oficial',
        'Sistema visual e elementos gráficos',
        'Brand guide — manual de uso',
        'Entrega: Pacote de Arquivos Final'
      ]
    }
  ],

  branding_marca_convicao: [
    {
      id: 'navegar_contexto',
      title: 'Navegar o Contexto',
      subtitle: 'ONBOARDING',
      letter: 'N',
      color: 'blue',
      items: [
        'Briefing de onboarding com o cliente',
        'Diagnóstico de mercado, concorrência e oportunidades',
        'Mapeamento de oportunidades',
        'Análise do público-alvo',
        'Entrega: Mapa de Contexto'
      ]
    },
    {
      id: 'arquitetar_marca',
      title: 'Arquitetar a Marca',
      subtitle: 'ESTRATÉGIA',
      letter: 'A',
      color: 'blue',
      items: [
        'Estratégia de posicionamento — propósito, território e promessa',
        'Pilares estratégicos',
        'Promessa de marca',
        'Entrega: Plataforma de Marca'
      ]
    },
    {
      id: 'your_voice',
      title: 'Your Voice',
      subtitle: 'VOZ',
      letter: 'Y',
      color: 'blue',
      items: [
        'Tom de voz — diretrizes e exemplos',
        'Manifesto de marca',
        'Mensagens centrais por audiência',
        'Identidade verbal — vocabulário e anti-vocabulário',
        'Entrega: Documento de Voz e Narrativa'
      ]
    },
    {
      id: 'ativar_marca',
      title: 'Ativar a Marca',
      subtitle: 'IDENTIDADE',
      letter: 'A',
      color: 'blue',
      items: [
        'Conceito criativo e referências aprovadas',
        'Logotipo principal',
        'Variações e versões do logotipo',
        'Paleta de cores oficial',
        'Tipografia oficial',
        'Sistema visual e elementos gráficos',
        'Brand guide — manual de uso',
        'Templates digitais para redes sociais',
        'Aplicações de papelaria',
        'Entrega: Pacote de Arquivos Final'
      ]
    }
  ],

  web_landing: [
    {
      id: 'estrategia',
      title: 'Estratégia e Conteúdo',
      subtitle: 'PLANEJAMENTO',
      letter: 'W',
      color: 'orange',
      items: [
        'Briefing e levantamento de objetivos',
        'Definição da hierarquia de conteúdo',
        'Copywriting das seções'
      ]
    },
    {
      id: 'design',
      title: 'Design e Entrega',
      subtitle: 'EXECUÇÃO',
      letter: 'D',
      color: 'orange',
      items: [
        'Wireframe aprovado',
        'Design da página (alinhado à identidade)',
        'Versão responsiva (mobile e desktop)',
        'Entrega técnica completa'
      ]
    }
  ],

  web_landing_conversao: [
    {
      id: 'estrategia',
      title: 'Estratégia e Conteúdo',
      subtitle: 'PLANEJAMENTO',
      letter: 'W',
      color: 'orange',
      items: [
        'Briefing e levantamento de objetivos',
        'Definição da hierarquia de conteúdo',
        'Copywriting das seções',
        'Estratégia de captação de leads'
      ]
    },
    {
      id: 'design',
      title: 'Design e Entrega',
      subtitle: 'EXECUÇÃO',
      letter: 'D',
      color: 'orange',
      items: [
        'Wireframe aprovado',
        'Design da página (alinhado à identidade)',
        'Formulário de captação integrado',
        'Configuração de e-mail automático',
        'Versão responsiva (mobile e desktop)',
        'Entrega técnica completa'
      ]
    }
  ],

  web_site_completo: [
    {
      id: 'estrategia',
      title: 'Estratégia e Conteúdo',
      subtitle: 'PLANEJAMENTO',
      letter: 'W',
      color: 'orange',
      items: [
        'Briefing e levantamento de objetivos',
        'Arquitetura de informação e navegação',
        'Direção de conteúdo por página (até 5 páginas)',
        'Copywriting aprovado'
      ]
    },
    {
      id: 'design',
      title: 'Design e Entrega',
      subtitle: 'EXECUÇÃO',
      letter: 'D',
      color: 'orange',
      items: [
        'Wireframes de todas as páginas aprovados',
        'Design de todas as páginas (alinhado à identidade)',
        'Versão responsiva de todas as páginas',
        'Entrega técnica completa'
      ]
    }
  ],

  social_gestao_completa: [
    {
      id: 'planejamento',
      title: 'Planejamento',
      subtitle: 'PLANEJAMENTO',
      letter: 'P',
      color: 'yellow',
      items: [
        'Reunião mensal de alinhamento',
        'Planejamento estratégico mensal',
        'Calendário editorial aprovado'
      ]
    },
    {
      id: 'producao',
      title: 'Produção',
      subtitle: 'PRODUÇÃO',
      letter: 'C',
      color: 'yellow',
      items: [
        '20 posts/mês — estáticos, carrosséis e Reels',
        'Criação das artes',
        'Copy para todos os formatos',
        'Roteiro e edição dos Reels',
        'Stories semanais criados'
      ]
    },
    {
      id: 'gestao',
      title: 'Gestão e Relatório',
      subtitle: 'GESTÃO',
      letter: 'G',
      color: 'yellow',
      items: [
        'Publicação e gestão de comentários',
        'Relatório mensal de desempenho entregue'
      ]
    }
  ],

  social_presenca_ativa: [
    {
      id: 'planejamento',
      title: 'Planejamento',
      subtitle: 'PLANEJAMENTO',
      letter: 'P',
      color: 'yellow',
      items: [
        'Planejamento estratégico mensal',
        'Calendário editorial aprovado'
      ]
    },
    {
      id: 'producao',
      title: 'Produção',
      subtitle: 'PRODUÇÃO',
      letter: 'C',
      color: 'yellow',
      items: [
        '16 posts/mês — estáticos, carrosséis e Reels',
        'Criação das artes',
        'Copy para todos os formatos',
        'Roteiro e edição dos Reels',
        'Stories semanais criados'
      ]
    },
    {
      id: 'relatorio',
      title: 'Relatório',
      subtitle: 'RELATÓRIO',
      letter: 'R',
      color: 'yellow',
      items: [
        'Relatório mensal de desempenho entregue'
      ]
    }
  ],

  social_consistencia_editorial: [
    {
      id: 'planejamento',
      title: 'Planejamento',
      subtitle: 'PLANEJAMENTO',
      letter: 'P',
      color: 'yellow',
      items: [
        'Planejamento mensal',
        'Calendário editorial aprovado'
      ]
    },
    {
      id: 'producao',
      title: 'Produção',
      subtitle: 'PRODUÇÃO',
      letter: 'C',
      color: 'yellow',
      items: [
        '12 posts/mês — estáticos, carrosséis e Reels',
        'Criação das artes',
        'Copy para todos os formatos',
        'Roteiro e edição dos Reels',
        'Stories quinzenais criados'
      ]
    }
  ],

  social_presenca_essencial: [
    {
      id: 'producao',
      title: 'Produção',
      subtitle: 'PRODUÇÃO',
      letter: 'C',
      color: 'yellow',
      items: [
        '8 posts/mês — 4 estáticos, 2 carrosséis, 2 Reels',
        'Criação das artes',
        'Copy para todos os formatos',
        'Roteiro e edição dos Reels'
      ]
    }
  ],

  social_identidade_redes: [
    {
      id: 'producao',
      title: 'Produção',
      subtitle: 'PRODUÇÃO',
      letter: 'C',
      color: 'yellow',
      items: [
        '6 posts/mês — estáticos e carrosséis',
        'Criação das artes',
        'Copy para todos os formatos'
      ]
    }
  ],

  social_ponto_partida: [
    {
      id: 'producao',
      title: 'Produção',
      subtitle: 'PRODUÇÃO',
      letter: 'C',
      color: 'yellow',
      items: [
        '4 posts/mês — estáticos',
        'Criação das artes',
        'Copy para os posts'
      ]
    }
  ]
}

export function generateChecklist(selectedServices) {
  const sections = []
  const { branding, web, social } = selectedServices || {}

  if (branding?.diagnostico) sections.push(...CHECKLIST_TEMPLATES.branding_diagnostico)
  if (branding?.diagnostico_direcao) sections.push(...CHECKLIST_TEMPLATES.branding_diagnostico_direcao)
  if (branding?.identidade_visual) sections.push(...CHECKLIST_TEMPLATES.branding_identidade_visual)
  if (branding?.identidade_papelaria) sections.push(...CHECKLIST_TEMPLATES.branding_identidade_papelaria)
  if (branding?.posicionamento_identidade) sections.push(...CHECKLIST_TEMPLATES.branding_posicionamento_identidade)
  if (branding?.estrategia_marca) sections.push(...CHECKLIST_TEMPLATES.branding_estrategia_marca)
  if (branding?.estrategia_identidade) sections.push(...CHECKLIST_TEMPLATES.branding_estrategia_identidade)
  if (branding?.marca_convicao) sections.push(...CHECKLIST_TEMPLATES.branding_marca_convicao)
  if (web?.landing) sections.push(...CHECKLIST_TEMPLATES.web_landing)
  if (web?.landing_conversao) sections.push(...CHECKLIST_TEMPLATES.web_landing_conversao)
  if (web?.site_completo) sections.push(...CHECKLIST_TEMPLATES.web_site_completo)
  if (social?.gestao_completa) sections.push(...CHECKLIST_TEMPLATES.social_gestao_completa)
  if (social?.presenca_ativa) sections.push(...CHECKLIST_TEMPLATES.social_presenca_ativa)
  if (social?.consistencia_editorial) sections.push(...CHECKLIST_TEMPLATES.social_consistencia_editorial)
  if (social?.presenca_essencial) sections.push(...CHECKLIST_TEMPLATES.social_presenca_essencial)
  if (social?.identidade_redes) sections.push(...CHECKLIST_TEMPLATES.social_identidade_redes)
  if (social?.ponto_partida) sections.push(...CHECKLIST_TEMPLATES.social_ponto_partida)

  return sections.map(section => ({
    ...section,
    id: `${section.id}_${Math.random().toString(36).substr(2, 6)}`,
    items: section.items.map(text => ({
      id: Math.random().toString(36).substr(2, 9),
      text,
      status: 'todo',
      note: ''
    }))
  }))
}
