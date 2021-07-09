import { ActionTree } from 'vuex';
import { IGameState } from './game.store';
import { IRootState } from '..';
import { GameActions, GameMutations } from './game.store.enums';
import { IGame } from '@/types/game.type';
import { GameService } from '@/services/game.service';
import router from '@/router';
import { IPlayer } from '@/types/player.type';
import { PlayerService } from '@/services/player.service';
import { IArrow } from '@/types/arrow.type';
import { EDirection } from '@/enums/direction.enum';
import { ActionService } from '@/services/action.service';
import { EErrorCode } from '@/enums/error-code.enum';
import { IAction } from '@/types/action.type';
import { IGameRound } from '@/types/game-round.type';

export const actions: ActionTree<IGameState, IRootState> = {
  [GameActions.RESET]({ commit }) {
    commit(GameMutations.SET_GAME, undefined);
    commit(GameMutations.SET_ME, undefined);
    commit(GameMutations.SET_PLAYERS, []);
    commit(GameMutations.SET_IS_SPECTATING, false);
    commit(GameMutations.SET_ACTIONS, []);
  },
  async [GameActions.CREATE_GAME](
    _,
    { isPublic, boardSize }: { isPublic: boolean; boardSize: number }
  ) {
    const game: IGame = await GameService.createGame(isPublic, boardSize);
    router.push(`/game/${game.id}`);
  },
  async [GameActions.LOAD_GAME]({ commit }, id: string) {
    const { players, objectTiles, activeRound, ...game }: IGame = await GameService.getGame(id);
    commit(GameMutations.SET_GAME, game);
    commit(GameMutations.SET_PLAYERS, players);
    commit(GameMutations.SET_OBJECT_TILES, objectTiles);
    commit(GameMutations.SET_ACTIVE_ROUND, activeRound);
  },
  async [GameActions.ADD_PLAYER](
    { commit, state },
    { gameId, name }: { gameId: string; name: string }
  ) {
    const player: IPlayer = await PlayerService.addPlayer(gameId, name);
    commit(GameMutations.SET_PLAYERS, [...state.players, player]);
    router.push(`/game/${gameId}?player=${player.id}`);
    router.go(1);
  },
  [GameActions.SET_ME]({ commit, state }, playerId: string) {
    const player: IPlayer | undefined = state.players.find(
      (player: IPlayer) => player.id === playerId
    );
    commit(GameMutations.SET_ME, player);
  },
  [GameActions.UPDATE_PLAYER]({ commit, state }, updatedPlayer: IPlayer) {
    const players: IPlayer[] = state.players.map((player: IPlayer) => {
      if (player.id === updatedPlayer.id) {
        return updatedPlayer;
      }
      return player;
    });
    commit(GameMutations.SET_PLAYERS, players);
  },
  [GameActions.UPDATE_ARROWS]({ commit, state }, updatedArrow: IArrow) {
    const arrows: IArrow[] = state.arrows.map((arrow: IArrow) => {
      if (arrow.id === updatedArrow.id) {
        return updatedArrow;
      }
      return arrow;
    });
    if (!arrows.find((arrow: IArrow) => arrow.id === updatedArrow.id)) {
      arrows.push(updatedArrow);
    }
    commit(GameMutations.SET_ARROWS, arrows);
  },
  [GameActions.MOVE](
    _,
    { gameId, playerId, direction }: { gameId: string; playerId: string; direction: EDirection }
  ) {
    GameService.move(gameId, playerId, direction);
  },
  [GameActions.SHOOT](_, { gameId, playerId }: { gameId: string; playerId: string }) {
    GameService.shoot(gameId, playerId);
  },
  [GameActions.START_RESOLVING_ACTIONS]({ commit, state }) {
    if (state.me?.isOwner) {
      ActionService.resolveActions(state.game!.id);
    }
    commit(GameMutations.SET_RESOLVING, true);
  },
  [GameActions.END_RESOLVING_ACTIONS]({ commit, state, dispatch }) {
    commit(GameMutations.SET_RESOLVING, false);
    commit(GameMutations.SET_ACTIONS, []);
    if (!state.activeRound?.winner) {
      dispatch(GameActions.SET_MESSAGE, 'Round ended, continue playing!');
    }
  },
  [GameActions.SPECTATE]({ commit }) {
    commit(GameMutations.SET_IS_SPECTATING, true);
  },
  [GameActions.SET_ERROR]({ commit }, errorCode?: EErrorCode) {
    commit(GameMutations.SET_ERROR, errorCode);
  },
  [GameActions.ADD_ACTION]({ state, commit }, action: IAction) {
    const player: IPlayer | undefined = state.players.find(
      (player: IPlayer) => player.id === action.playerId
    );
    const actions: IAction[] = [
      ...state.actions,
      {
        ...action,
        player,
      },
    ];
    commit(GameMutations.SET_ACTIONS, actions);
  },
  [GameActions.RESET_ACTIONS]({ commit }) {
    commit(GameMutations.SET_ACTIONS, []);
  },
  [GameActions.SET_MESSAGE]({ commit }, message?: string) {
    commit(GameMutations.SET_MESSAGE, message);
  },
  async [GameActions.START_ROUND]({ commit, state }, playerId: string) {
    if (state.activeRound) {
      await GameService.resetGame(state.game!.id, playerId);
    }
    const round: IGameRound | undefined = await GameService.startRound(state.game!.id, playerId);
    commit(GameMutations.SET_ACTIVE_ROUND, round);
  },
  [GameActions.SET_WINNER]({ commit, state }, winner?: IPlayer) {
    if (state.activeRound) {
      const activeRound: IGameRound | undefined = { ...state.activeRound, roundOver: true, winner };
      commit(GameMutations.SET_ACTIVE_ROUND, activeRound);
    }
  },
};
