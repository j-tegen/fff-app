import { EDirection } from '@/enums/direction.enum';
import { EPlayerColour } from '@/enums/player-colour.enum';
import { ITile } from './tile.type';

export interface IPlayer {
  id: string;
  colour: EPlayerColour;
  isOwner: boolean;
  name: string;
  tile: ITile;
  direction: EDirection;
  isDead: boolean;
}
