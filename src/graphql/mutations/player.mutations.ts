import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class PlayerMutations {
  static get addPlayer(): DocumentNode {
    return gql`
      mutation AddPlayer($gameId: String!, $name: String!) {
        addPlayer(payload: { gameId: $gameId, name: $name }) {
          id
          isOwner
          name
          colour
        }
      }
    `;
  }
}
