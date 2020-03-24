import { ISourceLocation } from './SourceLocation';

export interface INode {
  type: string
  loc: ISourceLocation | null
}
