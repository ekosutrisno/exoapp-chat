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
    async setListFriend({ commit }){

      let current_user_id = db.auth().currentUser.uid;
      
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
      },
      updateFriendStatus(){
         db.firestore().collection('users')
         .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("New: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed: ", change.doc.data());
                }
            });
        });
      }
   },

   getters: {  }

 }

 export default friends;