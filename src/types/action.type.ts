import { EActionType } from '@/enums/action-type.enum';
import { EDirection } from '@/enums/direction.enum';
import { IPlayer } from './player.type';

export interface IAction {
  id: string;
  gameId: string;
  type: EActionType;
  direction: EDirection;
  playerId: string;
  player?: IPlayer;
}
