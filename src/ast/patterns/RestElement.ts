import { IPattern } from './Pattern';

export interface IRestElement extends IPattern {
  type: 'RestElement'
  argument: IPattern
}
