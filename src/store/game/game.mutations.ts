import { MutationTree } from 'vuex';
import { IGameState, state } from './game.store';
import { GameMutations } from './game.store.enums';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { IObjectTile } from '@/types/object-tile.type';
import { IArrow } from '@/types/arrow.type';
import { EErrorCode } from '@/enums/error-code.enum';
import { IAction } from '@/types/action.type';
import { IGameRound } from '@/types/game-round.type';

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
  [GameMutations.SET_IS_SPECTATING](state: IGameState, isSpectating: boolean) {
    state.isSpectating = isSpectating;
  },
  [GameMutations.SET_ERROR](state: IGameState, errorCode?: EErrorCode) {
    state.errorCode = errorCode;
  },
  [GameMutations.SET_ACTIONS](state: IGameState, actions: IAction[]) {
    state.actions = actions;
  },
  [GameMutations.SET_MESSAGE](state: IGameState, message?: string) {
    state.message = message;
  },
  [GameMutations.SET_ACTIVE_ROUND](state: IGameState, round?: IGameRound) {
    state.activeRound = round;
  },
  [GameMutations.SET_WINNER](state: IGameState, winner?: IPlayer) {
    state.activeRound!.winner = winner;
  },
};
