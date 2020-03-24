import { IModuleSpecifier } from './ModuleSpecifier';

export interface IImportDefaultSpecifier extends IModuleSpecifier {
  type: 'ImportDefaultSpecifier'
}
