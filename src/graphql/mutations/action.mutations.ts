import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class ActionMutations {
  static get move(): DocumentNode {
    return gql`
      mutation Move(
        $gameId: String!
        $playerId: String!
        $type: ActionType!
        $direction: Direction
      ) {
        addAction(
          payload: { gameId: $gameId, playerId: $playerId, type: $type, direction: $direction }
        ) {
          id
        }
      }
    `;
  }
}
