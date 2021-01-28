import { createStore } from 'vuex';

const store = createStore({
   state() {
      return {
         currentUser: {
            user_id: localStorage.getItem('user_id'),
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            descriptions: localStorage.getItem('descriptions'),
            phone_number: localStorage.getItem('phone_number'),
            photo_url: localStorage.getItem('photo_url'),
            status: localStorage.getItem('status'),
         }
      };
   },
   getters: {
      getUserId() {
         return localStorage.getItem('user_id');
      }
   },
   mutations: {
      SET_CURRENT_USER(state, user) {
         state.currentUser = user;
      }
   },
   actions: {
      setCurrentUser({ commit }, user) {
         saveDataToLocalStorage(user);
         commit('SET_CURRENT_USER', user);
      }
   },
});

const saveDataToLocalStorage = (user) => {
   localStorage.setItem('user_id', user.user_id);
   localStorage.setItem('username', user.username);
   localStorage.setItem('email', user.email);
   localStorage.setItem('descriptions', user.descriptions);
   localStorage.setItem('phone_number', user.phone_number);
   localStorage.setItem('photo_url', user.photo_url);
   localStorage.setItem('status', user.status);
};

export default store;