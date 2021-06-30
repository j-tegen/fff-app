import { ObjectTileType } from '@/enums/object-tile-type.enums';
import { ITile } from './tile.type';

export interface IObjectTile {
  id: string;
  type: ObjectTileType;
  isAnimated: boolean;
  isLethal: boolean;
  isBlocking: boolean;
  isStatic: boolean;
  tile: ITile;
}
