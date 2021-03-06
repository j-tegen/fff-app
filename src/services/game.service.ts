import { EActionType } from '@/enums/action-type.enum';
import { EDirection } from '@/enums/direction.enum';
import { ActionMutations } from '@/graphql/mutations/action.mutations';
import { GameMutations } from '@/graphql/mutations/game.mutations';
import { RoundMutations } from '@/graphql/mutations/round.mutations';
import { GameQueries } from '@/graphql/queries/game.queries';
import { IGameRound } from '@/types/game-round.type';
import { IGame } from '@/types/game.type';
import { apolloClient } from '@/vue-apollo';

export class GameService {
  public static async createGame(isPublic: boolean = true, boardSize: number = 12): Promise<IGame> {
    const { data } = await apolloClient.mutate({
      mutation: GameMutations.createGame,
      fetchPolicy: 'no-cache',
      variables: {
        isPublic,
        boardSize,
      },
    });
    return data.createGame;
  }

  public static async resetGame(gameId: string, playerId: string): Promise<void> {
    await apolloClient.mutate({
      mutation: GameMutations.resetGame,
      fetchPolicy: 'no-cache',
      variables: {
        gameId,
        playerId,
      },
    });
  }

  public static async getGame(id: string): Promise<IGame> {
    const { data } = await apolloClient.query({
      query: GameQueries.getGame,
      fetchPolicy: 'no-cache',
      variables: {
        id,
      },
    });
    return data.game;
  }

  public static async move(gameId: string, playerId: string, direction: EDirection): Promise<void> {
    try {
      await apolloClient.mutate({
        mutation: ActionMutations.move,
        variables: {
          gameId,
          playerId,
          direction,
          type: EActionType.MOVE,
        },
      });
    } catch {
      //
    }
  }

  public static async shoot(gameId: string, playerId: string): Promise<void> {
    try {
      await apolloClient.mutate({
        mutation: ActionMutations.move,
        variables: {
          gameId,
          playerId,
          type: EActionType.SHOOT,
        },
      });
    } catch {
      //
    }
  }
  public static async startRound(
    gameId: string,
    playerId: string
  ): Promise<IGameRound | undefined> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: RoundMutations.startRound,
        variables: {
          gameId,
          playerId,
        },
      });
      return data.startRound;
    } catch {
      return;
    }
  }
}
