import { MutationTree } from 'vuex';
import { IGameState, state } from './game.store';
import { GameMutations } from './game.store.enums';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { IObjectTile } from '@/types/object-tile.type';
import { IArrow } from '@/types/arrow.type';

export const mutations: MutationTree<IGameState> = {
  [GameMutations.SET_GAME](state: IGameState, game: IGame) {
    state.game = game;
  },
  [GameMutations.SET_PLAYERS](state: IGameState, players: IPlayer[]) {
    state.players = players;
  },
  [GameMutations.SET_OBJECT_TILES](state: IGameState, tiles: IObjectTile[]) {
    state.objectTiles = tiles;
  },
  [GameMutations.SET_ME](state: IGameState, player: IPlayer) {
    state.me = player;
  },
  [GameMutations.SET_ARROWS](state: IGameState, arrows: IArrow[]) {
    state.arrows = arrows;
  },
  [GameMutations.SET_RESOLVING](state: IGameState, isResolving: boolean) {
    state.isResolving = isResolving;
  },
};
