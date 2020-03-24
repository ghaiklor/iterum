import { IModuleSpecifier } from './ModuleSpecifier';

export interface IImportNamespaceSpecifier extends IModuleSpecifier {
  type: 'ImportNamespaceSpecifier'
}
