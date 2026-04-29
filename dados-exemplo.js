lo
const contatosExemplo = [
  {
    id: 1001,
    nome: "Prof. João Silva",
    email: "joao.silva@universidade.edu",
    tipo: "professor",
    disciplina: "Engenharia de Software",
    foto: null
  },
  {
    id: 1002,
    nome: "Prof. Maria Santos",
    email: "maria.santos@universidade.edu",
    tipo: "professor",
    disciplina: "Banco de Dados",
    foto: null
  },
  {
    id: 1003,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    tipo: "estagiario",
    matricula: "2021001",
    foto: null
  },
  {
    id: 1004,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    tipo: "estagiario",
    matricula: "2021002",
    foto: null
  },
  {
    id: 1005,
    nome: "Prof. Pedro Lima",
    email: "pedro.lima@universidade.edu",
    tipo: "professor",
    disciplina: "Algoritmos",
    foto: null
  },
  {
    id: 1006,
    nome: "Beatriz Ferreira",
    email: "beatriz.ferreira@email.com",
    tipo: "estagiario",
    matricula: "2021003",
    foto: null
  }
];

// Salvar contatos
localStorage.setItem('contatos', JSON.stringify(contatosExemplo));

// Adicionar algumas avaliações tradicionais de exemplo
const avaliacoesExemplo = [
  {
    id: 3001,
    tipo: "professor",
    avaliado: "Prof. João Silva",
    criterios: {
      pontualidade: 5,
      comunicacao: 4,
      tecnico: 5,
      proatividade: 4,
      equipe: 5
    },
    media: 4.6,
    comentario: "Excelente professor, muito dedicado.",
    data: "26/04/2026"
  },
  {
    id: 3002,
    tipo: "estagiario",
    avaliado: "Ana Costa",
    criterios: {},
    media: null,
    comentario: "Estagiária muito dedicada e pontual. Demonstra grande interesse em aprender e sempre busca feedback para melhorar. Sua comunicação é clara e ela se integra bem com a equipe.",
    data: "26/04/2026",
    tipoAvaliacao: "comentario"
  }
];

// Salvar avaliações tradicionais
localStorage.setItem('avaliacoes', JSON.stringify(avaliacoesExemplo));

// Adicionar algumas avaliações Nine Box de exemplo
const nineBoxExemplo = [
  {
    id: 2001,
    pessoaId: 1001,
    tipo: "professor",
    pessoa: "Prof. João Silva",
    performance: 3,
    potential: 2,
    comentario: "Excelente professor, muito dedicado às aulas.",
    data: "27/04/2026",
    categoria: "Especialista"
  },
  {
    id: 2002,
    pessoaId: 1003,
    tipo: "estagiario",
    pessoa: "Ana Costa",
    performance: 2,
    potential: 3,
    comentario: "Demonstra muito potencial, está sempre buscando aprender mais.",
    data: "27/04/2026",
    categoria: "Estrela"
  },
  {
    id: 2003,
    pessoaId: 1002,
    tipo: "professor",
    pessoa: "Prof. Maria Santos",
    performance: 3,
    potential: 3,
    comentario: "Professora excepcional com grande potencial de liderança.",
    data: "27/04/2026",
    categoria: "Superstar"
  }
];

// Salvar avaliações Nine Box
localStorage.setItem('nineBoxAvaliacoes', JSON.stringify(nineBoxExemplo));

console.log("Dados de exemplo adicionados com sucesso!");
console.log("Contatos:", contatosExemplo.length);
console.log("Avaliações tradicionais:", avaliacoesExemplo.length);
console.log("Avaliações Nine Box:", nineBoxExemplo.length);