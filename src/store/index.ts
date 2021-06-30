import Vue from 'vue';
import Vuex from 'vuex';
import { IGameState, game } from './game/game.store';

Vue.use(Vuex);

export interface IRootState {
  game?: IGameState;
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    game,
  },
});
