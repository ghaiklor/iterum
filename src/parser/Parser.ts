import { Literal } from "../ast/Literal";
import { Node } from "../ast/Node";
import { Program } from "../ast/Program";
import { Lexer } from "../lexer/Lexer";
import { Token } from "../token/Token";
import { TokenType } from "../token/TokenType";

export class Parser {
  private lexer: Lexer;
  private currentToken: Token;

  constructor(source: string) {
    this.lexer = new Lexer(source);
    this.currentToken = this.lexer.next();
  }

  public parse(): Program {
    return new Program([this.expression()]);
  }

  private eat(tokenToEat: TokenType): Parser {
    if (this.currentToken.is(tokenToEat)) {
      this.currentToken = this.lexer.next();
    } else {
      throw new Error(`Expected ${tokenToEat} at ${this.currentToken.location}, but got ${this.currentToken.code}`);
    }

    return this;
  }

  private expression(): Node {
    const token = this.currentToken;

    if (token.is(TokenType.NUMBER_LITERAL)) {
      this.eat(TokenType.NUMBER_LITERAL);
      return new Literal(parseFloat(token.code), token.code);
    } else if (token.is(TokenType.LEFT_PARENTHESIS)) {
      this.eat(TokenType.LEFT_PARENTHESIS);
      const expression = this.expression();
      this.eat(TokenType.RIGHT_PARENTHESIS);

      return expression;
    }

    throw new Error(`Unrecognized token at ${this.currentToken.location}`);
  }
}
