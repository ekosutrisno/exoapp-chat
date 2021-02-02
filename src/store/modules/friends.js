import db from '../../firebase';

const friends = {

   state: () => ({ 
      
      friends: []
    
    }),

    mutations: { 
      SET_LIST_FRIEND(state, friends) {
        state.friends = friends;
      },
    },

   actions: { 
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
                           user_id: doc.data().user_id,
                           email: doc.data().email,
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
   },

   getters: {  }

 }

 export default friends;