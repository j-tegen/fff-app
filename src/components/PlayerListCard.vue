<template>
  <v-card class="mb-4">
    <v-card-title> Players </v-card-title>
    <v-list two-line>
      <v-list-item-group v-model="activePlayer" color="grey darken-3">
        <v-list-item v-for="player in players" :key="player.id" disabled>
          <v-list-item-avatar>
            <v-icon color="white" :class="player.colour.toLowerCase()" dark
              >mdi-account-circle</v-icon
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="player.name"></v-list-item-title>
            <v-list-item-subtitle v-text="playerStatus(player)"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PlayerListCard extends Vue {
  @Prop() players!: IPlayer[];
  @Prop() me?: IPlayer;

  playerStatus(player: IPlayer): string {
    return player.isDead ? 'Dead' : 'Alive';
  }

  get activePlayer(): number {
    return this.players.findIndex((player: IPlayer) => player.id === this.me?.id);
  }
}
</script>
