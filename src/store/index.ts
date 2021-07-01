import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { IGameState, game } from './game/game.store';

Vue.use(Vuex);

export interface IRootState {
  game?: IGameState;
}

// const vuexLocalStorage = new VuexPersistence({
//   key: 'FFF_APP',
//   storage: window.localStorage,
//   reducer: (state: IRootState) => ({
//     game: {
//       isSpectating: state.game!.isSpectating,
//     },
//   }),
// });

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    game,
  },
  // plugins: [vuexLocalStorage.plugin],
});
