import { TokenType } from '../token/TokenType';

export const PUNCTUATION = new Map<string, TokenType>([
  ['!', TokenType.LOGICAL_NOT],
  ['!=', TokenType.NOT_EQUAL],
  ['!==', TokenType.NOT_STRICT_EQUAL],
  ['%', TokenType.MODULUS],
  ['%=', TokenType.MODULUS_ASSIGN],
  ['&', TokenType.BITWISE_AND],
  ['&&', TokenType.LOGICAL_AND],
  ['&=', TokenType.BITWISE_AND_ASSIGN],
  ['(', TokenType.LEFT_PARENTHESIS],
  [')', TokenType.RIGHT_PARENTHESIS],
  ['*', TokenType.MULTIPLY],
  ['**', TokenType.EXPONENTIATION],
  ['**=', TokenType.EXPONENTIATION_ASSIGN],
  ['*=', TokenType.MULTIPLY_ASSIGN],
  ['+', TokenType.PLUS],
  ['++', TokenType.PLUS_PLUS],
  ['+=', TokenType.PLUS_ASSIGN],
  [',', TokenType.COMMA],
  ['-', TokenType.MINUS],
  ['--', TokenType.MINUS_MINUS],
  ['-=', TokenType.MINUS_ASSIGN],
  ['.', TokenType.DOT],
  ['...', TokenType.ELLIPSIS],
  ['/', TokenType.DIVIDE],
  ['/=', TokenType.DIVIDE_ASSIGN],
  [':', TokenType.COLON],
  [';', TokenType.SEMICOLON],
  ['<', TokenType.LESS_THAN],
  ['<<', TokenType.BITWISE_SHIFT_TO_LEFT],
  ['<<=', TokenType.BITWISE_SHIFT_TO_LEFT_ASSIGN],
  ['<=', TokenType.LESS_THAN_OR_EQUAL],
  ['=', TokenType.ASSIGN],
  ['==', TokenType.EQUAL],
  ['===', TokenType.STRICT_EQUAL],
  ['=>', TokenType.ARROW],
  ['>', TokenType.GREATER_THAN],
  ['>=', TokenType.GREATER_THAN_OR_EQUAL],
  ['>>', TokenType.BITWISE_SHIFT_TO_RIGHT],
  ['>>=', TokenType.BITWISE_SHIFT_TO_RIGHT_ASSIGN],
  ['>>>', TokenType.BITWISE_LOGICAL_SHIFT_TO_RIGHT],
  ['>>>=', TokenType.BITWISE_LOGICAL_SHIFT_TO_RIGHT_ASSIGN],
  ['?', TokenType.QUESTION_MARK],
  ['[', TokenType.LEFT_SQUARE_BRACKETS],
  [']', TokenType.RIGHT_SQUARE_BRACKETS],
  ['^', TokenType.BITWISE_XOR],
  ['^=', TokenType.BITWISE_XOR_ASSIGN],
  ['{', TokenType.LEFT_CURLY_BRACES],
  ['|', TokenType.BITWISE_OR],
  ['|=', TokenType.BITWISE_OR_ASSIGN],
  ['||', TokenType.LOGICAL_OR],
  ['}', TokenType.RIGHT_CURLY_BRACES],
  ['~', TokenType.BITWISE_NOT]
]);
