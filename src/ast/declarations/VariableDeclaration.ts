import { IDeclaration } from './Declaration';
import { IVariableDeclarator } from './VariableDeclarator';

export interface IVariableDeclaration extends IDeclaration {
  type: 'VariableDeclaration'
  declarations: IVariableDeclarator[]
  kind: 'var' | 'let' | 'const'
}
