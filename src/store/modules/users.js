
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
               let dataToUpdate = {
                  online: true
               }
               dbUser.doc(user_id).update(dataToUpdate);

               db.database().ref(`active_user_status/${user_id}`)
               .update(dataToUpdate);

            } else {
               // 
            }
          });
      },
     async onUserSignout({commit}, current_user_id){
         let dataToUpdate = {
            online: false, 
            last_active: new Date().toISOString()
        }
        await  db.database().ref(`active_user_status/${current_user_id}`)
            .update(dataToUpdate);

         commit('SET_CURRENT_USER', {});
      },
     async updateStatus({commit},current_user_id){
         
         const dbUser =  db.firestore().collection('users');

         let dataToUpdate = {
            online: false, 
            last_active: new Date().toISOString()
        }

         await  dbUser.doc(current_user_id).update(dataToUpdate);

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
