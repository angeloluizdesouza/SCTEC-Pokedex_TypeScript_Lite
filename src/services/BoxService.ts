import * as fs from 'fs/promises';
import * as path from 'path';
import { PokemonResumo } from '../models/Pokemon';
import { LocalBoxError } from '../models/CustomErrors';
import { formatTag, formatPokemonInfo } from '../utils/textFormatters';

/**
 * Camada de Persistência Local e Gerenciamento do Catálogo (RF07, RF08, RF09, RF10, RF11, RF12).
 * Mantém o catálogo em memória e sincroniza com o arquivo pc_box.json usando fs/promises.
 */
export class BoxService {
  private pokemons: PokemonResumo[] = [];
  private readonly filePath: string;

  constructor(filePath: string = path.resolve(process.cwd(), 'pc_box.json')) {
    this.filePath = filePath;
  }

  /**
   * Carrega o catálogo do arquivo JSON local se existir.
   */
  async inicializar(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        this.pokemons = parsed;
      }
    } catch {
      this.pokemons = [];
      await this.salvarEmArquivo();
    }
  }

  /**
   * Adiciona um Pokémon ao catálogo, prevenindo duplicatas pelo ID (RF08, RF12).
   * Utiliza método de array 'some' (RF11).
   */
  adicionar(pokemon: PokemonResumo): boolean {
    // Uso do método de array some para verificar duplicidade pelo ID (RF11)
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(`${formatTag('AVISO')} ${pokemon.nome} já está no catálogo.`);
      return false;
    }

    this.pokemons.push(pokemon);
    console.log(`${formatTag('OK')} ${pokemon.nome} adicionado ao catálogo.`);
    this.salvarEmArquivoBackground();
    return true;
  }

  /**
   * Lista todos os Pokémon cadastrados no catálogo (RF09, RF12).
   * Utiliza método de array 'forEach' (RF11).
   */
  listar(): void {
    if (this.pokemons.length === 0) {
      console.log(`${formatTag('AVISO')} Catálogo vazio.`);
      return;
    }

    console.log('Catálogo atual:');
    // Uso do método de array forEach para listar os itens (RF11)
    this.pokemons.forEach((pokemon) => {
      console.log(formatPokemonInfo(pokemon));
    });
  }

  /**
   * Remove um Pokémon do catálogo pelo ID (RF10, RF12).
   * Utiliza métodos de array 'some' e 'filter' (RF11).
   */
  remover(id: number): boolean {
    // Uso do método de array some para verificar existência (RF11)
    const existe = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log(`${formatTag('AVISO')} Nenhum Pokémon encontrado com esse ID.`);
      return false;
    }

    // Uso do método de array filter para remover o Pokémon (RF11)
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log(`${formatTag('OK')} Pokémon removido do catálogo.`);
    this.salvarEmArquivoBackground();
    return true;
  }

  /**
   * Retorna uma cópia dos Pokémon em memória.
   */
  getCatalogo(): PokemonResumo[] {
    return [...this.pokemons];
  }

  /**
   * Exemplo de cálculo usando método de array 'reduce' (RF11).
   */
  calcularPesoTotal(): number {
    return this.pokemons.reduce((acc, pokemon) => acc + pokemon.peso, 0);
  }

  /**
   * Exemplo de validação usando método de array 'every' (RF11).
   */
  validarTodosComNome(): boolean {
    return this.pokemons.every((p) => typeof p.nome === 'string' && p.nome.length > 0);
  }

  /**
   * Salva o catálogo atual no arquivo pc_box.json de forma assíncrona.
   */
  private async salvarEmArquivo(): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.pokemons, null, 2), 'utf-8');
    } catch (err) {
      throw new LocalBoxError(`Falha ao salvar dados no arquivo pc_box.json: ${err}`);
    }
  }

  private salvarEmArquivoBackground(): void {
    this.salvarEmArquivo().catch((err) => {
      console.error(`[ERRO] ${err.message}`);
    });
  }
}

/**
 * Funções avulsas exportadas conforme RF07, RF08, RF09, RF10 para compatibilidade procedural:
 */
export function adicionarAoCatalogo(catalogo: PokemonResumo[], pokemon: PokemonResumo): PokemonResumo[] {
  const jaExiste = catalogo.some((item) => item.id === pokemon.id);
  if (jaExiste) {
    console.log(`${formatTag('AVISO')} ${pokemon.nome} já está no catálogo.`);
    return catalogo;
  }
  console.log(`${formatTag('OK')} ${pokemon.nome} adicionado ao catálogo.`);
  return [...catalogo, pokemon];
}

export function listarCatalogo(catalogo: PokemonResumo[]): void {
  if (catalogo.length === 0) {
    console.log(`${formatTag('AVISO')} Catálogo vazio.`);
    return;
  }
  console.log('Catálogo atual:');
  catalogo.forEach((pokemon) => {
    console.log(formatPokemonInfo(pokemon));
  });
}

export function removerDoCatalogo(catalogo: PokemonResumo[], id: number): PokemonResumo[] {
  const existe = catalogo.some((pokemon) => pokemon.id === id);
  if (!existe) {
    console.log(`${formatTag('AVISO')} Nenhum Pokémon encontrado com esse ID.`);
    return catalogo;
  }
  console.log(`${formatTag('OK')} Pokémon removido do catálogo.`);
  return catalogo.filter((pokemon) => pokemon.id !== id);
}

// Aliases para atender ao nome da classe sugerida em RF12 (CatalogoPokemon)
export const CatalogoPokemon = BoxService;
export type CatalogoPokemon = BoxService;
