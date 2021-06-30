<template>
  <div class="home">
    <button @click="handleCreateGame">Create Game!</button>
  </div>
</template>

<script lang="ts">
import { GameActions } from '@/store/game/game.store.enums';
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class Start extends Vue {
  @Action(GameActions.CREATE_GAME, { namespace: 'game' }) createGame!: any;
  @Action(GameActions.RESET, { namespace: 'game' }) reset!: any;

  handleCreateGame() {
    this.createGame();
  }

  mounted() {
    this.reset();
  }
}
</script>
