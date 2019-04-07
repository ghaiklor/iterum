import { IDeclaration } from "../declarations/Declaration";
import { ILiteral } from "../literals/Literal";
import { IExportSpecifier } from "./ExportSpecifier";
import { IModuleDeclaration } from "./ModuleDeclaration";

export interface IExportNamedDeclaration extends IModuleDeclaration {
  type: "ExportNamedDeclaration";
  declaration: IDeclaration | null;
  specifiers: IExportSpecifier[];
  source: ILiteral | null;
}
