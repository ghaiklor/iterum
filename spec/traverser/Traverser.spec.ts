import { ILiteral } from '../../src/ast/literals/Literal';
import { ITraverseContext, Traverser } from '../../src/traverser/Traverser';

describe('Iterum::Traverser', () => {
  it('Should properly throw an error in runtime, if traverser is not found', () => {
    const traverser = new Traverser(new Map());
    const node = { type: 'Literal', value: 1, raw: '1', loc: null } as ILiteral;

    expect(() => traverser.traverse(node, {} as ITraverseContext))
      .toThrowError('No traverser is found for node Literal');
  });
});
