import { createStore } from 'vuex';

const store = createStore({
   state() {
      return {
         currentUser: {}
      };
   },
   getters: {
      getUserId(state) {
         return state.currentUser.user_id;
      }
   },
   mutations: {
      SET_CURRENT_USER(state, data) {
            state.currentUser = data;
      }
   },
   actions: {
      setCurrentUser({ commit }, user) {
         commit('SET_CURRENT_USER', user);
      }
   },
});

export default store;