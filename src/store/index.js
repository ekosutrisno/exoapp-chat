import { createStore } from 'vuex';
import users from './modules/users';
import friends from './modules/friends';

const store = createStore({
   modules:{
      users,
      friends
   }
});


export default store;