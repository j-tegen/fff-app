import { IArrow } from '@/types/arrow.type';
import { IGame } from '@/types/game.type';
import { IObjectTile } from '@/types/object-tile.type';
import { IPlayer } from '@/types/player.type';
import { ITile } from '@/types/tile.type';
import { BoardEngine } from './board.engine';
import { ObjectTileEngine } from './object-tile.engine';
import { PlayerEngine } from './player.engine';
import { RenderEngine } from './render.engine';

export class GameEngine {
  static setup(
    ctx: CanvasRenderingContext2D,
    game: IGame,
    players: IPlayer[],
    objectTiles: IObjectTile[]
  ): void {
    BoardEngine.drawBoard(ctx, game);
    objectTiles.forEach((objectTile: IObjectTile) => {
      ObjectTileEngine.render(ctx, objectTile);
    });
    this.animatePlayers(ctx, players, 0);
  }

  static renderLoop(
    ctx: CanvasRenderingContext2D,
    objectTiles: IObjectTile[],
    players: IPlayer[],
    frameIndex: number = 0
  ): void {
    this.animateObjectTiles(ctx, objectTiles, frameIndex);
    this.animatePlayers(ctx, players, frameIndex);
  }

  static clearTile(
    ctx: CanvasRenderingContext2D,
    sourceTile: ITile,
    objectTiles: IObjectTile[],
    allPlayers: IPlayer[],
    frameIndex: number,
    playerId?: string
  ): void {
    const objectTile: IObjectTile | undefined = objectTiles.find(
      ({ tile }: IObjectTile) => tile.row === sourceTile.row && tile.column === sourceTile.column
    );
    const deadPlayer: IPlayer | undefined = allPlayers.find(
      ({ id, tile }: IPlayer) =>
        id !== playerId && tile.row === sourceTile.row && tile.column === sourceTile.column
    );
    if (objectTile) {
      ObjectTileEngine.render(ctx, objectTile, frameIndex);
    } else if (deadPlayer) {
      PlayerEngine.render(ctx, deadPlayer);
    } else {
      RenderEngine.drawTile(ctx, sourceTile, BoardEngine.emptyTile);
    }
  }

  static animatePlayers(
    ctx: CanvasRenderingContext2D,
    players: IPlayer[],
    frameIndex: number
  ): void {
    players.forEach((player: IPlayer) => {
      this.clearTile(ctx, player.tile, [], [], frameIndex, player.id);
      PlayerEngine.render(ctx, player, frameIndex);
    });
  }

  static animateObjectTiles(
    ctx: CanvasRenderingContext2D,
    objectTiles: IObjectTile[],
    frameIndex: number
  ): void {
    objectTiles
      .filter((objectTile: IObjectTile) => objectTile.isAnimated)
      .forEach((objectTile: IObjectTile) => {
        ObjectTileEngine.render(ctx, objectTile, frameIndex);
      });
  }
}
