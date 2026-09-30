import { CatalogoPokemon } from './services/BoxService';
import { buscarPokemon } from './services/PokeApiService';

/**
 * Ponto de entrada principal da aplicação (RF13).
 * Demonstra o fluxo completo do projeto Pokédex TypeScript Lite:
 * 1. Busca de Pokémon válidos e adição ao catálogo
 * 2. Prevenção de registros duplicados
 * 3. Tratamento de busca por Pokémon inexistente
 * 4. Listagem dos itens do catálogo
 * 5. Remoção por ID e re-listagem
 */
async function main() {
  const catalogo = new CatalogoPokemon();
  await catalogo.inicializar();

  // 1. Buscar pikachu e adicionar
  const pikachu = await buscarPokemon("pikachu");
  if (pikachu !== null) {
    catalogo.adicionar(pikachu);
  }

  // 2. Buscar charmander e adicionar
  const charmander = await buscarPokemon("charmander");
  if (charmander !== null) {
    catalogo.adicionar(charmander);
  }

  // 3. Tentar adicionar pikachu duplicado
  const pikachuDuplicado = await buscarPokemon("pikachu");
  if (pikachuDuplicado !== null) {
    catalogo.adicionar(pikachuDuplicado);
  }

  // 4. Testar busca por Pokémon inexistente
  await buscarPokemon("pokemon-inexistente");

  // 5. Listar catálogo
  catalogo.listar();

  // 6. Remover Pokémon pelo ID (ID 25 = pikachu)
  catalogo.remover(25);

  // 7. Listar catálogo atualizado
  catalogo.listar();
}

main();
