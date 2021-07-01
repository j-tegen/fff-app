<template>
  <v-snackbar v-model="isVisible" :timeout="-1" bottom multi-line color="red" dark>
    {{ errorMessage }}
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { EErrorCode } from '@/enums/error-code.enum';

@Component
export default class ErrorMessage extends Vue {
  @Prop() errorCode!: EErrorCode;
  isVisible: boolean = true;

  get errorMessage(): string {
    switch (this.errorCode) {
      case EErrorCode.MAX_ACTIONS: {
        return 'You cannot perform more actions this round!';
      }
      case EErrorCode.GAME_FULL: {
        return 'Game is full!';
      }
      case EErrorCode.GAME_NOT_FOUND: {
        return 'Game could not be found!';
      }
      case EErrorCode.NETWORK_ERROR: {
        return 'Network error';
      }
      default:
        return 'Unknown error';
    }
  }

  mounted() {
    setTimeout(() => {
      this.$emit('resetError');
    }, 4000);
  }
}
</script>
