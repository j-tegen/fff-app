import { IGame } from '@/types/game.type';
import { RenderEngine } from './render.engine';

export class BoardEngine {
  static emptyTile: string = require(`../assets/sprites/environment/floor_1.png`);

  static drawBoard(ctx: CanvasRenderingContext2D, { boardSize }: IGame): void {
    for (let row = 0; row < boardSize; row++) {
      for (let column = 0; column < boardSize; column++) {
        RenderEngine.drawTile(ctx, { column, row }, this.emptyTile);
      }
    }
  }
}
