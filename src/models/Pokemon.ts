/**
 * Interfaces e tipos para os dados de Pokémon.
 */

// Interface para a resposta bruta da PokeAPI (RF03 + Stats)
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats?: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

// Interface para estatísticas simplificadas de batalha
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
}

// Interface para o Pokémon resumido/simplificado (RF02)
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
  stats?: PokemonStats;
}
