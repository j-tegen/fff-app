import { PlayerMutations } from '@/graphql/mutations/player.mutations';
import { IPlayer } from '@/types/player.type';
import { apolloClient } from '@/vue-apollo';

export class PlayerService {
  public static async addPlayer(gameId: string, name: string): Promise<IPlayer> {
    const { data } = await apolloClient.mutate({
      mutation: PlayerMutations.addPlayer,
      fetchPolicy: 'no-cache',
      variables: {
        gameId,
        name,
      },
    });
    return data.addPlayer;
  }
}
