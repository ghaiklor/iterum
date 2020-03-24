import { IForInStatement } from './ForInStatement';

export interface IForOfStatement extends Pick<IForInStatement, Exclude<keyof IForInStatement, 'type'>> {
  type: 'ForOfStatement'
  await: boolean
}
