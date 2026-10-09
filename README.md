# Pokédex TypeScript Lite 🐾⚡

Aplicação back-end desenvolvida em **Node.js** com **TypeScript** para consulta de Pokémon integrando com a [PokeAPI](https://pokeapi.co/) e gerenciamento de catálogo local (PC Box) com persistência em JSON.

## 🔗 Links Úteis

- Repositório no GitHub: https://github.com/angeloluizdesouza/SCTEC-Pokedex_TypeScript_Lite
- GitHub Projects (Kanban): não há um board público/ativo configurado para este repositório no momento.

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

## 📤 Resultado da Execução

Abaixo está o resultado da execução do projeto com as operações de busca, adição, listagem e remoção de Pokémon:

```
[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
[OK] pikachu adicionado ao catálogo.

[OK] Pokémon encontrado: charmander
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
[AVISO] charmander já está no catálogo.

[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
[AVISO] pikachu já está no catálogo.

[ERRO] Pokémon não encontrado: pokemon-inexistente

Catálogo atual:
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85 | HP: 39 ATK: 52 DEF: 43
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 ATK: 55 DEF: 40

[OK] Pokémon removido do catálogo.

Catálogo atual:
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85 | HP: 39 ATK: 52 DEF: 43
```

**Descrição das operações:**
- ✅ **Busca de Pokémon**: Pikachu e Charmander foram encontrados com sucesso na PokeAPI.
- ✅ **Adição ao catálogo**: Primeiro Pokémon adicionado sem duplicatas.
- ⚠️ **Prevenção de duplicatas**: Sistema alertou que Charmander e Pikachu já existiam no catálogo.
- ❌ **Tratamento de erros**: Pokémon inexistente retornou erro adequado.
- 📋 **Listagem**: Catálogo exibiu todos os Pokémon com suas estatísticas completas.
- 🗑️ **Remoção**: Pikachu foi removido com sucesso do catálogo.

---

## 📚 Explicações Técnicas

### 🔤 **TypeScript - Tipagem, Interfaces, Parâmetros e Retornos Tipados**

TypeScript foi utilizado em todo o projeto para garantir **segurança de tipos** e melhorar a manutenibilidade do código. As tipagens estão presentes em:

- **Parâmetros de funções**: Cada função possui tipos explícitos para seus argumentos.
  ```typescript
  buscarPokemon(id: number): Promise<Pokemon> { ... }
  ```

- **Retornos tipados**: Todas as funções declaram o tipo de retorno esperado.
  ```typescript
  async obterDados(): Promise<PokemonResumo[]> { ... }
  ```

- **Variáveis tipadas**: Declaração explícita de tipos em variáveis críticas.
  ```typescript
  const catalogo: Pokemon[] = [];
  const nome: string = "Pikachu";
  ```

- **Uso de interfaces e tipos**: Estruturação clara das estruturas de dados utilizadas na aplicação.

---

### 📋 **Interface PokemonResumo**

A interface `PokemonResumo` foi criada para representar uma **versão simplificada e otimizada** dos dados do Pokémon, contendo apenas as informações essenciais necessárias para exibição no catálogo:

```typescript
interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
  stats: { [key: string]: number };
  sprite: string;
}
```

**Objetivo:**
- Reduzir o tamanho dos dados armazenados no JSON.
- Facilitar a serialização e deserialização.
- Padronizar os dados antes de persistência.
- Melhorar a performance ao listar Pokémon do PC Box.

---

### 🌐 **Fetch e async/await - Consulta à PokeAPI**

A aplicação utiliza a **Fetch API** nativa do Node.js para fazer requisições HTTP assíncronas à PokeAPI. O padrão **async/await** garante execução não-bloqueante:

```typescript
async buscarPokemonDaAPI(id: number): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
  if (!response.ok) {
    throw new PokemonNaoEncontradoError(`Pokémon com ID ${id} não existe`);
  }
  
  const dados = await response.json();
  return this.transformarDados(dados);
}
```

**Como funciona:**
1. `await fetch()` faz requisição HTTP.
2. `await response.json()` converte resposta para objeto JavaScript.
3. A função é declarada `async` para usar `await`.
4. Retorna uma `Promise<Pokemon>` com tipagem explícita.

---

### ⚠️ **Tratamento de Erros Personalizados**

O projeto implementa **exceções customizadas** em `CustomErrors.ts` para tratamento específico de erros:

```typescript
class PokemonNaoEncontradoError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "PokemonNaoEncontradoError";
  }
}

class ErroBuscaAPIError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ErroBuscaAPIError";
  }
}
```

**Exemplos de uso:**
- **Pokémon inexistente**: Lança `PokemonNaoEncontradoError` quando ID não existe na API.
- **Erro de rede**: Lança `ErroBuscaAPIError` em casos de falha de conexão.
- **ID inválido**: Validação de tipo `number` com mensagem específica.

```typescript
try {
  const pokemon = await pokeApiService.buscarPokemon(999999);
} catch (erro) {
  if (erro instanceof PokemonNaoEncontradoError) {
    console.log("Pokémon não encontrado na API");
  } else if (erro instanceof ErroBuscaAPIError) {
    console.log("Erro ao conectar com a API");
  }
}
```

---

### 🔄 **Métodos de Array Utilizados**

O projeto utiliza diversos **métodos de array** para manipulação eficiente de dados:

#### **map()** - Transformação de dados
Converte array de Pokémon da API para formato `PokemonResumo`:
```typescript
const pokemonsResumo = pokemonsCompletos.map(pokemon => ({
  id: pokemon.id,
  nome: pokemon.name,
  tipos: pokemon.types.map(t => t.type.name),
  altura: pokemon.height,
  peso: pokemon.weight,
  sprite: pokemon.sprites.front_default
}));
```

#### **filter()** - Filtragem de dados
Filtra Pokémon por tipo específico:
```typescript
const pokemonsDeTipo = catalogo.filter(p => p.tipos.includes("elétrico"));
```

#### **find()** - Busca de elemento único
Localiza um Pokémon específico por ID:
```typescript
const pokemon = catalogo.find(p => p.id === idProcurado);
```

#### **some()** - Verificação de existência
Verifica se um Pokémon já existe no catálogo (para evitar duplicatas):
```typescript
const jaExiste = catalogo.some(p => p.id === novoId);
```

#### **every()** - Validação de todos os elementos
Verifica se todos os Pokémon têm sprite válido:
```typescript
const todosComSprite = catalogo.every(p => p.sprite !== null);
```

#### **reduce()** - Agregação de dados
Calcula estatísticas gerais do catálogo:
```typescript
const pesoTotal = catalogo.reduce((total, p) => total + p.peso, 0);
const alturaMedia = catalogo.reduce((soma, p) => soma + p.altura, 0) / catalogo.length;
```

#### **forEach()** - Iteração
Exibe cada Pokémon do catálogo:
```typescript
catalogo.forEach(pokemon => {
  console.log(`${pokemon.id} - ${pokemon.nome}`);
});
```

---

### 🗂️ **Classe CatalogoPokemon**

A classe `CatalogoPokemon` (implementada em `BoxService.ts`) gerencia o **catálogo local** de Pokémon com persistência em JSON:

#### **Atributos:**
- `catalogo: Pokemon[]` - Array em memória com os Pokémon salvos.
- `caminhoArquivo: string` - Caminho do arquivo `pc_box.json`.

#### **Métodos:**

| Método | Descrição | Retorno |
| :--- | :--- | :--- |
| `adicionarPokemon(pokemon: Pokemon)` | Adiciona Pokémon ao catálogo sem duplicatas. | `void` |
| `removerPokemon(id: number)` | Remove Pokémon por ID. | `boolean` |
| `obterPokemon(id: number)` | Busca Pokémon específico. | `Pokemon \| undefined` |
| `listarTodos()` | Retorna todos os Pokémon do catálogo. | `Pokemon[]` |
| `verificarDuplicata(id: number)` | Verifica se Pokémon já existe. | `boolean` |
| `salvarEmJSON()` | Persiste catálogo em arquivo JSON. | `void` |
| `carregarDoJSON()` | Carrega catálogo do arquivo JSON. | `void` |
| `obterEstatisticas()` | Calcula estatísticas do catálogo. | `Estatisticas` |

#### **Exemplo de uso:**
```typescript
const boxService = new CatalogoPokemon();

// Carregar dados existentes
await boxService.carregarDoJSON();

// Adicionar novo Pokémon
boxService.adicionarPokemon(pikachu);

// Listar todos
const todos = boxService.listarTodos();

// Persistir
await boxService.salvarEmJSON();
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais no curso SCTEC.
