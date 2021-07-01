import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export class GameSubscriptions {
  static get playerAdded(): DocumentNode {
    return gql`
      subscription PlayerAdded($gameId: String!) {
        playerAdded(gameId: $gameId) {
          id
          colour
          name
          isOwner
          tile {
            column
            row
          }
          direction
          isDead
        }
      }
    `;
  }
  static get playerUpdated(): DocumentNode {
    return gql`
      subscription PlayerUpdated($gameId: String!) {
        playerUpdated(gameId: $gameId) {
          id
          colour
          name
          isOwner
          tile {
            column
            row
          }
          direction
          isDead
        }
      }
    `;
  }

  static get arrowUpdated(): DocumentNode {
    return gql`
      subscription ArrowUpdated($gameId: String!) {
        arrowUpdated(gameId: $gameId) {
          tile {
            column
            row
          }
          id
          direction
        }
      }
    `;
  }

  static get actionsResolved(): DocumentNode {
    return gql`
      subscription ActionsResolved($gameId: String!) {
        actionsResolved(gameId: $gameId) {
          id
        }
      }
    `;
  }

  static get resolveActions(): DocumentNode {
    return gql`
      subscription ResolveActions($gameId: String!) {
        resolveActions(gameId: $gameId) {
          id
        }
      }
    `;
  }

  static get actionAdded(): DocumentNode {
    return gql`
      subscription ActionAdded($gameId: String!) {
        actionAdded(gameId: $gameId) {
          id
          playerId
          type
          direction
        }
      }
    `;
  }
}
