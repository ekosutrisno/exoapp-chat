<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="min-h-screen w-full absolute inset-0 max-w-screen-sm mx-auto flex flex-col justify-center items-center">
         <div class="h-full w-full p-4">
            <div class="mx-auto mb-3">
               <Lock class="mx-auto"/>
            </div>
            <h1 class="text-center text-lg font-semibold text-gray-300 mb-6">SIGN IN</h1>
            <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

            <div class="w-full flex flex-col">
               <input @keyup.enter="onLogin" v-model="email" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Email" />
               <input @keyup.enter="onLogin" v-model="password" type="password" required class="py-3 px-6 text-lg text-gray-300 mb-6 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Password" />
               <button @click="onLogin" type="button" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Sign In
               </button>
               <p class="text-center text-lg  text-gray-300 my-2">New user? let's 
                  <router-link to="/register" class="font-semibold">
                     Sign Up
                  </router-link>
               </p>
               <p class="text-center mt-6 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import db from '../firebase'
import Spinner from '../components/Spinner'
import Lock from '../components/svg/Lock';
export default {
   components:{Spinner, Lock},
   setup () {
      const router = useRouter();
      const store = useStore();

      const state = reactive({
            email: '',
            password: '',
            errorMessage:'',
            isProcess: false
      });

      const onLogin = () => {
         const auth = db.auth();

         if (!ValidateEmail(state.email)) {
            errorMessageHandler('Invalid format email.');
            return;
         }
         if(validatePassword(state.password)){
            errorMessageHandler('Password to short, min 8 caracter.');
            return;
         }

         state.isProcess = true;
         auth.signInWithEmailAndPassword(state.email, state.password)
         .then( async res => {
            if(res.user){
               await db.firestore().collection('users')
               .where('user_id', '==', res.user.uid)
               .get()
               .then(querySnapshot =>{
                  
                  querySnapshot.forEach( doc => {
                        let userData = doc.data();
                        const payload = {
                           user_id: userData.user_id,
                           username: userData.username,
                           email: userData.email,
                           phone_number: userData.phone_number,
                           photo_url: userData.photo_url,
                           status: userData.status,
                           descriptions: userData.descriptions,
                           FirebaseDocumentId: doc.id
                        }
                        setCurrentUser(payload);
                  })

                  state.isProcess = false;
               })

               router.push("/chat-home")
            }
         }).catch( err => {

            state.isProcess = false;

            if (err.code ==='auth/user-not-found') {
               errorMessageHandler('The Email invalid or User not found.')
            } else if(err.code === 'auth/wrong-password') {
               errorMessageHandler('The password is invalid.')
            }
         })

      }

       const setCurrentUser = async ( data ) => {
          await store.dispatch('setCurrentUser', data);
      }

      const errorMessageHandler = (errors) => {
         state.errorMessage = errors;
         setTimeout(() => {
            state.errorMessage = '';
         }, 10000);
      }

      const ValidateEmail = (mail) => {
         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            return (true)
         }

         return (false)
      }

      const validatePassword = (password) => {
         if (password.trim() === "" || password.length < 8) {
            return (true)
         }
         return (false)
      }

      onBeforeMount(() => {
         if(localStorage.getItem('user_id')) { 
            router.push('/chat-home')
         }
      })

      return {
         ...toRefs(state),
         onLogin
      }
   }
}
</script>