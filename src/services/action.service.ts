import { ActionMutations } from '@/graphql/mutations/action.mutations';
import { apolloClient } from '@/vue-apollo';

export class ActionService {
  public static async resolveActions(gameId: string): Promise<void> {
    await apolloClient.mutate({
      mutation: ActionMutations.resolveActions,
      fetchPolicy: 'no-cache',
      variables: {
        gameId,
      },
    });
  }
}
