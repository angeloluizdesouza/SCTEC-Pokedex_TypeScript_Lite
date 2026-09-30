import { PokemonApiResponse, PokemonResumo } from '../models/Pokemon';
import { APIError } from '../models/CustomErrors';
import { formatTag } from '../utils/textFormatters';

/**
 * Camada de Integração Externa com a PokeAPI.
 * Utiliza fetch nativo do Node.js e async/await com tratamento por try/catch (RF04, RF05, RF06).
 */
export class PokeApiService {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  /**
   * Busca um Pokémon pelo nome ou ID na PokeAPI.
   * Retorna um objeto PokemonResumo ou null se não for encontrado/ocorrer erro.
   */
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    const termoBusca = nomeOuId.trim().toLowerCase();
    const url = `${this.baseUrl}/${termoBusca}`;

    try {
      const resposta = await fetch(url);

      if (!resposta.ok) {
        if (resposta.status === 404) {
          console.log(`${formatTag('ERRO')} Pokémon não encontrado: ${nomeOuId}`);
        } else {
          console.log(`${formatTag('ERRO')} Falha na consulta à PokeAPI (Status ${resposta.status}).`);
        }
        return null;
      }

      const dados = (await resposta.json()) as PokemonApiResponse;
      const pokemonMapeado = this.mapearRespostaParaResumo(dados);

      console.log(`${formatTag('OK')} Pokémon encontrado: ${pokemonMapeado.nome}`);
      console.log(`#${pokemonMapeado.id} - ${pokemonMapeado.nome} | Tipos: ${pokemonMapeado.tipos.join(', ')} | Altura: ${pokemonMapeado.altura} | Peso: ${pokemonMapeado.peso}`);

      return pokemonMapeado;
    } catch (erro) {
      if (erro instanceof APIError) {
        console.log(`${formatTag('ERRO')} Erro de API: ${erro.message}`);
      } else {
        console.log(`${formatTag('ERRO')} Não foi possível buscar o Pokémon. Erro de rede ou inesperado.`);
      }
      return null;
    }
  }

  /**
   * Mapeia os dados da API para o objeto simplificado PokemonResumo (RF06).
   * Utiliza o método de array map.
   */
  private mapearRespostaParaResumo(dados: PokemonApiResponse): PokemonResumo {
    // Uso do método de array map para extrair os nomes dos tipos (RF11)
    const tipos = dados.types.map((item) => item.type.name);

    // Mapeamento opcional de stats se disponíveis
    let stats;
    if (dados.stats && Array.isArray(dados.stats)) {
      const getStat = (name: string): number => {
        const found = dados.stats?.find((s) => s.stat.name === name);
        return found ? found.base_stat : 0;
      };
      stats = {
        hp: getStat('hp'),
        attack: getStat('attack'),
        defense: getStat('defense'),
      };
    }

    return {
      id: dados.id,
      nome: dados.name,
      tipos: tipos,
      altura: dados.height,
      peso: dados.weight,
      stats: stats,
    };
  }
}

/**
 * Função assíncrona avulsa exportada para atender diretamente a assinatura RF04:
 * async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null>
 */
export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  const service = new PokeApiService();
  return service.buscarPokemon(nomeOuId);
}
