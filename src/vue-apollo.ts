import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';

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
  link,
  cache: new InMemoryCache(),
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
