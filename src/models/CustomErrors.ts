/**
 * Classes de exceções customizadas estendendo a classe nativa Error.
 * Permite tratamento refinado de erros da API e do armazenamento local.
 */

export class APIError extends Error {
  public readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export class LocalBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocalBoxError';
    Object.setPrototypeOf(this, LocalBoxError.prototype);
  }
}
