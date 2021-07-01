<template>
  <v-row>
    <v-col class="ml-2 mt-2">
      <GameBoard
        v-if="showGame"
        :game="game"
        :me="me"
        :object-tiles="objectTiles"
        :players="players"
        :arrows="arrows"
        :is-resolving="isResolving"
        @updatePlayer="handleUpdatePlayer"
        @updateArrows="handleUpdateArrows"
        @move="handleMove"
        @shoot="handleShoot"
        @resolveActions="handleResolveActions"
        @actionsResolved="handleActionsResolved"
      />
    </v-col>
    <v-col class="mr-2 mt-2">
      <GameStats
        :me="me"
        :game="game"
        :players="players"
        :actions="actions"
        :is-resolving="isResolving"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameBoard from '@/components/GameBoard.vue';
import GameStats from '@/components/GameStats.vue';
import { IGame } from '@/types/game.type';
import { IArrow } from '@/types/arrow.type';
import { IPlayer } from '@/types/player.type';
import { EDirection } from '@/enums/direction.enum';
import { IObjectTile } from '@/types/object-tile.type';
import { IAction } from '@/types/action.type';

@Component({
  components: {
    GameBoard,
    GameStats,
  },
})
export default class Game extends Vue {
  @Prop() game!: IGame;
  @Prop() players!: IPlayer[];
  @Prop() me?: IPlayer;
  @Prop() objectTiles!: IObjectTile[];
  @Prop() arrows!: IArrow[];
  @Prop() actions!: IAction[];
  @Prop() isResolving!: boolean;

  get showGame(): boolean {
    return !!this.game && !!this.players.length;
  }

  handleUpdatePlayer(player: IPlayer): void {
    this.$emit('updatePlayer', player);
  }
  handleUpdateArrows(arrow: IArrow): void {
    this.$emit('updateArrows', arrow);
  }
  handleMove(payload: { playerId: string; gameId: string; direction: EDirection }): void {
    this.$emit('move', payload);
  }
  handleShoot(payload: { playerId: string; gameId: string }): void {
    this.$emit('shoot', payload);
  }
  handleResolveActions(): void {
    this.$emit('resolveActions');
  }
  handleActionsResolved(): void {
    this.$emit('actionsResolved');
  }
}
</script>
