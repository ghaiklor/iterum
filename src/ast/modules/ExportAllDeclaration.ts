import { ILiteral } from "../literals/Literal";
import { IModuleDeclaration } from "./ModuleDeclaration";

export interface IExportAllDeclaration extends IModuleDeclaration {
  type: "ExportAllDeclaration";
  source: ILiteral;
}
