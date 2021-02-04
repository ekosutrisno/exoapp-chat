
import db from '../../firebase';

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
      onUserSigin(){

         const auth = db.auth();
         const dbUser =  db.firestore().collection('users')

         auth.onAuthStateChanged((user) =>{
            if (user) {
               let user_id = user.uid;
               dbUser.doc(user_id)
                  .update({
                     online: true
                  });

            } else {
               // 
            }
          });
      },
      onUserSignout({commit}, current_user_id){
         const dbUser =  db.firestore().collection('users');
        
         dbUser.doc(current_user_id)
             .update({
                online: false, 
                last_active: new Date().toISOString()
            });

         commit('SET_CURRENT_USER', {});
      }
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
   localStorage.setItem('color_code', user.color_code)
};

export default users;
