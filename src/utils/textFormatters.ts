import { PokemonResumo } from '../models/Pokemon';

/**
 * Funções utilitárias puras para formatação de texto e exibição no terminal.
 */

export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function formatPokemonInfo(pokemon: PokemonResumo): string {
  const tiposStr = pokemon.tipos.join(', ');
  let baseInfo = `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tiposStr} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`;
  if (pokemon.stats) {
    baseInfo += ` | HP: ${pokemon.stats.hp} ATK: ${pokemon.stats.attack} DEF: ${pokemon.stats.defense}`;
  }
  return baseInfo;
}

export function formatTag(tag: 'OK' | 'AVISO' | 'ERRO'): string {
  return `[${tag}]`;
}
