import { EActionType } from '@/enums/action-type.enum';
import { EDirection } from '@/enums/direction.enum';
import { ActionMutations } from '@/graphql/mutations/action.mutations';
import { GameMutations } from '@/graphql/mutations/game.mutations';
import { GameQueries } from '@/graphql/queries/game.queries';
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
    await apolloClient.mutate({
      mutation: ActionMutations.move,
      variables: {
        gameId,
        playerId,
        direction,
        type: EActionType.MOVE,
      },
    });
  }
}
