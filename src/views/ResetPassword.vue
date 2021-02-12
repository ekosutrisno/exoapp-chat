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
   <div class="h-full w-full px-4 pb-4 pt-20 nv-transition">
      <div class="mx-auto">
         <Lock class="mx-auto"/>
      </div>
      <h1 class="text-center text-lg font-semibold text-gray-300 mb-6">RESET PASSWORD</h1>
      <p class="text-left my-4 ml-2 text-sm text-whatsapp-yellow">Make sure your email is active.</p>

      <h1 v-if="errorMessage" class="text-center text-sm font-semibold mb-6">  <span class="text-green-500">{{errorMessage}} </span><span class="text-whatsapp-yellow">{{email}}</span></h1>

      <div class="w-full max-w-md mx-auto flex flex-col">
         <input @keyup.enter="onResetPassword" v-model="email" type="email" required class="appearance-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 rounded-md focus:outline-none focus:ring-gray-700 border border-transparent mb-5 focus:border-gray-700 focus:z-10" placeholder="Your Email Address" />
         <button @click="onResetPassword" type="button" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
            Reset Password
         </button>
         <p class="text-left mt-6 text-sm text-gray-300">You can check your email after send reset password request, be sure your email is active.</p>
         <p class="text-center my-5 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
      </div>
   </div>
</div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { auth, firestore } from '../service/firebase';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Spinner from '../components/Spinner';
import Lock from '../components/svg/Lock.vue';
export default {
   components: { Spinner, Lock },
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

      const onResetPassword = async () => {
         state.isProcess = true;

         setTimeout(() => {
            state.errorMessage = '';
         }, 5000);

         if(!validateEmail(state.email)){
            state.isProcess = false;
            state.errorMessage = 'Invalid Format Email!'
            return;
         }

         await firestore.collection('users')
            .where('email', '==', state.email )
            .get().then(snapshot => {
               if(snapshot.size > 0){
                  
                  auth.sendPasswordResetEmail(state.email)
                  .then( () =>{
                     state.isProcess = false;
                     router.push({path:'/login', query:{reset_password: true}});
                  }).catch(e => console.log(e));
               }else{
                  state.isProcess = false;
                  state.errorMessage = `User not found with email `;
               }
            })

         setTimeout(() => {
            state.errorMessage = '';
         }, 5000);

      }

      const back = () => {
         router.back()
      }

      return {
         ...toRefs(state),
         onResetPassword,
         back
      }
   }
}
</script>