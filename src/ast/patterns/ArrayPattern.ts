import { IPattern } from './Pattern';

export interface IArrayPattern extends IPattern {
  type: 'ArrayPattern'
  elements: Array<IPattern | null>
}
