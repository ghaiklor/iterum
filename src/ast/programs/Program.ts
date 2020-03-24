import { IModuleDeclaration } from '../modules/ModuleDeclaration';
import { INode } from '../node/Node';
import { IDirective } from '../statements/Directive';
import { IStatement } from '../statements/Statement';

export interface IProgram extends INode {
  type: 'Program'
  body: Array<IDirective | IStatement | IModuleDeclaration>
  sourceType: 'script' | 'module'
}
