import { PokeApiService } from '../services/PokeApiService';
import { BoxService } from '../services/BoxService';

/**
 * Camada de Interface do Usuário / Controller.
 * Gerencia e orquestra as chamadas dos serviços de API e Catálogo.
 */
export class TerminalController {
  private pokeApiService: PokeApiService;
  private boxService: BoxService;

  constructor(pokeApiService?: PokeApiService, boxService?: BoxService) {
    this.pokeApiService = pokeApiService || new PokeApiService();
    this.boxService = boxService || new BoxService();
  }

  async inicializar(): Promise<void> {
    await this.boxService.inicializar();
  }

  async buscarEAdicionar(nomeOuId: string): Promise<void> {
    const pokemon = await this.pokeApiService.buscarPokemon(nomeOuId);
    if (pokemon !== null) {
      this.boxService.adicionar(pokemon);
    }
  }

  listarCatalogo(): void {
    this.boxService.listar();
  }

  removerDoCatalogo(id: number): void {
    this.boxService.remover(id);
  }
}
