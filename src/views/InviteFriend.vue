<template>
   <div>
      <input @keyup.enter="onInvite" v-model="email" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Your Friend Email" />
      <button @click="onInvite" type="button" class="py-4 text-lg px-6 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
         Invite
      </button>
   </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import db from '../firebase';
import { useStore } from 'vuex';
export default {
   setup(){
      const store = useStore();

      const state = reactive({
         email: '',
         errorMessage: '',
         user_id: computed(() => store.getters.getUserId)
      })

       const validateEmail = (email) => {
         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return (true)
         }

         return (false)
      }

      const onInvite = async () => {
         if(!validateEmail(state.email)){
            return;
         }

         await db.firestore().collection('users')
            .where('email', '==', state.email )
            .get().then( querySnapshot => {
              querySnapshot.forEach(doc => {
                 db.firestore().collection('users')

                  .doc(state.user_id)
                  .collection('friends')
                  .doc(doc.data().user_id)
                  .set(doc.data())

                  .then(ref =>{
                     console.log(`Friend Added! ${ref}`)
                  }).catch(e =>{
                     console.log(e)
                  })
            })
         })
      }

      return {
         ...toRefs(state),
         onInvite
      }
   }
}
</script>