import { IPosition } from "./Position";

export interface ISourceLocation {
  source: string | null;
  start: IPosition;
  end: IPosition;
}
