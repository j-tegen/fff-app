<template>
  <div class="about">
    <div v-if="game">
      <div class="add-player-input" v-if="!me">
        <label for="name-input">Name</label>
        <input v-model="name" id="name-input" />
        <button @click="handleAddPlayer">Join game</button>
      </div>
      <template v-else>
        <div class="me">Welcome to the game {{ me.name }}</div>
        <GameBoard
          v-if="showGame"
          :game="game"
          :me="me"
          :object-tiles="objectTiles"
          :players="players"
          :arrows="arrows"
          @updatePlayer="handleUpdatePlayer"
          @updateArrows="handleUpdateArrows"
          @move="handleMove"
        />
        <div v-if="!!players.length" class="status-board">
          <ul>
            <li v-for="player of players" :key="player.id">
              {{ player.name }}, ({{ player.colour }}) is {{ player.isDead ? 'DEAD' : 'ALIVE' }}!
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { GameActions } from '@/store/game/game.store.enums';
import GameBoard from '@/components/GameBoard.vue';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { GameSubscriptions } from '@/graphql/subscriptions/game.subscriptions';
import { IObjectTile } from '@/types/object-tile.type';
import { IArrow } from '@/types/arrow.type';
import { EDirection } from '@/enums/direction.enum';

@Component({
  components: {
    GameBoard,
  },
})
export default class Game extends Vue {
  @State('game', { namespace: 'game' }) game?: IGame;
  @State('players', { namespace: 'game' }) players!: IPlayer[];
  @State('arrows', { namespace: 'game' }) arrows!: IArrow[];
  @State('objectTiles', { namespace: 'game' }) objectTiles!: IObjectTile[];
  @State('me', { namespace: 'game' }) me?: IPlayer;

  @Action(GameActions.LOAD_GAME, { namespace: 'game' }) loadGame: any;
  @Action(GameActions.ADD_PLAYER, { namespace: 'game' }) addPlayer: any;
  @Action(GameActions.UPDATE_PLAYER, { namespace: 'game' }) updatePlayer: any;
  @Action(GameActions.UPDATE_ARROWS, { namespace: 'game' }) updateArrows: any;
  @Action(GameActions.SET_ME, { namespace: 'game' }) setMe: any;
  @Action(GameActions.MOVE, { namespace: 'game' }) move: any;

  name: string = '';

  get isEmptyGame(): boolean {
    return this.players.length === 0;
  }

  get showGame(): boolean {
    return !!this.game && !!this.players.length;
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
      result: ({ data }: any) => {
        console.log(data);
        this.loadGame(gameId);
      },
    });
  }

  stopSubscriptions() {
    if (this.$apollo.subscriptions.playerAdded) {
      this.$apollo.subscriptions.playerAdded.stop();
    }
  }

  handleMove(payload: { playerId: string; gameId: string; direction: EDirection }) {
    this.move(payload);
  }

  handleUpdateArrows(arrow: IArrow): void {
    this.updateArrows(arrow);
  }

  handleUpdatePlayer(player: IPlayer): void {
    this.updatePlayer(player);
  }

  handleAddPlayer(): void {
    this.addPlayer({ name: this.name, gameId: this.game!.id });
  }

  beforeDestroy(): void {
    this.stopSubscriptions();
  }

  async mounted(): Promise<void> {
    const { id } = this.$route.params;
    this.addSubscriptions(id);
    await this.loadGame(id);
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
