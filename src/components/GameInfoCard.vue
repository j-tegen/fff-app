<template>
  <v-card class="mb-4">
    <v-card-title>
      Game information
      <v-spacer />
      <template v-if="isOwner">
        <v-btn outlined color="primary" :disabled="isDisabled" @click="handleStartRound">
          {{ startButtonText }}</v-btn
        >
      </template>
      <span v-else-if="isRoundOver" class="text-subtitle-1 font-italic">Waiting for new round</span>
    </v-card-title>
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
import { IGameRound } from '@/types/game-round.type';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PlayerListCard extends Vue {
  @Prop() players!: IPlayer[];
  @Prop() game!: IGame;
  @Prop() me?: IPlayer;
  @Prop() activeRound?: IGameRound;

  isCopied: boolean = false;
  copyTimeout: number = 2000;

  get isRoundOver(): boolean {
    return !!this.activeRound?.roundOver;
  }

  get isDisabled(): boolean {
    if (!this.activeRound) {
      return false;
    }
    return !this.isRoundOver;
  }

  get disableStartButton(): boolean {
    if (!this.activeRound) {
      return false;
    } else if (this.activeRound.roundOver) {
      return false;
    }
    return true;
  }

  get startButtonText(): string {
    if (!this.activeRound) {
      return 'Start!';
    }
    return 'Start new round!';
  }

  get isOwner(): boolean {
    return !!this.me?.isOwner;
  }

  get url(): string {
    const { origin, pathname } = window.location;
    return `${origin}${pathname}`;
  }

  handleStartRound(): void {
    if (this.me) {
      this.$emit('startRound', this.me.id);
    }
  }

  handleCopyUrl(): void {
    this.isCopied = true;
    const textToCopy = (this.$refs['copy'] as any).$el.querySelector('input');
    textToCopy.select();
    document.execCommand('copy');
  }
}
</script>
