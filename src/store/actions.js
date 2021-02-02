import db from '../firebase';

const actions = {
   setCurrentUser({ commit }, user) {
      saveDataToLocalStorage(user);
      commit('SET_CURRENT_USER', user);
   },
  async setListFriend({ commit }, current_user_id){
   
   const data = await db.firestore().collection('users')
                     .doc(current_user_id)
                     .collection('friends')
                     .get();

      if (data.docs.length > 0) {
         let listUser = [];
         let dataFriends = []
         listUser = [...data.docs]

         listUser.forEach((item, index) => {
            db.firestore().collection('users')
               .doc( item.id )
               .get().then(doc => {
                  
                  if(doc.exists){
                     dataFriends.push({
                        key: index,
                        documentKey: doc.id,
                        id: doc.data().user_id,
                        username: doc.data().username,
                        photo_url: doc.data().photo_url,
                        descriptions: doc.data().descriptions,
                     })
                  }
               })
         })

         commit('SET_LIST_FRIEND', dataFriends);
      }
         
   }
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

export default actions;