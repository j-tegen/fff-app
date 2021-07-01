<template>
  <div class="hello">
    <canvas
      id="game-board"
      ref="board"
      :width="boardPixels"
      :height="boardPixels"
      @keypress="handleMove"
    />
    {{ frameIndex }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TILE_SIZE } from '@/constants/board.constants';
import { IGame } from '@/types/game.type';
import { GameEngine } from '@/engines/game.engine';
import { ArrowEngine } from '@/engines/arrow.engine';
import { IPlayer } from '@/types/player.type';
import { IObjectTile } from '@/types/object-tile.type';
import { GAME_LOOP_LENGTH } from '@/constants/game.constants';
import { GameSubscriptions } from '@/graphql/subscriptions/game.subscriptions';
import { IArrow } from '@/types/arrow.type';
import { EDirection } from '@/enums/direction.enum';

@Component
export default class GameBoard extends Vue {
  @Prop() game!: IGame;
  @Prop() players!: IPlayer[];
  @Prop() arrows!: IArrow[];
  @Prop() objectTiles!: IObjectTile[];
  @Prop() me!: IPlayer;
  @Prop() isResolving!: boolean;

  ctx!: CanvasRenderingContext2D;
  frameIndex: number = 0;

  get boardPixels(): number {
    return this.game.boardSize * TILE_SIZE;
  }

  handleMove(e: KeyboardEvent): void {
    switch (e.code) {
      case 'ArrowDown':
        this.$emit('move', {
          playerId: this.me.id,
          gameId: this.game.id,
          direction: EDirection.DOWN,
        });
        break;
      case 'ArrowUp':
        this.$emit('move', {
          playerId: this.me.id,
          gameId: this.game.id,
          direction: EDirection.UP,
        });
        break;
      case 'ArrowLeft':
        this.$emit('move', {
          playerId: this.me.id,
          gameId: this.game.id,
          direction: EDirection.LEFT,
        });
        break;
      case 'ArrowRight':
        this.$emit('move', {
          playerId: this.me.id,
          gameId: this.game.id,
          direction: EDirection.RIGHT,
        });
        break;
      case 'Space':
        this.$emit('shoot', {
          playerId: this.me.id,
          gameId: this.game.id,
        });
        break;
    }
  }

  addSubscriptions() {
    this.$apollo.addSmartSubscription('playerUpdated', {
      query: GameSubscriptions.playerUpdated,
      variables: {
        gameId: this.game.id,
      },
      result: ({ data }: any) => {
        const { playerUpdated: updatedPlayer } = data;
        const player: IPlayer | undefined = this.players.find(
          (player: IPlayer) => player.id === updatedPlayer.id
        );
        this.$emit('updatePlayer', updatedPlayer);
        GameEngine.clearTile(
          this.ctx,
          player!.tile,
          this.objectTiles,
          this.players,
          this.frameIndex,
          player!.id
        );
      },
    });
    this.$apollo.addSmartSubscription('arrowUpdated', {
      query: GameSubscriptions.arrowUpdated,
      variables: {
        gameId: this.game.id,
      },
      result: ({ data }: any) => {
        const { arrowUpdated: updatedArrow } = data;
        this.$emit('updateArrows', updatedArrow);
        const arrow: IArrow | undefined = this.arrows.find(
          (arrow: IArrow) => arrow.id === updatedArrow.id
        );
        if (arrow) {
          GameEngine.clearTile(
            this.ctx,
            arrow.tile,
            this.objectTiles,
            this.players,
            this.frameIndex
          );
        }
        ArrowEngine.render(this.ctx, updatedArrow);
      },
    });
    this.$apollo.addSmartSubscription('actionsResolved', {
      query: GameSubscriptions.actionsResolved,
      variables: {
        gameId: this.game.id,
      },
      result: () => {
        this.$emit('actionsResolved');
      },
    });
    this.$apollo.addSmartSubscription('resolveActions', {
      query: GameSubscriptions.resolveActions,
      variables: {
        gameId: this.game.id,
      },
      result: () => {
        this.$emit('resolveActions');
      },
    });
  }

  stopSubscriptions() {
    if (this.$apollo.subscriptions.playerUpdated) {
      this.$apollo.subscriptions.playerUpdated.stop();
    }
    if (this.$apollo.subscriptions.arrowUpdated) {
      this.$apollo.subscriptions.arrowUpdated.stop();
    }
    if (this.$apollo.subscriptions.resolveActions) {
      this.$apollo.subscriptions.arrowUpdated.stop();
    }
    if (this.$apollo.subscriptions.actionsResolved) {
      this.$apollo.subscriptions.arrowUpdated.stop();
    }
  }

  renderLoop() {
    GameEngine.renderLoop(
      this.ctx,
      this.objectTiles,
      this.players,
      this.frameIndex,
      this.isResolving
    );
    setTimeout(() => {
      this.frameIndex = this.frameIndex === 3 ? 0 : this.frameIndex + 1;
      this.renderLoop();
    }, GAME_LOOP_LENGTH);
  }

  setupGame(): void {
    GameEngine.setup(this.ctx, this.game, this.players, this.objectTiles);
    this.renderLoop();
  }

  beforeDestroy(): void {
    this.stopSubscriptions();
  }

  mounted(): void {
    this.ctx = (this.$refs['board'] as HTMLCanvasElement).getContext('2d')!;
    this.setupGame();
    this.addSubscriptions();
    window.addEventListener('keydown', this.handleMove);
  }
}
</script>

<style scoped>
#game-board {
  width: 768px;
  height: 768px;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>
