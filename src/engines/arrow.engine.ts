import { arrowSprites } from '@/constants/sprites.constants';
import { EDirection } from '@/enums/direction.enum';
import { IArrow } from '@/types/arrow.type';
import { RenderEngine } from './render.engine';

export class ArrowEngine {
  static render(ctx: CanvasRenderingContext2D, { direction, tile }: IArrow): void {
    const sprite: string = this.getSprite(direction);
    RenderEngine.drawTile(ctx, tile, sprite);
  }

  static getSprite(direction: EDirection): string {
    return arrowSprites[direction];
  }
}
