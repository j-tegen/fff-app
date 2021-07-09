<template>
  <v-container fluid>
    <template v-if="game">
      <JoinGame
        v-if="!hasJoined"
        :me="me"
        :players="players"
        :active-round="activeRound"
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
        :active-round="activeRound"
        @updatePlayer="handleUpdatePlayer"
        @updateArrows="handleUpdateArrows"
        @startRound="startRound"
        @move="handleMove"
        @shoot="handleShoot"
      />
      <MobileGame
        v-else
        :game="game"
        :me="me"
        :actions="actions"
        :players="players"
        :active-round="activeRound"
        @move="handleMove"
        @shoot="handleShoot"
        @startRound="startRound"
        @updatePlayer="handleUpdatePlayer"
        @updateArrows="handleUpdateArrows"
      />
    </template>
    <v-row xs="12" md="6" v-else> Weird, couldn't find the game! </v-row>
    <SpectatingSnackbar v-if="isSpectating && !me" />
    <Message v-if="message" :message="message" :top="true" @resetMessage="handleResetMessage" />
    <Message
      v-if="errorCode"
      :error-code="errorCode"
      :bottom="true"
      @resetError="handleResetError"
    />
    <GameOverModal
      v-if="showGameOverModal"
      :winner="activeRound.winner"
      @close="handleCloseGameOverModal"
    />
  </v-container>
</template>

<script lang="ts">
import { GameActions } from '@/store/game/game.store.enums';
import Game from '@/components/Game.vue';
import GameOverModal from '@/components/GameOverModal.vue';
import JoinGame from '@/components/JoinGame.vue';
import MobileGame from '@/components/MobileGame.vue';
import SpectatingSnackbar from '@/components/SpectatingSnackbar.vue';
import Message from '@/components/Message.vue';
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
import { IGameRound } from '@/types/game-round.type';

@Component({
  components: {
    Game,
    JoinGame,
    MobileGame,
    SpectatingSnackbar,
    Message,
    GameOverModal,
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
  @State('message', { namespace: 'game' }) message?: string;
  @State('activeRound', { namespace: 'game' }) activeRound?: IGameRound;

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
  @Action(GameActions.SET_MESSAGE, { namespace: 'game' }) setMessage: any;
  @Action(GameActions.START_ROUND, { namespace: 'game' }) startRound: any;
  @Action(GameActions.SET_WINNER, { namespace: 'game' }) setWinner: any;

  name: string = '';
  showGameOverModal: boolean = false;

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

  handleCloseGameOverModal(): void {
    this.showGameOverModal = false;
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
    this.$apollo.addSmartSubscription('gameOver', {
      query: GameSubscriptions.gameOver,
      variables: {
        gameId: this.game!.id,
      },
      result: ({ data }: any) => {
        const {
          gameOver: { winner },
        } = data;
        this.handleGameOver(winner);
      },
    });
    this.$apollo.addSmartSubscription('gameReset', {
      query: GameSubscriptions.gameReset,
      variables: {
        gameId: this.game!.id,
      },
      result: () => {
        window.location.reload();
      },
    });
  }

  stopSubscriptions(): void {
    if (this.$apollo.subscriptions.playerAdded) {
      this.$apollo.subscriptions.playerAdded.stop();
    }
    if (this.$apollo.subscriptions.actionAdded) {
      this.$apollo.subscriptions.actionAdded.stop();
    }
    if (this.$apollo.subscriptions.resolveActions) {
      this.$apollo.subscriptions.resolveActions.stop();
    }
    if (this.$apollo.subscriptions.actionsResolved) {
      this.$apollo.subscriptions.actionsResolved.stop();
    }
    if (this.$apollo.subscriptions.gameOver) {
      this.$apollo.subscriptions.gameOver.stop();
    }
    if (this.$apollo.subscriptions.gameReset) {
      this.$apollo.subscriptions.gameReset.stop();
    }
  }

  handleStartRound(playerId: string): void {
    this.startRound(playerId);
  }

  handleResetMessage(): void {
    this.setMessage(undefined);
  }

  handleGameOver(winner?: IPlayer): void {
    this.setWinner(winner);
    this.showGameOverModal = true;
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
