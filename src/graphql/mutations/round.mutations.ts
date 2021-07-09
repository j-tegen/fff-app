import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class RoundMutations {
  static get startRound(): DocumentNode {
    return gql`
      mutation StartRound($gameId: String!, $playerId: String!) {
        startRound(payload: { gameId: $gameId, playerId: $playerId }) {
          id
        }
      }
    `;
  }
}
