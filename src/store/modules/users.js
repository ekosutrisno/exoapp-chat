// import db from '../../firebase';

const users = {
   state: () => ({ 
      currentUser: {}
   }),
   
   mutations: { 
      SET_CURRENT_USER(state, user) {
         state.currentUser = user;
      },
   },

   actions: { 
      setCurrentUser({ commit }, user) {
         saveDataToLocalStorage(user);
         commit('SET_CURRENT_USER', user);
      },
    },
    getters: {
      getUserId() {
         return localStorage.getItem('user_id');
      }
   },
 }

 const saveDataToLocalStorage = (user) => {
   localStorage.setItem('user_id', user.user_id);
   localStorage.setItem('username', user.username);
   localStorage.setItem('email', user.email);
   localStorage.setItem('descriptions', user.descriptions);
   localStorage.setItem('phone_number', user.phone_number);
   localStorage.setItem('photo_url', user.photo_url);
   localStorage.setItem('status', user.status);
};

export default users;
