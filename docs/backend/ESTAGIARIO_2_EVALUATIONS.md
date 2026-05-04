# ESTAGIÁRIO 2 - Módulo de Avaliações (Evaluations)

## ⚠️ IMPORTANTE: ES Modules

Este projeto usa **ES Modules** (`import/export`) ao invés de CommonJS (`require/module.exports`).

**Configure no package.json:**
```json
{
  "type": "module"
}
```

**Use:**
- ✅ `import express from 'express'`
- ✅ `export { EvaluationService }`
- ✅ `export default router`
- ❌ `const express = require('express')`
- ❌ `module.exports = { EvaluationService }`

---

## Sua Responsabilidade

Você vai cuidar de todo o sistema de avaliações de desempenho do Portal de Gestão de Pessoas usando JavaScript puro.

---

## Objetivos

1. Avaliações tradicionais (com estrelas 1-5)
2. Avaliações por comentário
3. Sistema Nine Box (Performance × Potential)
4. Avaliação 180° e 360°
5. Histórico e estatísticas de avaliações

---

## Endpoints que você vai criar

### 1. POST /api/evaluations
**Criar avaliação tradicional (APENAS GESTOR OU ADMIN)**

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "avaliadoId": "uuid-do-usuario",
  "tipo": "gestor",
  "criterios": {
    "pontualidade": 5,
    "comunicacao": 4,
    "tecnico": 5,
    "proatividade": 4,
    "equipe": 5
  },
  "comentario": "Excelente profissional"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "avaliadorId": "uuid",
    "avaliadoId": "uuid",
    "tipo": "gestor",
    "criterios": {...},
    "media": 4.6,
    "comentario": "Excelente profissional",
    "data": "2026-04-30T10:00:00.000Z"
  },
  "message": "Avaliação criada com sucesso"
}
```

**Regras de Permissão:**
- ✅ Apenas gestor ou admin pode criar
- ❌ Colaborador NÃO pode criar avaliações

---

### 2. POST /api/evaluations/comment
**Criar avaliação por comentário (APENAS GESTOR OU ADMIN)**

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "avaliadoId": "uuid-do-colaborador",
  "comentario": "Colaborador muito dedicado e pontual. Demonstra grande interesse em aprender..."
}
```

**Regras de Permissão:**
- ✅ Apenas gestor ou admin pode criar
- ❌ Colaborador NÃO pode avaliar outros

---

### 3. POST /api/evaluations/nine-box
**Criar avaliação Nine Box (APENAS GESTOR OU ADMIN)**

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "pessoaId": "uuid",
  "performance": 3,
  "potential": 2,
  "comentario": "Alto desempenho, potencial médio"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "pessoaId": "uuid",
    "performance": 3,
    "potential": 2,
    "categoria": "Especialista",
    "comentario": "Alto desempenho, potencial médio",
    "data": "2026-04-30T10:00:00.000Z"
  },
  "message": "Avaliação Nine Box criada com sucesso"
}
```

**Regras de Permissão:**
- ✅ Apenas gestor ou admin pode criar
- ❌ Colaborador NÃO pode criar Nine Box

**Categorias Nine Box:**
- Performance 3 + Potential 3 = "Superstar"
- Performance 3 + Potential 2 = "Especialista"
- Performance 3 + Potential 1 = "Âncora"
- Performance 2 + Potential 3 = "Estrela"
- Performance 2 + Potential 2 = "Núcleo"
- Performance 2 + Potential 1 = "Trabalhador"
- Performance 1 + Potential 3 = "Enigma"
- Performance 1 + Potential 2 = "Dilema"
- Performance 1 + Potential 1 = "Questão"

---

### 4. GET /api/evaluations
**Listar avaliações com filtros**

**Headers:**
```
Authorization: Bearer {token}
```

**Query Params:**
```
?tipo=gestor
&avaliadoId=uuid
&page=1
&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "evaluations": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

**Regras de Permissão:**
- ✅ Admin: vê todas as avaliações
- ✅ Gestor: vê avaliações que criou + avaliações de sua equipe
- ✅ Colaborador: vê apenas suas próprias avaliações recebidas

---

### 5. GET /api/evaluations/:id
**Buscar avaliação por ID**

**Regras de Permissão:**
- ✅ Admin: vê qualquer avaliação
- ✅ Gestor: vê se criou ou se é da sua equipe
- ✅ Colaborador: vê apenas se for avaliação dele

---

### 6. GET /api/evaluations/user/:userId
**Buscar todas as avaliações de um usuário**

**Regras de Permissão:**
- ✅ Admin: vê avaliações de qualquer usuário
- ✅ Gestor: vê avaliações de sua equipe
- ✅ Colaborador: vê apenas suas próprias avaliações

---

### 7. GET /api/evaluations/stats/:userId
**Estatísticas de avaliações de um usuário**

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalAvaliacoes": 15,
    "mediaGeral": 4.5,
    "criterios": {
      "pontualidade": 4.8,
      "comunicacao": 4.2,
      "tecnico": 4.6,
      "proatividade": 4.3,
      "equipe": 4.7
    },
    "evolucao": [
      { "mes": "Jan", "media": 4.2 },
      { "mes": "Fev", "media": 4.5 }
    ]
  }
}
```

**Regras de Permissão:**
- ✅ Admin: vê estatísticas de qualquer usuário
- ✅ Gestor: vê estatísticas de sua equipe
- ✅ Colaborador: vê apenas suas próprias estatísticas

---

### 8. GET /api/evaluations/nine-box
**Listar avaliações Nine Box**

**Regras de Permissão:**
- ✅ Admin: vê todas
- ✅ Gestor: vê de sua equipe
- ✅ Colaborador: vê apenas a sua

---

### 9. PUT /api/evaluations/:id
**Atualizar avaliação**

**Regras de Permissão:**
- ✅ Admin: pode atualizar qualquer avaliação
- ✅ Gestor: pode atualizar apenas avaliações que criou
- ❌ Colaborador: NÃO pode atualizar

---

### 10. DELETE /api/evaluations/:id
**Deletar avaliação**

**Regras de Permissão:**
- ✅ Admin: pode deletar qualquer avaliação
- ✅ Gestor: pode deletar apenas avaliações que criou
- ❌ Colaborador: NÃO pode deletar

---

## Rotas Protegidas

### evaluation.routes.js

```javascript
import express from 'express';
import { EvaluationController } from './evaluation.controller.js';
import { authMiddleware, isGestorOrAdminMiddleware, isAdminMiddleware } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { 
  createEvaluationSchema, 
  createCommentEvaluationSchema, 
  createNineBoxSchema 
} from './evaluation.validation.js';

const router = express.Router();
const evaluationController = new EvaluationController();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Criar avaliação tradicional (APENAS GESTOR OU ADMIN)
router.post(
  '/',
  isGestorOrAdminMiddleware,
  validate(createEvaluationSchema),
  (req, res, next) => evaluationController.create(req, res, next)
);

// Criar avaliação por comentário (APENAS GESTOR OU ADMIN)
router.post(
  '/comment',
  isGestorOrAdminMiddleware,
  validate(createCommentEvaluationSchema),
  (req, res, next) => evaluationController.createComment(req, res, next)
);

// Criar Nine Box (APENAS GESTOR OU ADMIN)
router.post(
  '/nine-box',
  isGestorOrAdminMiddleware,
  validate(createNineBoxSchema),
  (req, res, next) => evaluationController.createNineBox(req, res, next)
);

// Listar avaliações (todos autenticados, filtrado por permissão no service)
router.get(
  '/',
  (req, res, next) => evaluationController.findAll(req, res, next)
);

// Buscar avaliação por ID (validação de permissão no service)
router.get(
  '/:id',
  (req, res, next) => evaluationController.findById(req, res, next)
);

// Buscar avaliações de um usuário (validação de permissão no service)
router.get(
  '/user/:userId',
  (req, res, next) => evaluationController.findByUserId(req, res, next)
);

// Estatísticas de um usuário (validação de permissão no service)
router.get(
  '/stats/:userId',
  (req, res, next) => evaluationController.getStats(req, res, next)
);

// Listar Nine Box (validação de permissão no service)
router.get(
  '/nine-box',
  (req, res, next) => evaluationController.findAllNineBox(req, res, next)
);

// Atualizar avaliação (validação de permissão no service)
router.put(
  '/:id',
  isGestorOrAdminMiddleware,
  validate(createEvaluationSchema),
  (req, res, next) => evaluationController.update(req, res, next)
);

// Deletar avaliação (validação de permissão no service)
router.delete(
  '/:id',
  isGestorOrAdminMiddleware,
  (req, res, next) => evaluationController.delete(req, res, next)
);

export default router;
```

### Validações no Service

**IMPORTANTE**: Além dos middlewares nas rotas, você deve validar permissões no service para operações sensíveis:

```javascript
// evaluation.service.js
import { AppError } from '../../utils/errors.js';

/**
 * Atualizar avaliação
 */
async update(id, data, userId, userTipo) {
  // Buscar avaliação
  const evaluation = await this.evaluationRepository.findById(id);
  if (!evaluation) {
    throw new AppError('Avaliação não encontrada', 404);
  }

  // Validar permissão
  // Admin pode atualizar qualquer avaliação
  // Gestor pode atualizar apenas avaliações que criou
  if (userTipo !== 'admin' && evaluation.avaliadorId !== userId) {
    throw new AppError('Você não tem permissão para atualizar esta avaliação', 403);
  }

  // Atualizar
  const updated = await this.evaluationRepository.update(id, data);
  return updated;
}

/**
 * Deletar avaliação
 */
async delete(id, userId, userTipo) {
  // Buscar avaliação
  const evaluation = await this.evaluationRepository.findById(id);
  if (!evaluation) {
    throw new AppError('Avaliação não encontrada', 404);
  }

  // Validar permissão
  // Admin pode deletar qualquer avaliação
  // Gestor pode deletar apenas avaliações que criou
  if (userTipo !== 'admin' && evaluation.avaliadorId !== userId) {
    throw new AppError('Você não tem permissão para deletar esta avaliação', 403);
  }

  // Deletar
  await this.evaluationRepository.delete(id);
  return { message: 'Avaliação deletada com sucesso' };
}

/**
 * Buscar avaliação por ID
 */
async findById(id, userId, userTipo) {
  const evaluation = await this.evaluationRepository.findById(id);
  if (!evaluation) {
    throw new AppError('Avaliação não encontrada', 404);
  }

  // Validar permissão
  // Admin: vê qualquer avaliação
  // Gestor: vê se criou ou se é da sua equipe
  // Colaborador: vê apenas se for avaliação dele
  if (userTipo === 'admin') {
    return evaluation;
  }

  if (userTipo === 'gestor') {
    // Gestor pode ver se criou ou se é da equipe dele
    if (evaluation.avaliadorId === userId || evaluation.avaliadoId === userId) {
      return evaluation;
    }
    // TODO: Verificar se o avaliado é da equipe do gestor
    throw new AppError('Você não tem permissão para ver esta avaliação', 403);
  }

  // Colaborador só vê suas próprias avaliações
  if (evaluation.avaliadoId !== userId) {
    throw new AppError('Você não tem permissão para ver esta avaliação', 403);
  }

  return evaluation;
}

/**
 * Listar avaliações com filtros
 */
async findAll(filters, userId, userTipo) {
  // Admin vê todas
  if (userTipo === 'admin') {
    return this.evaluationRepository.findAll(filters);
  }

  // Gestor vê avaliações que criou + avaliações de sua equipe
  if (userTipo === 'gestor') {
    return this.evaluationRepository.findAll({
      ...filters,
      avaliadorId: userId // Por enquanto, apenas as que criou
      // TODO: Adicionar filtro para equipe do gestor
    });
  }

  // Colaborador vê apenas suas próprias avaliações
  return this.evaluationRepository.findAll({
    ...filters,
    avaliadoId: userId
  });
}
```

---

## Estrutura de Arquivos

```
src/modules/evaluations/
├── evaluation.controller.js    # Recebe requisições HTTP
├── evaluation.service.js       # Lógica de negócio
├── evaluation.repository.js    # Acesso ao banco (Prisma)
├── evaluation.routes.js        # Definição das rotas
└── evaluation.validation.js    # Validações com Joi
```

---

## Exemplo de Implementação

### evaluation.validation.js

```javascript
import Joi from 'joi';

const createEvaluationSchema = Joi.object({
  avaliadoId: Joi.string().uuid().required(),
  tipo: Joi.string().valid('gestor', 'colaborador').required(),
  criterios: Joi.object({
    pontualidade: Joi.number().min(1).max(5).required(),
    comunicacao: Joi.number().min(1).max(5).required(),
    tecnico: Joi.number().min(1).max(5).required(),
    proatividade: Joi.number().min(1).max(5).required(),
    equipe: Joi.number().min(1).max(5).required()
  }).required(),
  comentario: Joi.string().optional()
});

const createCommentEvaluationSchema = Joi.object({
  avaliadoId: Joi.string().uuid().required(),
  comentario: Joi.string().min(20).required()
    .messages({
      'string.min': 'Comentário deve ter no mínimo 20 caracteres'
    })
});

const createNineBoxSchema = Joi.object({
  pessoaId: Joi.string().uuid().required(),
  performance: Joi.number().valid(1, 2, 3).required()
    .messages({
      'any.only': 'Performance deve ser 1 (Baixo), 2 (Médio) ou 3 (Alto)'
    }),
  potential: Joi.number().valid(1, 2, 3).required()
    .messages({
      'any.only': 'Potential deve ser 1 (Baixo), 2 (Médio) ou 3 (Alto)'
    }),
  comentario: Joi.string().optional()
});

export {
  createEvaluationSchema,
  createCommentEvaluationSchema,
  createNineBoxSchema
};
```

### evaluation.service.js (Exemplo de método)

```javascript
import { AppError } from '../../utils/errors.js';

class EvaluationService {
  constructor(evaluationRepository, userRepository) {
    this.evaluationRepository = evaluationRepository;
    this.userRepository = userRepository;
  }

  /**
   * Criar avaliação tradicional
   */
  async create(data, avaliadorId) {
    // Verificar se avaliado existe
    const avaliado = await this.userRepository.findById(data.avaliadoId);
    if (!avaliado) {
      throw new AppError('Usuário avaliado não encontrado', 404);
    }

    // Calcular média dos critérios
    const criteriosArray = Object.values(data.criterios);
    const media = criteriosArray.reduce((a, b) => a + b, 0) / criteriosArray.length;

    // Criar avaliação
    const evaluation = await this.evaluationRepository.create({
      ...data,
      avaliadorId,
      media: parseFloat(media.toFixed(1))
    });

    return evaluation;
  }

  /**
   * Criar avaliação Nine Box
   */
  async createNineBox(data, avaliadorId) {
    // Verificar se pessoa existe
    const pessoa = await this.userRepository.findById(data.pessoaId);
    if (!pessoa) {
      throw new AppError('Pessoa não encontrada', 404);
    }

    // Determinar categoria baseada em performance e potential
    const categoria = this.determineNineBoxCategory(
      data.performance,
      data.potential
    );

    // Criar avaliação Nine Box
    const nineBox = await this.evaluationRepository.createNineBox({
      ...data,
      categoria
    });

    return nineBox;
  }

  /**
   * Determinar categoria Nine Box
   */
  determineNineBoxCategory(performance, potential) {
    const matrix = {
      '3-3': 'Superstar',
      '3-2': 'Especialista',
      '3-1': 'Âncora',
      '2-3': 'Estrela',
      '2-2': 'Núcleo',
      '2-1': 'Trabalhador',
      '1-3': 'Enigma',
      '1-2': 'Dilema',
      '1-1': 'Questão'
    };

    return matrix[`${performance}-${potential}`];
  }

  /**
   * Calcular estatísticas de um usuário
   */
  async getStats(userId) {
    const avaliacoes = await this.evaluationRepository.findByUserId(userId);

    if (avaliacoes.length === 0) {
      return {
        totalAvaliacoes: 0,
        mediaGeral: 0,
        criterios: {},
        evolucao: []
      };
    }

    // Calcular média geral
    const medias = avaliacoes.map(a => a.media).filter(m => m !== null);
    const mediaGeral = medias.reduce((a, b) => a + b, 0) / medias.length;

    // Calcular média por critério
    const criterios = {
      pontualidade: 0,
      comunicacao: 0,
      tecnico: 0,
      proatividade: 0,
      equipe: 0
    };

    avaliacoes.forEach(av => {
      if (av.criterios) {
        Object.keys(criterios).forEach(key => {
          if (av.criterios[key]) {
            criterios[key] += av.criterios[key];
          }
        });
      }
    });

    Object.keys(criterios).forEach(key => {
      criterios[key] = parseFloat((criterios[key] / avaliacoes.length).toFixed(1));
    });

    return {
      totalAvaliacoes: avaliacoes.length,
      mediaGeral: parseFloat(mediaGeral.toFixed(1)),
      criterios,
      evolucao: this.calculateEvolution(avaliacoes)
    };
  }

  /**
   * Calcular evolução ao longo do tempo
   */
  calculateEvolution(avaliacoes) {
    // Agrupar por mês
    const porMes = {};
    
    avaliacoes.forEach(av => {
      const mes = new Date(av.data).toLocaleDateString('pt-BR', { 
        month: 'short', 
        year: 'numeric' 
      });
      
      if (!porMes[mes]) {
        porMes[mes] = [];
      }
      
      if (av.media) {
        porMes[mes].push(av.media);
      }
    });

    // Calcular média por mês
    return Object.keys(porMes).map(mes => ({
      mes,
      media: parseFloat(
        (porMes[mes].reduce((a, b) => a + b, 0) / porMes[mes].length).toFixed(1)
      )
    }));
  }
}

export { EvaluationService };
```

---

## Checklist de Implementação

- [ ] Criar models Evaluation e NineBox no schema.prisma
- [ ] Rodar migrations: `npx prisma migrate dev`
- [ ] Criar evaluation.validation.js com validações Joi
- [ ] Implementar evaluation.repository.js
- [ ] Implementar evaluation.service.js com lógica de negócio
- [ ] Implementar evaluation.controller.js
- [ ] Criar evaluation.routes.js
- [ ] Implementar cálculo de categoria Nine Box
- [ ] Implementar estatísticas e evolução
- [ ] Testar todos os endpoints no Postman
- [ ] Documentar no README

---

## Como Testar

1. **Criar avaliação**: POST /api/evaluations
2. **Criar avaliação por comentário**: POST /api/evaluations/comment
3. **Criar Nine Box**: POST /api/evaluations/nine-box
4. **Listar avaliações**: GET /api/evaluations
5. **Ver estatísticas**: GET /api/evaluations/stats/:userId

---

## Dicas Importantes

1. **Validar permissões**: Apenas gestores podem avaliar colaboradores
2. **Calcular médias** corretamente
3. **Determinar categoria Nine Box** baseado na matriz
4. **Agrupar dados** para estatísticas
5. **Filtrar por tipo** de avaliação
6. **Ordenar por data** (mais recentes primeiro)

---

Qualquer dúvida, chama.


---

## Parte 2: Módulo Nine Box (1h)

### O que é Nine Box?

Nine Box é uma matriz 3×3 que avalia colaboradores em duas dimensões:
- **Performance** (Desempenho): 1 (Baixo), 2 (Médio), 3 (Alto)
- **Potential** (Potencial): 1 (Baixo), 2 (Médio), 3 (Alto)

Cada combinação gera uma **categoria automaticamente**:

| Performance | Potential | Categoria |
|------------|-----------|-----------|
| 1 | 1 | Questão |
| 2 | 1 | Trabalhador |
| 3 | 1 | Âncora |
| 1 | 2 | Dilema |
| 2 | 2 | Núcleo |
| 3 | 2 | Especialista |
| 1 | 3 | Enigma |
| 2 | 3 | Estrela |
| 3 | 3 | Superstar |

---

### Estrutura do Módulo Nine Box

```
src/modules/ninebox/
├── ninebox.validation.js
├── ninebox.repository.js
├── ninebox.service.js
├── ninebox.controller.js
└── ninebox.routes.js
```

---

### TAREFA 1: Criar pasta ninebox

```bash
mkdir -p src/modules/ninebox
```

---

### TAREFA 2: Criar ninebox.validation.js

Arquivo: `src/modules/ninebox/ninebox.validation.js`

```javascript
import Joi from 'joi';

const createNineBoxSchema = Joi.object({
  pessoaId: Joi.string().uuid().required(),
  performance: Joi.number().integer().min(1).max(3).required()
    .messages({
      'number.min': 'Performance deve ser entre 1 (baixo) e 3 (alto)',
      'number.max': 'Performance deve ser entre 1 (baixo) e 3 (alto)'
    }),
  potential: Joi.number().integer().min(1).max(3).required()
    .messages({
      'number.min': 'Potential deve ser entre 1 (baixo) e 3 (alto)',
      'number.max': 'Potential deve ser entre 1 (baixo) e 3 (alto)'
    }),
  comentario: Joi.string().max(500).optional().allow('', null)
});

const updateNineBoxSchema = Joi.object({
  performance: Joi.number().integer().min(1).max(3).optional(),
  potential: Joi.number().integer().min(1).max(3).optional(),
  comentario: Joi.string().max(500).optional().allow('', null)
});

export {
  createNineBoxSchema,
  updateNineBoxSchema
};
```

---

### TAREFA 3: Criar ninebox.repository.js

Arquivo: `src/modules/ninebox/ninebox.repository.js`

```javascript
import { prisma } from '../../config/database.js';

class NineBoxRepository {
  async create(data) {
    return prisma.nineBox.create({
      data,
      include: {
        pessoa: {
          select: {
            id: true,
            ra: true,
            nome: true,
            email: true,
            tipo: true,
            cargo: true,
            departamento: true,
            foto: true
          }
        }
      }
    });
  }

  async findById(id) {
    return prisma.nineBox.findUnique({
      where: { id },
      include: {
        pessoa: {
          select: {
            id: true,
            ra: true,
            nome: true,
            email: true,
            tipo: true,
            cargo: true,
            departamento: true,
            foto: true
          }
        }
      }
    });
  }

  async findAll({ page = 1, limit = 10, categoria, pessoaId }) {
    const skip = (page - 1) * limit;
    const where = {};

    if (categoria) where.categoria = categoria;
    if (pessoaId) where.pessoaId = pessoaId;

    const [nineBoxes, total] = await Promise.all([
      prisma.nineBox.findMany({
        where,
        skip,
        take: limit,
        include: {
          pessoa: {
            select: {
              id: true,
              ra: true,
              nome: true,
              email: true,
              tipo: true,
              cargo: true,
              departamento: true,
              foto: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.nineBox.count({ where })
    ]);

    return {
      nineBoxes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findByPessoa(pessoaId) {
    return prisma.nineBox.findMany({
      where: { pessoaId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id, data) {
    return prisma.nineBox.update({
      where: { id },
      data,
      include: {
        pessoa: {
          select: {
            id: true,
            ra: true,
            nome: true,
            email: true,
            tipo: true,
            cargo: true,
            departamento: true,
            foto: true
          }
        }
      }
    });
  }

  async delete(id) {
    return prisma.nineBox.delete({ where: { id } });
  }

  async getGridDistribution() {
    const nineBoxes = await prisma.nineBox.findMany({
      select: {
        categoria: true,
        performance: true,
        potential: true
      }
    });

    const distribution = nineBoxes.reduce((acc, nb) => {
      if (!acc[nb.categoria]) {
        acc[nb.categoria] = 0;
      }
      acc[nb.categoria]++;
      return acc;
    }, {});

    const byCoordinates = nineBoxes.reduce((acc, nb) => {
      const key = `${nb.performance}-${nb.potential}`;
      if (!acc[key]) {
        acc[key] = {
          performance: nb.performance,
          potential: nb.potential,
          categoria: nb.categoria,
          count: 0
        };
      }
      acc[key].count++;
      return acc;
    }, {});

    return {
      total: nineBoxes.length,
      porCategoria: distribution,
      porCoordenadas: Object.values(byCoordinates)
    };
  }
}

export { NineBoxRepository };
```

---

### TAREFA 4: Criar ninebox.service.js

Arquivo: `src/modules/ninebox/ninebox.service.js`

```javascript
import { AppError } from '../../utils/errors.js';
import { UserRepository } from '../users/user.repository.js';

class NineBoxService {
  constructor(nineBoxRepository) {
    this.nineBoxRepository = nineBoxRepository;
    this.userRepository = new UserRepository();
  }

  // Calcula a categoria baseada em performance e potential
  calculateCategoria(performance, potential) {
    const categorias = {
      '1-1': 'Questão',
      '2-1': 'Trabalhador',
      '3-1': 'Âncora',
      '1-2': 'Dilema',
      '2-2': 'Núcleo',
      '3-2': 'Especialista',
      '1-3': 'Enigma',
      '2-3': 'Estrela',
      '3-3': 'Superstar'
    };

    return categorias[`${performance}-${potential}`] || 'Indefinido';
  }

  async create(data, userTipo) {
    // Apenas gestor e admin podem criar
    if (userTipo === 'colaborador') {
      throw new AppError('Sem permissão para criar avaliações Nine Box', 403);
    }

    // Verifica se a pessoa existe
    const pessoa = await this.userRepository.findById(data.pessoaId);
    if (!pessoa) {
      throw new AppError('Pessoa não encontrada', 404);
    }

    // Calcula a categoria automaticamente
    const categoria = this.calculateCategoria(data.performance, data.potential);

    const nineBox = await this.nineBoxRepository.create({
      ...data,
      categoria
    });

    return nineBox;
  }

  async findById(id, userId, userTipo) {
    const nineBox = await this.nineBoxRepository.findById(id);
    if (!nineBox) {
      throw new AppError('Avaliação Nine Box não encontrada', 404);
    }

    // Colaborador só pode ver suas próprias avaliações
    if (userTipo === 'colaborador' && nineBox.pessoaId !== userId) {
      throw new AppError('Sem permissão para ver esta avaliação', 403);
    }

    return nineBox;
  }

  async findAll(filters, userId, userTipo) {
    // Colaborador só pode ver suas próprias avaliações
    if (userTipo === 'colaborador') {
      filters.pessoaId = userId;
    }

    return this.nineBoxRepository.findAll(filters);
  }

  async findByPessoa(pessoaId, userId, userTipo) {
    const pessoa = await this.userRepository.findById(pessoaId);
    if (!pessoa) {
      throw new AppError('Pessoa não encontrada', 404);
    }

    // Colaborador só pode ver suas próprias avaliações
    if (userTipo === 'colaborador' && pessoaId !== userId) {
      throw new AppError('Sem permissão para ver estas avaliações', 403);
    }

    return this.nineBoxRepository.findByPessoa(pessoaId);
  }

  async update(id, data, userTipo) {
    // Apenas gestor e admin podem atualizar
    if (userTipo === 'colaborador') {
      throw new AppError('Sem permissão para atualizar avaliações Nine Box', 403);
    }

    const nineBox = await this.nineBoxRepository.findById(id);
    if (!nineBox) {
      throw new AppError('Avaliação Nine Box não encontrada', 404);
    }

    // Recalcula categoria se mudou performance ou potential
    if (data.performance || data.potential) {
      const performance = data.performance || nineBox.performance;
      const potential = data.potential || nineBox.potential;
      data.categoria = this.calculateCategoria(performance, potential);
    }

    return this.nineBoxRepository.update(id, data);
  }

  async delete(id, userTipo) {
    // Apenas admin pode deletar
    if (userTipo !== 'admin') {
      throw new AppError('Sem permissão para deletar avaliações Nine Box', 403);
    }

    const nineBox = await this.nineBoxRepository.findById(id);
    if (!nineBox) {
      throw new AppError('Avaliação Nine Box não encontrada', 404);
    }

    await this.nineBoxRepository.delete(id);
    return { message: 'Avaliação Nine Box deletada com sucesso' };
  }

  async getGridDistribution(userTipo) {
    // Colaborador não pode ver distribuição geral
    if (userTipo === 'colaborador') {
      throw new AppError('Sem permissão para ver distribuição do grid', 403);
    }

    return this.nineBoxRepository.getGridDistribution();
  }
}

export { NineBoxService };
```

---

### TAREFA 5: Criar ninebox.controller.js

Arquivo: `src/modules/ninebox/ninebox.controller.js`

```javascript
import { NineBoxRepository } from './ninebox.repository.js';
import { NineBoxService } from './ninebox.service.js';

const nineBoxRepository = new NineBoxRepository();
const nineBoxService = new NineBoxService(nineBoxRepository);

class NineBoxController {
  async create(req, res, next) {
    try {
      const nineBox = await nineBoxService.create(req.body, req.user.tipo);
      return res.status(201).json({
        success: true,
        data: nineBox,
        message: 'Avaliação Nine Box criada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const nineBox = await nineBoxService.findById(
        req.params.id,
        req.user.userId,
        req.user.tipo
      );
      return res.json({
        success: true,
        data: nineBox
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const { page, limit, categoria, pessoaId } = req.query;
      const result = await nineBoxService.findAll(
        {
          page: parseInt(page) || 1,
          limit: parseInt(limit) || 10,
          categoria,
          pessoaId
        },
        req.user.userId,
        req.user.tipo
      );
      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async findByPessoa(req, res, next) {
    try {
      const nineBoxes = await nineBoxService.findByPessoa(
        req.params.pessoaId,
        req.user.userId,
        req.user.tipo
      );
      return res.json({
        success: true,
        data: nineBoxes
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const nineBox = await nineBoxService.update(
        req.params.id,
        req.body,
        req.user.tipo
      );
      return res.json({
        success: true,
        data: nineBox,
        message: 'Avaliação Nine Box atualizada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await nineBoxService.delete(req.params.id, req.user.tipo);
      return res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  async getGridDistribution(req, res, next) {
    try {
      const distribution = await nineBoxService.getGridDistribution(req.user.tipo);
      return res.json({
        success: true,
        data: distribution
      });
    } catch (error) {
      next(error);
    }
  }
}

export { NineBoxController };
```

---

### TAREFA 6: Criar ninebox.routes.js

Arquivo: `src/modules/ninebox/ninebox.routes.js`

```javascript
import express from 'express';
import { NineBoxController } from './ninebox.controller.js';
import { authMiddleware, isGestorOrAdminMiddleware, isAdminMiddleware } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { createNineBoxSchema, updateNineBoxSchema } from './ninebox.validation.js';

const router = express.Router();
const nineBoxController = new NineBoxController();

// Todas as rotas precisam de autenticação
router.use(authMiddleware);

// Rotas públicas (autenticadas)
router.get('/', (req, res, next) => nineBoxController.findAll(req, res, next));
router.get('/:id', (req, res, next) => nineBoxController.findById(req, res, next));
router.get('/pessoa/:pessoaId', (req, res, next) => nineBoxController.findByPessoa(req, res, next));

// Rotas de gestor/admin
router.get('/stats/distribution', isGestorOrAdminMiddleware, (req, res, next) => nineBoxController.getGridDistribution(req, res, next));
router.post('/', isGestorOrAdminMiddleware, validate(createNineBoxSchema), (req, res, next) => nineBoxController.create(req, res, next));
router.put('/:id', isGestorOrAdminMiddleware, validate(updateNineBoxSchema), (req, res, next) => nineBoxController.update(req, res, next));

// Rotas de admin
router.delete('/:id', isAdminMiddleware, (req, res, next) => nineBoxController.delete(req, res, next));

export default router;
```

---

### TAREFA 7: Adicionar rota no app.js

Arquivo: `src/app.js` (adicionar linha)

```javascript
import nineBoxRoutes from './modules/ninebox/ninebox.routes.js';

// ... outras rotas ...

app.use('/api/ninebox', nineBoxRoutes);
```

---

### TAREFA 8: Testar Nine Box no Postman

**1. Criar avaliação Nine Box (gestor/admin)**
```
POST http://localhost:3000/api/ninebox
Authorization: Bearer SEU_TOKEN_GESTOR
Content-Type: application/json

{
  "pessoaId": "uuid-da-pessoa",
  "performance": 3,
  "potential": 3,
  "comentario": "Excelente desempenho e alto potencial"
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "pessoaId": "uuid",
    "performance": 3,
    "potential": 3,
    "categoria": "Superstar",
    "comentario": "Excelente desempenho e alto potencial",
    "data": "2026-05-04T...",
    "pessoa": {
      "id": "uuid",
      "ra": "2022001",
      "nome": "Ana Costa",
      "email": "ana@eniac.edu.br",
      "tipo": "colaborador",
      "cargo": "Desenvolvedora"
    }
  },
  "message": "Avaliação Nine Box criada com sucesso"
}
```

**2. Listar todas as avaliações Nine Box**
```
GET http://localhost:3000/api/ninebox
Authorization: Bearer SEU_TOKEN
```

**3. Buscar avaliações de uma pessoa**
```
GET http://localhost:3000/api/ninebox/pessoa/uuid-da-pessoa
Authorization: Bearer SEU_TOKEN
```

**4. Ver distribuição do grid (gestor/admin)**
```
GET http://localhost:3000/api/ninebox/stats/distribution
Authorization: Bearer SEU_TOKEN_GESTOR
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "total": 8,
    "porCategoria": {
      "Superstar": 2,
      "Estrela": 3,
      "Núcleo": 2,
      "Trabalhador": 1
    },
    "porCoordenadas": [
      {
        "performance": 3,
        "potential": 3,
        "categoria": "Superstar",
        "count": 2
      },
      {
        "performance": 2,
        "potential": 3,
        "categoria": "Estrela",
        "count": 3
      }
    ]
  }
}
```

**5. Atualizar avaliação (gestor/admin)**
```
PUT http://localhost:3000/api/ninebox/uuid-da-avaliacao
Authorization: Bearer SEU_TOKEN_GESTOR
Content-Type: application/json

{
  "performance": 2,
  "potential": 3,
  "comentario": "Comentário atualizado"
}
```

**6. Deletar avaliação (apenas admin)**
```
DELETE http://localhost:3000/api/ninebox/uuid-da-avaliacao
Authorization: Bearer SEU_TOKEN_ADMIN
```

---

## Resumo Final - Estagiário 2

Você implementou **2 módulos completos**:

### ✅ Módulo de Avaliações
- CRUD completo de avaliações
- Validações com Joi
- Controle de permissões
- Estatísticas por avaliado
- Filtros e paginação
- **10 endpoints**

### ✅ Módulo Nine Box
- CRUD completo de avaliações Nine Box
- Cálculo automático de categoria (9 categorias)
- Validações (performance e potential de 1 a 3)
- Controle de permissões
- Distribuição do grid
- Histórico por pessoa
- **7 endpoints**

**Total: 17 endpoints implementados**

Próximo passo: Estagiário 3 implementa Competências e Relatórios!
