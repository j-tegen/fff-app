<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col xs="12" md="6">
        <h4 class="text-h4">Welcome to Frienemies Fight Fest!</h4>
        <v-card class="card" elevation="2" tile max-width="600">
          <v-card-title> Create game </v-card-title>
          <v-card-text>Create a game and share the link to your frienemies</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn class="mb-2 mr-2" color="primary" outlined @click="handleCreateGame"
              >Create Game!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

<style lang="scss" scoped>
.card {
  margin-top: 32px;
}
</style>
