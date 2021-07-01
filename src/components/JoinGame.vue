<template>
  <v-row>
    <v-col class="ml-2" xs="12" md="6">
      <v-card>
        <v-card-title>Game is ready</v-card-title>
        <v-card-text>
          Join the game as a player or skip the step to spectate
          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Player name"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="mr-2 mb-2" outlined @click="handleSpectate">Spectate</v-btn>
          <v-btn
            class="mr-2 mb-2"
            color="primary"
            outlined
            @click="handleAddPlayer"
            :disabled="!valid"
            >Create player</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IPlayer } from '@/types/player.type';

interface IValidationFunction {
  (value: string): boolean | string;
}

@Component
export default class JoinGame extends Vue {
  @Prop() players!: IPlayer[];

  valid: boolean = false;
  name: string = '';

  nameRules: IValidationFunction[] = [
    (value: string): boolean | string => !!value || 'Name is required',
  ];

  handleSpectate(): void {
    this.$emit('spectate');
  }

  handleAddPlayer(): void {
    this.$emit('addPlayer', this.name);
  }
}
</script>

<style lang="scss" scoped>
.divider {
  margin: 12px 0;
}
</style>
