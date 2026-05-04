# Comece Aqui

## Documentação organizada

Tem 2 arquivos principais + docs específicos por estagiário.

---

## Leia primeiro

### Backend
**Arquivo**: [`BACKEND.md`](BACKEND.md)

Tem tudo:
- Setup completo
- Arquitetura (Controller → Service → Repository)
- Sistema de permissões (Admin/Gestor/Colaborador)
- Sistema de RA (identificador único)
- Exemplos de código
- Como testar

### Frontend
**Arquivo**: [`FRONTEND.md`](FRONTEND.md)

Tem tudo:
- Setup completo
- Módulos principais (api.js, auth.js, validators.js)
- Sistema de permissões
- Exemplos de código
- Como testar

---

## Docs por estagiário

### Backend (3 pessoas)

| Estagiário | Módulo | Arquivo |
|------------|--------|---------|
| 1 | Usuários (autenticação, RA) | [`backend/ESTAGIARIO_1_USERS.md`](backend/ESTAGIARIO_1_USERS.md) |
| 2 | Avaliações (Nine Box) | [`backend/ESTAGIARIO_2_EVALUATIONS.md`](backend/ESTAGIARIO_2_EVALUATIONS.md) |
| 3 | Competências (relatórios) | [`backend/ESTAGIARIO_3_COMPETENCIES.md`](backend/ESTAGIARIO_3_COMPETENCIES.md) |

### Frontend (2 pessoas)

| Estagiário | Tarefa | Arquivo |
|------------|--------|---------|
| 1 | Infraestrutura (API, auth, loading) | [`frontend/ESTAGIARIO_1_INFRAESTRUTURA.md`](frontend/ESTAGIARIO_1_INFRAESTRUTURA.md) |
| 2 | Integração (CRUD, validações) | [`frontend/ESTAGIARIO_2_INTEGRACAO.md`](frontend/ESTAGIARIO_2_INTEGRACAO.md) |

---

## Docs de apoio

- [`GUIA_COMPLETO.md`](GUIA_COMPLETO.md) - Tutorial completo pra fazer do zero
- [`backend/FAQ.md`](backend/FAQ.md) - Perguntas frequentes backend
- [`frontend/FAQ.md`](frontend/FAQ.md) - Perguntas frequentes frontend
- [`backend/SCHEMA.prisma`](backend/SCHEMA.prisma) - Schema do banco
- [`backend/DIAGRAMAS.md`](backend/DIAGRAMAS.md) - Diagramas visuais
- [`CHANGELOG.md`](CHANGELOG.md) - Registro de atualizações

**Importante**: RA é como CPF - cada pessoa já tem o seu. No cadastro, a pessoa informa o RA dela.

---

## Estrutura

```
docs/
├── START_HERE.md          # Você tá aqui
├── INDEX.md               # Índice completo
├── BACKEND.md             # Guia completo backend
├── FRONTEND.md            # Guia completo frontend
├── GUIA_COMPLETO.md       # Tutorial do zero
├── CHANGELOG.md           # Atualizações
│
├── backend/
│   ├── ESTAGIARIO_1_USERS.md
│   ├── ESTAGIARIO_2_EVALUATIONS.md
│   ├── ESTAGIARIO_3_COMPETENCIES.md
│   ├── SCHEMA.prisma
│   ├── DIAGRAMAS.md
│   └── FAQ.md
│
└── frontend/
    ├── ESTAGIARIO_1_INFRAESTRUTURA.md
    ├── ESTAGIARIO_2_INTEGRACAO.md
    └── FAQ.md
```

---

## Início rápido

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

### Frontend
```bash
npx serve .
# ou Live Server no VS Code
```

---

## Próximo passo

1. **Backend?** → Leia [`BACKEND.md`](BACKEND.md)
2. **Frontend?** → Leia [`FRONTEND.md`](FRONTEND.md)
3. Depois, vê o doc do seu módulo

Qualquer dúvida, chama.
