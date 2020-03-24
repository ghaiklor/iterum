import { IClass } from '../classes/Class';
import { IClassDeclaration } from '../classes/ClassDeclaration';
import { IFunctionDeclaration } from '../declarations/FunctionDeclaration';
import { IExpression } from '../expressions/Expression';
import { IFunction } from '../functions/Function';
import { IModuleDeclaration } from './ModuleDeclaration';

type ExportDefaultDeclaration = IAnonymousDefaultExportedFunctionDeclaration
| IFunctionDeclaration
| IAnonymousDefaultExportedClassDeclaration
| IClassDeclaration
| IExpression;

export interface IAnonymousDefaultExportedFunctionDeclaration extends IFunction {
  type: 'FunctionDeclaration'
  id: null
}

export interface IAnonymousDefaultExportedClassDeclaration extends IClass {
  type: 'ClassDeclaration'
  id: null
}

export interface IExportDefaultDeclaration extends IModuleDeclaration {
  type: 'ExportDefaultDeclaration'
  declaration: ExportDefaultDeclaration
}
