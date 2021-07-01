<template>
  <v-snackbar v-model="isVisible" :timeout="-1" bottom class="text-center">
    <div class="content">
      <span class="mr-2">You are spectating!</span><v-icon>mdi-incognito</v-icon>
    </div>
  </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SpectatingSnackbar extends Vue {
  isVisible: boolean = true;
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
}
</style>
