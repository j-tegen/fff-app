<template>
  <v-container fluid>
    <template v-if="game">
      <JoinGame
        v-if="!hasJoined"
        :me="me"
        :players="players"
        @addPlayer="handleAddPlayer"
        @spectate="handleSpectate"
      />
      <Game
        v-else-if="!isMobile"
        :game="game"
        :me="me"
        :object-tiles="objectTiles"
        :players="players"
        :arrows="arrows"
        :is-resolving="isResolving"
        :actions="actions"
        @updatePlayer="handleUpdatePlayer"
        @updateArrows="handleUpdateArrows"
        @move="handleMove"
        @shoot="handleShoot"
      />
      <MobileGame
        v-else
        :game="game"
        :me="me"
        :actions="actions"
        :players="players"
        @move="handleMove"
        @shoot="handleShoot"
        @updatePlayer="handleUpdatePlayer"
        @updateArrows="handleUpdateArrows"
      />
    </template>
    <v-row xs="12" md="6" v-else> Weird, couldn't find the game! </v-row>
    <SpectatingSnackbar v-if="isSpectating && !me" />
    <ErrorMessage v-if="errorCode" :error-code="errorCode" @resetError="handleResetError" />
  </v-container>
</template>

<script lang="ts">
import { GameActions } from '@/store/game/game.store.enums';
import Game from '@/components/Game.vue';
import JoinGame from '@/components/JoinGame.vue';
import MobileGame from '@/components/MobileGame.vue';
import SpectatingSnackbar from '@/components/SpectatingSnackbar.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { GameSubscriptions } from '@/graphql/subscriptions/game.subscriptions';
import { IObjectTile } from '@/types/object-tile.type';
import { IArrow } from '@/types/arrow.type';
import { EDirection } from '@/enums/direction.enum';
import { EErrorCode } from '@/enums/error-code.enum';
import { IAction } from '@/types/action.type';

@Component({
  components: {
    Game,
    JoinGame,
    MobileGame,
    SpectatingSnackbar,
    ErrorMessage,
  },
})
export default class GameView extends Vue {
  @State('game', { namespace: 'game' }) game?: IGame;
  @State('players', { namespace: 'game' }) players!: IPlayer[];
  @State('arrows', { namespace: 'game' }) arrows!: IArrow[];
  @State('objectTiles', { namespace: 'game' }) objectTiles!: IObjectTile[];
  @State('me', { namespace: 'game' }) me?: IPlayer;
  @State('isResolving', { namespace: 'game' }) isResolving!: boolean;
  @State('isSpectating', { namespace: 'game' }) isSpectating!: boolean;
  @State('errorCode', { namespace: 'game' }) errorCode!: EErrorCode;
  @State('actions', { namespace: 'game' }) actions!: IAction[];

  @Action(GameActions.LOAD_GAME, { namespace: 'game' }) loadGame: any;
  @Action(GameActions.ADD_PLAYER, { namespace: 'game' }) addPlayer: any;
  @Action(GameActions.UPDATE_PLAYER, { namespace: 'game' }) updatePlayer: any;
  @Action(GameActions.UPDATE_ARROWS, { namespace: 'game' }) updateArrows: any;
  @Action(GameActions.SET_ME, { namespace: 'game' }) setMe: any;
  @Action(GameActions.MOVE, { namespace: 'game' }) move: any;
  @Action(GameActions.SHOOT, { namespace: 'game' }) shoot: any;
  @Action(GameActions.START_RESOLVING_ACTIONS, { namespace: 'game' })
  resolveActions: any;
  @Action(GameActions.END_RESOLVING_ACTIONS, { namespace: 'game' })
  actionsResolved: any;
  @Action(GameActions.SPECTATE, { namespace: 'game' })
  spectate: any;
  @Action(GameActions.SET_ERROR, { namespace: 'game' }) setError: any;
  @Action(GameActions.ADD_ACTION, { namespace: 'game' }) addAction: any;

  name: string = '';

  get hasJoined(): boolean {
    return !!this.me || this.isSpectating;
  }

  @Watch('$route')
  onRouteChange() {
    const { player } = this.$route.query;
    if (player) {
      this.setMe(player);
    }
  }

  addSubscriptions(gameId: string) {
    this.$apollo.addSmartSubscription('playerAdded', {
      query: GameSubscriptions.playerAdded,
      variables: {
        gameId,
      },
      result: () => {
        this.loadGame(gameId);
      },
    });
    this.$apollo.addSmartSubscription('actionAdded', {
      query: GameSubscriptions.actionAdded,
      variables: {
        gameId,
      },
      result: ({ data }: any) => {
        const { actionAdded: action } = data;
        this.addAction(action);
      },
    });
    this.$apollo.addSmartSubscription('actionsResolved', {
      query: GameSubscriptions.actionsResolved,
      variables: {
        gameId: this.game!.id,
      },
      result: () => {
        this.handleActionsResolved();
      },
    });
    this.$apollo.addSmartSubscription('resolveActions', {
      query: GameSubscriptions.resolveActions,
      variables: {
        gameId: this.game!.id,
      },
      result: () => {
        this.handleResolveActions();
      },
    });
  }

  stopSubscriptions() {
    if (this.$apollo.subscriptions.playerAdded) {
      this.$apollo.subscriptions.playerAdded.stop();
    }
    if (this.$apollo.subscriptions.actionAdded) {
      this.$apollo.subscriptions.actionAdded.stop();
    }
    if (this.$apollo.subscriptions.resolveActions) {
      this.$apollo.subscriptions.arrowUpdated.stop();
    }
    if (this.$apollo.subscriptions.actionsResolved) {
      this.$apollo.subscriptions.arrowUpdated.stop();
    }
  }

  handleResetError(): void {
    this.setError(undefined);
  }

  handleSpectate(): void {
    this.spectate();
  }

  handleActionsResolved(): void {
    this.actionsResolved();
  }

  handleResolveActions(): void {
    this.resolveActions();
  }

  handleMove(payload: { playerId: string; gameId: string; direction: EDirection }) {
    this.move(payload);
  }

  handleShoot(payload: { playerId: string; gameId: string }) {
    this.shoot(payload);
  }

  handleUpdateArrows(arrow: IArrow): void {
    this.updateArrows(arrow);
  }

  handleUpdatePlayer(player: IPlayer): void {
    this.updatePlayer(player);
  }

  handleAddPlayer(name: string): void {
    this.addPlayer({ name, gameId: this.game!.id });
  }

  beforeDestroy(): void {
    this.stopSubscriptions();
  }

  get isMobile(): boolean {
    return this.$vuetify.breakpoint.name === 'xs';
  }

  async mounted(): Promise<void> {
    const { id } = this.$route.params;
    await this.loadGame(id);
    this.addSubscriptions(id);
    this.onRouteChange();
  }
}
</script>

<style lang="scss" scoped>
.add-player-input {
  display: flex;
  flex-direction: column;
}
</style>
