import { IIdentifier } from "../miscellaneous/Identifier";
import { IModuleSpecifier } from "./ModuleSpecifier";

export interface IImportSpecifier extends IModuleSpecifier {
  type: "ImportSpecifier";
  imported: IIdentifier;
}
