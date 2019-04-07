import { IIdentifier } from "../miscellaneous/Identifier";
import { IModuleSpecifier } from "./ModuleSpecifier";

export interface IExportSpecifier extends IModuleSpecifier {
  type: "ExportSpecifier";
  exported: IIdentifier;
}
