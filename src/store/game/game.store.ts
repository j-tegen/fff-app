import { Module } from 'vuex';
import { actions } from './game.actions';
import { mutations } from './game.mutations';
import { IRootState } from '..';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { IObjectTile } from '@/types/object-tile.type';
import { IArrow } from '@/types/arrow.type';
import { EErrorCode } from '@/enums/error-code.enum';
import { IAction } from '@/types/action.type';

export const namespace = 'game';

export interface IGameState {
  game?: IGame;
  players: IPlayer[];
  me?: IPlayer;
  objectTiles: IObjectTile[];
  arrows: IArrow[];
  isResolving: boolean;
  isSpectating: boolean;
  errorCode?: EErrorCode;
  actions: IAction[];
}

export const state: IGameState = {
  game: undefined,
  players: [],
  me: undefined,
  objectTiles: [],
  arrows: [],
  isResolving: false,
  isSpectating: false,
  errorCode: undefined,
  actions: [],
};

const namespaced: boolean = true;

export const game: Module<IGameState, IRootState> = {
  actions,
  namespaced,
  mutations,
  state,
};
