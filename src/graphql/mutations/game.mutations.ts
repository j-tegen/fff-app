import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class GameMutations {
  static get createGame(): DocumentNode {
    return gql`
      mutation CreateGame($isPublic: Boolean, $boardSize: Float) {
        createGame(payload: { isPublic: $isPublic, boardSize: $boardSize }) {
          id
        }
      }
    `;
  }
  static get resetGame(): DocumentNode {
    return gql`
      mutation ResetGame($gameId: String!, $playerId: String!) {
        resetGame(payload: { gameId: $gameId, playerId: $playerId })
      }
    `;
  }
}
