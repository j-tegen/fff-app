import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export class GameQueries {
  static get getGame(): DocumentNode {
    return gql`
      query Game($id: String!) {
        game(id: $id) {
          id
          isPublic
          boardSize
          players {
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
          objectTiles {
            id
            tile {
              column
              row
            }
            type
            isAnimated
            isStatic
            isLethal
            isBlocking
          }
        }
      }
    `;
  }
}
