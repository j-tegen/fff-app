import { playerSprites } from '@/constants/sprites.constants';
import { EDirection } from '@/enums/direction.enum';
import { EPlayerColour } from '@/enums/player-colour.enum';
import { IPlayer } from '@/types/player.type';
import { RenderEngine } from './render.engine';

export class PlayerEngine {
  static render(
    ctx: CanvasRenderingContext2D,
    { colour, tile, direction, isDead }: IPlayer,
    frameIndex: number = 0
  ): void {
    const sprite: string = this.getSprite(colour, isDead, direction, frameIndex);
    RenderEngine.drawTile(ctx, tile, sprite);
  }

  static getSprite(
    colour: EPlayerColour,
    isDead: boolean,
    direction: EDirection,
    frameIndex: number
  ): string {
    if (isDead) {
      return playerSprites['dead'];
    }
    const spriteDirection: EDirection = [EDirection.RIGHT, EDirection.DOWN].includes(direction)
      ? EDirection.RIGHT
      : EDirection.LEFT;

    return playerSprites[colour][spriteDirection][`f${frameIndex}`];
  }
}
