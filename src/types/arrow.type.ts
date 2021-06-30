import { EDirection } from '@/enums/direction.enum';
import { ITile } from './tile.type';

export interface IArrow {
  id: string;
  tile: ITile;
  direction: EDirection;
}
