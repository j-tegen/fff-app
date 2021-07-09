<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col xs="12" md="6">
        <h4 class="text-h4">Welcome to Frienemies Fight Fest!</h4>
        <v-card class="card" elevation="2" tile max-width="600">
          <v-card-title> Create game </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="boardSize"
                outlined
                :rules="sizeRules"
                label="Board size"
                type="number"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="mb-2 mr-2"
              color="primary"
              outlined
              :disabled="!valid"
              @click="handleCreateGame"
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
import { IValidationFunction } from '@/types/validation-function.type';

@Component
export default class Start extends Vue {
  @Action(GameActions.CREATE_GAME, { namespace: 'game' }) createGame!: any;
  @Action(GameActions.RESET, { namespace: 'game' }) reset!: any;

  valid: boolean = false;
  boardSize: number = 10;
  isPublic: boolean = false;

  sizeRules: IValidationFunction[] = [
    (value: string | number): boolean | string =>
      !!(value >= 5 && value <= 20) || 'Board size must be between 5 and 20',
  ];

  handleCreateGame() {
    this.createGame({ isPublic: this.isPublic, boardSize: +this.boardSize });
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
