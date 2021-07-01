<template>
  <v-card>
    <v-card-title>{{ title }} </v-card-title>
    <v-list two-line dense>
      <v-list-item v-for="action in actions" :key="action.id" disabled>
        <v-list-item-avatar>
          <v-icon color="white" :class="action.player.colour.toLowerCase()" dark>{{
            icon(action)
          }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="action.type.toLowerCase()"></v-list-item-title>
          <v-list-item-subtitle v-text="action.direction.toLowerCase()"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { EActionType } from '@/enums/action-type.enum';
import { IAction } from '@/types/action.type';
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ActionListCard extends Vue {
  @Prop() actions!: IAction[];
  @Prop() players!: IPlayer[];

  get title(): string {
    return `Actions ${this.actions.length}/${this.players.length * 4}`;
  }

  icon(action: IAction): string {
    switch (action.type) {
      case EActionType.MOVE:
        return 'mdi-foot-print';
      default:
        return 'mdi-pistol';
    }
  }
}
</script>
