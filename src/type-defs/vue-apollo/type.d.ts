import 'vue-apollo';

declare module 'vue-apollo/types/options' {
  interface VueApolloSubscriptionDefinition<Variables = OperationVariables>
    extends Omit<SubscriptionOptions<Variables>, 'variables'> {
    variables?: QueryVariables<Variables>;
    result?: (result: ApolloQueryResult<Result>, key: string) => void;
    client?: string;
  }
}
