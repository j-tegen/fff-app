import { Module } from 'vuex';
import { actions } from './game.actions';
import { mutations } from './game.mutations';
import { IRootState } from '..';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { IObjectTile } from '@/types/object-tile.type';
import { IArrow } from '@/types/arrow.type';

export const namespace = 'game';

export interface IGameState {
  game?: IGame;
  players: IPlayer[];
  me?: IPlayer;
  objectTiles: IObjectTile[];
  arrows: IArrow[];
  isResolving: boolean;
}

export const state: IGameState = {
  game: undefined,
  players: [],
  me: undefined,
  objectTiles: [],
  arrows: [],
  isResolving: false,
};

const namespaced: boolean = true;

export const game: Module<IGameState, IRootState> = {
  actions,
  namespaced,
  mutations,
  state,
};
