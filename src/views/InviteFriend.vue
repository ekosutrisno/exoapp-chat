<template>
 <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
</div>
 <div class="min-h-screen w-full absolute inset-0 max-w-screen-sm mx-auto flex flex-col justify-center items-center">
   <div class="flex px-4 fixed w-full top-0 max-w-screen-sm items-center bg-whatsapp-dark-300 text-gray-300 h-16 shadow-lg z-40">
      <svg @click="back" class="w-5 md:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
         <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
   </div>
   <div class="h-full w-full px-4 pb-4 pt-20">
      <div class="mx-auto">
         <FriendIcon class="mx-auto"/>
      </div>
      <h1 class="text-center text-lg font-semibold text-gray-300 mb-6">INVITE FRIEND</h1>
      <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

      <div class="w-full flex flex-col">
         <input @keyup.enter="onInvite" v-model="email" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-6 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Your Friend Email" />
         <button @click="onInvite" type="button" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
            Invite
         </button>
         <p class="text-left mt-6 text-sm text-gray-300">Hi <span class="font-semibold">{{ currentUsername }}</span>, you can add to your friends contact list and share stories with each other. It should be noted that you can only invite your friends who are also registered and use ExoApp.</p>
         <p class="text-center mt-6 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
      </div>
   </div>
</div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import db from '../firebase';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Spinner from '../components/Spinner';
import FriendIcon from '../components/svg/FriendIcon.vue';
export default {
   components: { Spinner, FriendIcon },
   setup(){
      const store = useStore();
      const router = useRouter();

      const state = reactive({
         email: '',
         errorMessage: '',
         isProcess: false,
         user_id: computed(() => store.getters.getUserId),
         currentUsername: localStorage.getItem('username')
      })

       const validateEmail = (email) => {
         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return (true)
         }

         return (false)
      }

      const onInvite = async () => {
         state.isProcess = true;

         if(!validateEmail(state.email)){
            state.isProcess = false;
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
                  .set({
                    user_id: doc.data().user_id,
                    email: doc.data().email
                  })

                  .then(()=>{
                     state.isProcess = false;
                     router.back();
                  }).catch(e =>{
                     console.log(e)
                  })
            })
         })
      }

      const back = () => {
         router.back()
      }

      return {
         ...toRefs(state),
         onInvite,
         back
      }
   }
}
</script>