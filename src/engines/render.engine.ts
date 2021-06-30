import { TILE_SIZE } from '@/constants/board.constants';
import { ITile } from '@/types/tile.type';

export class RenderEngine {
  static drawTile(ctx: CanvasRenderingContext2D, tile: ITile, src: string): void {
    const image = new Image();
    image.onload = (): void => {
      const { x, y } = this.getTileCorner(tile);
      ctx.drawImage(image, x, y);
    };

    image.src = src;
  }

  static getTileCorner({ row, column }: ITile): { x: number; y: number } {
    return {
      x: column * TILE_SIZE,
      y: row * TILE_SIZE,
    };
  }
}
