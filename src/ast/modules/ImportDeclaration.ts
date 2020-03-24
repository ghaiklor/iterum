import { ILiteral } from '../literals/Literal';
import { IImportDefaultSpecifier } from './ImportDefaultSpecifier';
import { IImportNamespaceSpecifier } from './ImportNamespaceSpecifier';
import { IImportSpecifier } from './ImportSpecifier';
import { IModuleDeclaration } from './ModuleDeclaration';

export interface IImportDeclaration extends IModuleDeclaration {
  type: 'ImportDeclaration'
  specifiers: Array<IImportSpecifier | IImportDefaultSpecifier | IImportNamespaceSpecifier>
  source: ILiteral
}
