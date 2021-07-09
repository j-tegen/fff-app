import { IPlayer } from './player.type';

export interface IGameRound {
  id: string;
  roundOver: boolean;
  winner?: IPlayer;
}
