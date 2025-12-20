# Controle de Gastos Residenciais - Teste Técnico

Sistema fullstack para gerenciamento de despesas e receitas domésticas, desenvolvido como teste técnico utilizando ASP.NET Core Web API (backend) e React + TypeScript (frontend).

## 📋 Sobre o Teste

Este projeto foi desenvolvido como parte de um processo seletivo, demonstrando habilidades em desenvolvimento fullstack com foco em:

- Arquitetura de software limpa e organizada
- Desenvolvimento de APIs RESTful
- Interface moderna e responsiva
- Implementação de regras de negócio
- Integração frontend-backend
- Boas práticas de programação

## 🎯 Requisitos Implementados

### Funcionalidades Principais

- ✅ **CRUD de Pessoas** - Cadastro completo com validação de idade
- ✅ **CRUD de Categorias** - Gerenciamento com finalidades (Despesa, Receita, Ambas)
- ✅ **CRUD de Transações** - Registro de receitas e despesas
- ✅ **Dashboard Interativo** - Visão geral consolidada das finanças
- ✅ **Relatórios Detalhados** - Análise por pessoa e categoria
- ✅ **Validações de Negócio** - Regras implementadas conforme especificação

### Regras de Negócio Implementadas

- ⚠️ Menores de 18 anos não podem registrar receitas
- 🏷️ Categorias devem respeitar sua finalidade ao registrar transações
- 💰 Todas as transações devem ter valor maior que zero
- 🔗 Relacionamentos entre entidades mantidos com integridade

## 🏗️ Arquitetura e Tecnologias

### Backend - ASP.NET Core Web API

**Estrutura em Camadas (Clean Architecture):**

```
ControleGastos/
├── API/                          # Camada de Apresentação
│   └── Controllers/              # Endpoints REST
├── Application/                  # Camada de Aplicação
│   ├── DTOs/                    # Objetos de Transferência
│   └── Services/                # Lógica de Negócio
│       └── Interfaces/          # Contratos dos Serviços
├── Domain/                       # Camada de Domínio
│   ├── Entities/                # Entidades do Negócio
│   └── Enums/                   # Enumeradores
└── Infrastructure/               # Camada de Infraestrutura
    ├── Data/                    # Contexto EF Core
    └── Repositories/            # Acesso a Dados
        └── Interfaces/          # Contratos dos Repositórios
```

**Stack Tecnológico:**
- **.NET 8.0** - Framework principal
- **Entity Framework Core** - ORM
- **SQLite** - Banco de dados leve e portátil
- **Dependency Injection** - Inversão de controle
- **Repository Pattern** - Abstração de dados
- **DTO Pattern** - Transferência de dados

### Frontend - React + TypeScript

**Estrutura Organizada:**

```
frontend/
├── src/
│   ├── components/              # Componentes Reutilizáveis
│   │   ├── DashboardTable/      # Tabelas do dashboard
│   │   ├── Footer/              # Rodapé
│   │   ├── Menu/                # Navegação
│   │   ├── Modal/               # Diálogos de confirmação
│   │   ├── Table/               # Tabela genérica com paginação
│   │   └── TabelaRelatorio/     # Tabela de relatórios
│   ├── dtos/                    # Interfaces TypeScript
│   ├── hooks/                   # Custom Hooks
│   ├── pages/                   # Páginas da Aplicação
│   ├── services/                # Integração com API
│   ├── App.tsx                  # Componente Raiz
│   ├── main.tsx                 # Entry Point
│   └── style.css                # Estilos Globais
├── .env.example                 # Template de configuração
└── package.json
```

**Stack Tecnológico:**
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Bootstrap 5** - Framework CSS
- **React Toastify** - Notificações
- **Vite** - Build tool moderno

## 🚀 Instruções de Execução

### Pré-requisitos

Certifique-se de ter instalado:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) ou superior
- [Node.js](https://nodejs.org/) v18+ e npm
- [Git](https://git-scm.com/)

**Nota:** O projeto utiliza SQLite, portanto **não é necessário** instalar SQL Server ou qualquer outro banco de dados. O arquivo `.db` será criado automaticamente na primeira execução.

### 1️⃣ Configuração do Backend

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd ControleGastos

# Restaurar dependências
dotnet restore

# Aplicar migrations (cria o banco SQLite automaticamente)
dotnet ef database update --project Infrastructure --startup-project API

# Executar a aplicação
cd API
dotnet run

# A API estará disponível em: https://localhost:5001 ou http://localhost:5000
# O arquivo controlegastos.db será criado automaticamente no diretório do projeto
```

**Endpoints Swagger:** Acesse `https://localhost:5001/swagger` para documentação interativa

### 2️⃣ Configuração do Frontend

```bash
# Navegar para o diretório frontend
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env e configurar a URL da API
# VITE_API_BASE_URL=https://localhost:5001/api

# Executar em modo desenvolvimento
npm run dev

# A aplicação estará disponível em: http://localhost:5173
```

## 📡 Documentação da API

### Pessoas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pessoas` | Lista todas as pessoas |
| GET | `/api/pessoas/{id}` | Busca pessoa por ID |
| POST | `/api/pessoas` | Cria nova pessoa |
| DELETE | `/api/pessoas/{id}` | Remove pessoa |

**Payload POST:**
```json
{
  "nome": "João Silva",
  "idade": 25
}
```

### Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/categorias` | Lista todas as categorias |
| GET | `/api/categorias/{id}` | Busca categoria por ID |
| POST | `/api/categorias` | Cria nova categoria |

**Payload POST:**
```json
{
  "descricao": "Alimentação",
  "finalidade": 1  // 1=Despesa, 2=Receita, 3=Ambas
}
```

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/transacoes` | Lista todas as transações |
| GET | `/api/transacoes/{id}` | Busca transação por ID |
| POST | `/api/transacoes` | Cria nova transação |

**Payload POST:**
```json
{
  "descricao": "Compra no supermercado",
  "valor": 150.50,
  "tipo": 1,  // 1=Despesa, 2=Receita
  "pessoaId": 1,
  "categoriaId": 1
}
```

### Relatórios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/relatorios/pessoas` | Relatório consolidado por pessoa |
| GET | `/api/relatorios/categorias` | Relatório consolidado por categoria |

**Resposta:**
```json
{
  "itens": [
    {
      "pessoaId": 1,
      "pessoaNome": "João Silva",
      "totalReceitas": 5000.00,
      "totalDespesas": 3000.00,
      "saldo": 2000.00
    }
  ],
  "totalReceitas": 5000.00,
  "totalDespesas": 3000.00,
  "saldo": 2000.00
}
```

## 🎨 Funcionalidades da Interface

### Páginas Implementadas

1. **Dashboard (/)** 
   - Cards com resumo financeiro geral
   - Tabelas resumidas de pessoas e categorias
   - Links rápidos para relatórios detalhados

2. **Pessoas (/pessoas)**
   - Formulário de cadastro
   - Listagem com paginação e ordenação
   - Exclusão com confirmação
   - Badge visual para menores de idade

3. **Categorias (/categorias)**
   - Cadastro com seleção de finalidade
   - Listagem categorizada
   - Badges coloridos por tipo

4. **Transações (/transacoes)**
   - Formulário completo de registro
   - Seleção de pessoa e categoria
   - Listagem com formatação de valores
   - Validações em tempo real

5. **Relatório por Pessoa (/relatorios/pessoas)**
   - Cards com totais gerais
   - Tabela detalhada por pessoa
   - Indicadores visuais de saldo

6. **Relatório por Categoria (/relatorios/categorias)**
   - Análise consolidada
   - Comparativo receitas vs despesas
   - Totalizadores

### Recursos de UX/UI

- ✨ **Design Moderno** - Gradientes e animações suaves
- 📱 **Totalmente Responsivo** - Adapta-se a qualquer dispositivo
- 🎯 **Feedback Visual** - Toasts informativos e confirmações
- 📊 **Tabelas Inteligentes** - Paginação, ordenação e filtros
- 🔄 **Loading States** - Indicadores de carregamento
- ⚡ **Performance** - Otimizado para velocidade
- 🎨 **Código de Cores** - Verde (receitas) e Vermelho (despesas)
- 🔔 **Notificações** - Feedback imediato de ações

## 🛠️ Scripts e Comandos

### Backend
```bash
# Compilar
dotnet build

# Executar
dotnet run --project API

# Executar testes (se implementados)
dotnet test

# Criar migration
dotnet ef migrations add NomeDaMigration --project Infrastructure --startup-project API

# Aplicar migrations
dotnet ef database update --project Infrastructure --startup-project API

# Build para produção
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview do build
npm run preview

# Linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 📦 Deploy

### Backend
```bash
dotnet publish -c Release -o ./publish
# Arquivos prontos para deploy em ./publish
```

### Frontend
```bash
npm run build
# Arquivos estáticos prontos em ./dist
```

## ✅ Diferenciais Implementados

- 🏛️ **Arquitetura Limpa** - Separação clara de responsabilidades
- 🔒 **Validações Robustas** - Frontend e Backend
- 📝 **Código Limpo** - Seguindo convenções e boas práticas
- 🧩 **Componentes Reutilizáveis** - DRY principle
- 🎣 **Custom Hooks** - Lógica encapsulada
- 🔄 **Estado Gerenciado** - Fluxo de dados organizado
- 🎨 **UI/UX Profissional** - Interface intuitiva
- 📱 **Mobile First** - Design responsivo
- ⚡ **Performance** - Otimizações implementadas
- 🐛 **Tratamento de Erros** - Error handling completo

## 📚 Decisões Técnicas

### Por que Clean Architecture?
- Facilita manutenção e escalabilidade
- Testabilidade melhorada
- Independência de frameworks
- Regras de negócio isoladas

### Por que SQLite?
- Não requer instalação de servidor de banco de dados
- Banco de dados em arquivo único e portátil
- Ideal para desenvolvimento e demonstrações
- Fácil de compartilhar e avaliar
- Zero configuração necessária

### Por que Custom Hooks?
- Reutilização de lógica
- Separação de concerns
- Código mais limpo
- Facilita testes

## 📝 Observações

- ✅ Todos os requisitos do teste foram implementados
- ✅ Código comentado onde necessário
- ✅ Segue princípios SOLID
- ✅ Interface intuitiva e profissional
- ✅ Responsivo e acessível
- ✅ Pronto para apresentação

## 👤 Desenvolvedor

Projeto desenvolvido como teste técnico, demonstrando proficiência em desenvolvimento fullstack com .NET e React.