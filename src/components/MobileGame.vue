<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="2"> </v-col>
      <v-col md="auto" class="btn-container center">
        <v-btn dark fab color="grey darken-2" @click="handleMove(EDirection.UP)"
          ><v-icon dark> mdi-arrow-up-circle </v-icon></v-btn
        >
      </v-col>
      <v-col xs="2"> </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="2" class="btn-container right"
        ><v-btn dark fab color="grey darken-2" @click="handleMove(EDirection.LEFT)"
          ><v-icon dark> mdi-arrow-left-circle </v-icon></v-btn
        ></v-col
      >
      <v-col md="auto" class="btn-container center">
        <v-btn dark fab color="red darken-2" @click="handleShoot"
          ><v-icon dark> mdi-target-account </v-icon></v-btn
        >
      </v-col>
      <v-col xs="2" class="btn-container left"
        ><v-btn dark fab color="grey darken-2" @click="handleMove(EDirection.RIGHT)"
          ><v-icon dark> mdi-arrow-right-circle </v-icon></v-btn
        ></v-col
      >
    </v-row>
    <v-row justify="center">
      <v-col xs="2"> </v-col>
      <v-col md="auto" class="btn-container center">
        <v-btn dark fab color="grey darken-2" @click="handleMove(EDirection.DOWN)"
          ><v-icon dark> mdi-arrow-down-circle </v-icon></v-btn
        >
      </v-col>
      <v-col xs="2"> </v-col>
    </v-row>
    <v-row>
      <v-col xs="12">
        <ActionListCard :actions="myActions" :players="[me]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { EDirection } from '@/enums/direction.enum';
import { GameSubscriptions } from '@/graphql/subscriptions/game.subscriptions';
import { IAction } from '@/types/action.type';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ActionListCard from '@/components/ActionListCard.vue';

@Component({
  data: () => ({
    EDirection,
  }),
  components: {
    ActionListCard,
  },
})
export default class MobileGame extends Vue {
  @Prop() game!: IGame;
  @Prop() me?: IPlayer;
  @Prop() actions!: IAction[];
  @Prop() players!: IPlayer[];

  addSubscriptions() {
    this.$apollo.addSmartSubscription('playerUpdated', {
      query: GameSubscriptions.playerUpdated,
      variables: {
        gameId: this.game.id,
      },
      result: ({ data }: any) => {
        const { playerUpdated: updatedPlayer } = data;
        this.$emit('updatePlayer', updatedPlayer);
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
  }

  get myActions(): IAction[] {
    return this.actions.filter((action: IAction) => action.playerId === this.me?.id);
  }

  handleMove(direction: EDirection): void {
    if (!this.me) {
      return;
    }
    this.$emit('move', {
      playerId: this.me.id,
      gameId: this.game.id,
      direction,
    });
  }

  handleShoot(): void {
    if (!this.me) {
      return;
    }
    this.$emit('shoot', {
      playerId: this.me.id,
      gameId: this.game.id,
    });
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  &.center {
    justify-content: center;
  }
  &.right {
    justify-content: flex-end;
  }
  &.left {
    justify-content: flex-start;
  }
}
</style>
