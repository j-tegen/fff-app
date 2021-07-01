<template>
  <v-sheet>
    <GameInfoCard :players="players" :game="game" />
    <PlayerListCard :players="players" :me="me" />
    <ActionListCard :actions="actions" :players="players" />
  </v-sheet>
</template>

<script lang="ts">
import ActionListCard from '@/components/ActionListCard.vue';
import PlayerListCard from '@/components/PlayerListCard.vue';
import GameInfoCard from '@/components/GameInfoCard.vue';
import { IAction } from '@/types/action.type';
import { IGame } from '@/types/game.type';
import { IPlayer } from '@/types/player.type';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ActionListCard,
    PlayerListCard,
    GameInfoCard,
  },
})
export default class GameStats extends Vue {
  @Prop() game!: IGame;
  @Prop() players!: IPlayer[];
  @Prop() isResolving!: boolean;
  @Prop() me?: IPlayer;
  @Prop() actions!: IAction[];
}
</script>
