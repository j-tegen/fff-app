import { IGameRound } from './game-round.type';
import { IObjectTile } from './object-tile.type';
import { IPlayer } from './player.type';

export interface IGame {
  id: string;
  isPublic: boolean;
  boardSize: number;
  players: IPlayer[];
  objectTiles: IObjectTile[];
  activeRound?: IGameRound;
}
