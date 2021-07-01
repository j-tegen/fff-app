import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { split, ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { EErrorCode } from './enums/error-code.enum';
import store from '@/store';
import { GameActions } from './store/game/game.store.enums';
import { ErrorHelper } from './utils/error-helper.util';

const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:8090/graphql';

const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:8090/graphql',
  options: {
    reconnect: true,
    lazy: true,
  },
});

const httpLink = createHttpLink({
  uri: httpEndpoint,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      const errorCode: EErrorCode = ErrorHelper.parseErrorCode(message);
      store.dispatch(`game/${GameActions.SET_ERROR}`, errorCode);
    });
  }
  if (networkError) {
    store.dispatch(`game/${GameActions.SET_ERROR}`, EErrorCode.NETWORK_ERROR);
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache: new InMemoryCache(),
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
