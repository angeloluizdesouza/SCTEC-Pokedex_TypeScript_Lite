# Pokédex TypeScript Lite 🐾⚡

Aplicação back-end desenvolvida em **Node.js** com **TypeScript** para consulta de Pokémon integrando com a [PokeAPI](https://pokeapi.co/) e gerenciamento de catálogo local (PC Box) com persistência de dados em arquivo JSON.

---

## 🚀 Funcionalidades

- 🔍 **Consulta à PokeAPI**: Integração HTTP para obter detalhes de Pokémon (ID, Nome, Tipos, Altura, Peso, Stats e Sprites).
- 📦 **Gerenciamento de PC Box (Catálogo Local)**:
  - Adição de Pokémon ao catálogo.
  - Prevenção de cadastros duplicados (por ID).
  - Remoção por ID.
  - Listagem dos Pokémon salvos no PC Box.
- 💾 **Persistência em JSON**: Armazenamento persistente em arquivo local `pc_box.json`.
- ⚠️ **Tratamento de Erros Personalizados**: Tratamento de exceções para Pokémon não encontrado, erros de rede e IDs inválidos.

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript** (v5.5+)
- **Node.js** (v22+)
- **tsx** (Execução direta de código TypeScript sem build prévio)
- **Fetch API** (Requisições HTTP nativas)

---

## 📁 Estrutura do Projeto

```text
Mini-Projeto/
├── src/
│   ├── controllers/
│   │   └── TerminalController.ts  # Exibição e formatação de logs no terminal
│   ├── models/
│   │   ├── CustomErrors.ts        # Exceções customizadas da aplicação
│   │   └── Pokemon.ts             # Interface e classes de domínio
│   ├── services/
│   │   ├── BoxService.ts          # Gerenciamento e persistência do PC Box
│   │   └── PokeApiService.ts      # Integração e requisições HTTP à PokeAPI
│   ├── utils/
│   │   └── textFormatters.ts      # Utilitários de formatação de texto e estatísticas
│   └── main.ts                    # Ponto de entrada da aplicação
├── pc_box.json                    # Arquivo de persistência do PC Box
├── package.json                   # Dependências e scripts do Node.js
├── tsconfig.json                  # Configuração do compilador TypeScript
└── README.md                      # Documentação do projeto
```

---

## 🌿 Estrutura de Branches & Commits (Git Flow)

O repositório está estruturado segundo as boas práticas de versionamento:

| Branch | Descrição |
| :--- | :--- |
| `main` | Branch principal e estável de produção. |
| `develop` | Branch de integração para desenvolvimento de novas funcionalidades. |
| `feat/pokedex` | Branch com a implementação completa do catálogo Pokédex e serviços. |
| `docs/readme` | Branch dedicada à documentação do repositório (`README.md`). |

---

## 🏁 Como Executar

### Prerequisitos
- Node.js versão 18 ou superior instalado.

### Instalação
```bash
npm install
```

### Executar em Modo de Desenvolvimento
```bash
npm run dev
```

### Verificar Tipagem (TypeScript)
```bash
npm run typecheck
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no curso SCTEC.
