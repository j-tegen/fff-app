<template>
  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="text-h5 text-center"> Game Over! </v-card-title>

      <v-card-text>
        {{ text }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined text @click="handleClose"> Ok! </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameOverModal extends Vue {
  @Prop() winner?: IPlayer;
  showDialog: boolean = true;

  get text(): string {
    return this.winner
      ? `The winner of this round is ${this.winner.name}!`
      : 'Everyone died, no one won this round!';
  }

  handleClose(): void {
    this.$emit('close');
  }
}
</script>
