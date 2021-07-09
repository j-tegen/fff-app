<template>
  <v-snackbar
    v-model="isVisible"
    :timeout="-1"
    :bottom="bottom"
    :top="top"
    multi-line
    :color="colour"
    dark
  >
    {{ text }}
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { EErrorCode } from '@/enums/error-code.enum';

@Component
export default class Message extends Vue {
  @Prop() errorCode?: EErrorCode;
  @Prop() message?: string;
  @Prop() bottom?: boolean;
  @Prop() top?: boolean;
  isVisible: boolean = true;

  get text(): string {
    return this.message || this.errorMessage;
  }

  get colour(): string {
    return this.errorCode ? 'red' : 'green';
  }

  get errorMessage(): string {
    if (!this.errorCode) {
      return '';
    }
    switch (this.errorCode) {
      case EErrorCode.ACTIONS_LOCKED:
        return 'Actions locked. Wait until next turn.';
      case EErrorCode.NO_ACTIVE_ROUND:
        return 'There is no active round. Start the round to begin!';
      case EErrorCode.PLAYER_NOT_OWNER:
        return 'Only the creator of the game can do that!';
      case EErrorCode.ROUND_OVER:
        return 'Round is over! Start a new round.';
      case EErrorCode.MAX_ACTIONS:
        return 'You cannot perform more actions this round!';
      case EErrorCode.GAME_FULL:
        return 'Game is full!';
      case EErrorCode.GAME_NOT_FOUND:
        return 'Game could not be found!';
      case EErrorCode.NETWORK_ERROR:
        return 'Network error';
      case EErrorCode.ROUND_STARTED:
        return 'Round has started! Wait until next turn';
      default:
        return 'Unknown error';
    }
  }

  mounted() {
    setTimeout(() => {
      if (this.errorCode) {
        this.$emit('resetError');
      } else {
        this.$emit('resetMessage');
      }
    }, 4000);
  }
}
</script>
