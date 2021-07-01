<template>
  <v-card class="mb-4">
    <v-card-title> Game information </v-card-title>
    <v-card-text>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-checkerboard</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Board size: {{ game.boardSize }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Players: {{ players.length }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <v-text-field
        outlined
        dense
        append-icon="mdi-content-copy"
        label="Share link"
        :success="isCopied"
        :value="url"
        ref="copy"
        @click:append="handleCopyUrl"
      />
    </v-card-actions>
    <v-snackbar v-model="isCopied" :timeout="copyTimeout" top right color="green" dark>
      Link copied!
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PlayerListCard extends Vue {
  @Prop() players!: IPlayer[];
  @Prop() game!: IGame;

  isCopied: boolean = false;
  copyTimeout: number = 2000;

  get url(): string {
    const { origin, pathname } = window.location;
    return `${origin}${pathname}`;
  }

  handleCopyUrl(): void {
    this.isCopied = true;
    const textToCopy = (this.$refs['copy'] as any).$el.querySelector('input');
    textToCopy.select();
    document.execCommand('copy');
  }
}
</script>
