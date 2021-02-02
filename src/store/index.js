import { createStore } from 'vuex';
import users from './modules/users';
import friends from './modules/friends';
import groups from './modules/groups';

const store = createStore({
   modules:{
      users,
      friends,
      groups
   }
});


export default store;