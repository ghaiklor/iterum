import { IIdentifier } from "../miscellaneous/Identifier";
import { INode } from "../node/Node";

export interface IModuleSpecifier extends INode {
  local: IIdentifier;
}
