import { ITraverseContext } from "../../traverser/Traverser";

export interface ICallable {
  call(args: any[], context: ITraverseContext): any;
}
