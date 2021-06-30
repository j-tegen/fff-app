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

export const actions: ActionTree<IGameState, IRootState> = {
  [GameActions.RESET]({ commit }) {
    commit(GameMutations.SET_GAME, undefined);
    commit(GameMutations.SET_ME, undefined);
    commit(GameMutations.SET_PLAYERS, []);
  },
  async [GameActions.CREATE_GAME]() {
    const game: IGame = await GameService.createGame();
    router.push(`/game/${game.id}`);
  },
  async [GameActions.LOAD_GAME]({ commit }, id: string) {
    const { players, objectTiles, ...game }: IGame = await GameService.getGame(id);
    commit(GameMutations.SET_GAME, game);
    commit(GameMutations.SET_PLAYERS, players);
    commit(GameMutations.SET_OBJECT_TILES, objectTiles);
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
};
