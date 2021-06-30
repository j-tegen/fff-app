import { objectTileSprites } from '@/constants/sprites.constants';
import { ObjectTileType } from '@/enums/object-tile-type.enums';
import { IObjectTile } from '@/types/object-tile.type';
import { RenderEngine } from './render.engine';

export class ObjectTileEngine {
  static render(
    ctx: CanvasRenderingContext2D,
    { type, tile, isAnimated }: IObjectTile,
    frameIndex: number = 0
  ): void {
    const sprite: string = this.getSprite(type, isAnimated, frameIndex);
    RenderEngine.drawTile(ctx, tile, sprite);
  }

  static getSprite(type: ObjectTileType, isAnimated: boolean, frameIndex: number): string {
    const frame: string = isAnimated ? `f${frameIndex}` : 'f0';

    return objectTileSprites[type][frame];
  }
}
