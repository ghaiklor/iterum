import { ILiteral } from '../../ast/literals/Literal';
import { INode } from '../../ast/node/Node';
import { RuntimeError } from '../../errors/RuntimeError';
import { BooleanValue } from '../../runtime/primitives/BooleanValue';
import { NumberValue } from '../../runtime/primitives/NumberValue';
import { StringValue } from '../../runtime/primitives/StringValue';
import { Value } from '../../runtime/Value';

export function Literal (n: INode): Value | never {
  const node = n as ILiteral;

  switch (typeof node.value) {
    case 'string':
      return new StringValue(node.value);
    case 'boolean':
      return new BooleanValue(node.value);
    case 'number':
      return new NumberValue(node.value);
    default:
      throw new RuntimeError(RuntimeError.UNKNOWN_LITERAL_TYPE, typeof node.value);
  }
}
