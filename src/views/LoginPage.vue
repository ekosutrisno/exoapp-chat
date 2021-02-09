<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="min-h-screen w-full absolute inset-0 max-w-screen-sm mx-auto flex flex-col justify-center items-center">
         <div class="h-full w-full p-4 nv-transition">
            <div class="mx-auto mb-3">
               <Lock class="mx-auto"/> 
            </div>
            <h1 class="text-center text-lg font-semibold text-gray-300 mb-3">SIGN IN</h1>
            <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

            <div class="w-full max-w-md mx-auto flex flex-col">
               
               <div class="rounded-md shadow-sm -space-y-px mb-5">
                  <div>
                     <input @keyup.enter="onLogin" v-model="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 rounded-t-md focus:outline-none focus:ring-whatsapp-teal-green border border-gray-700 focus:border-whatsapp-teal-green focus:z-10" placeholder="Email address">
                  </div>
                  <div>
                     <input @keyup.enter="onLogin" v-model="password"  type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 rounded-b-md focus:outline-none focus:ring-whatsapp-teal-green border border-gray-700 focus:border-whatsapp-teal-green focus:z-10" placeholder="Password">
                  </div>
               </div>
               <button @click="onLogin" type="button" class="py-3 px-6 text-lg rounded-md hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Sign In
               </button>
               <p class="text-center text-lg  text-gray-300 my-2">New user? let's 
                  <router-link to="/register" class="text-xl font-semibold">
                     Sign Up
                  </router-link>
               </p>
               <button @click="loginWithGoogle" type="button" class="py-3 px-4 w-32 mx-auto inline-flex items-center text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-dark-200 focus:outline-none">
                  <GoogleIcon class="w-6 mr-2"/><span>Google</span>
               </button>
               <p class="text-center text-lg text-gray-300 my-2">or 
                  <router-link to="/forgot-password" class="underline">
                     forgot password 
                  </router-link>
               </p>
               <p class="text-center my-3 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { auth, firestore, googleProvider } from '../service/firebase'
import randomColorCode from '../service/randomColor';
import moment from 'moment';
import Spinner from '../components/Spinner'
import Lock from '../components/svg/Lock.vue';
import GoogleIcon from '../components/svg/GoogleIcon.vue';
export default {
   components:{Spinner, Lock, GoogleIcon},
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
            
              store.dispatch('onUserSigin')
               
              await store.dispatch('setCurrentUser', res.user.uid);

               state.isProcess = false;
               router.push({
                  name: 'chat-home', 
                  params: {user_id: res.user.uid}
               })
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

      const loginWithGoogle = () =>{
         var provider = googleProvider;
         provider.addScope('profile');
         provider.addScope('email');
         
         auth.signInWithPopup(provider).then( async (res) => {

            var user = res.user;

            const userData = {
               user_id: user.uid,
               color_code: randomColorCode.call(),
               username: user.displayName,
               email: user.email,
               online: true,
               last_active: '',
               join_at: moment().format('LLLL'),
               descriptions: `Hi, My name is ${user.displayName}`,
               phone_number: user.phoneNumber,
               photo_url: user.photoURL,
               status: 'I Love ExoApps'
            }

            await firestore.collection('users')
            .doc(user.uid)
            .set(userData).then( async () =>{
               
               localStorage.setItem("user_id", user.user_id)
   
               
               store.dispatch('onUserSigin');
                  
               await store.dispatch('setCurrentUser', user.uid);
   
               router.push({
                     name: 'chat-home', 
                     params: {user_id: user.uid}
               })
            })
            
         });

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
         let user_id = localStorage.getItem('user_id')
         if(user_id) { 
            router.push({
               name: 'chat-home', 
               params : {user_id: user_id}
            })
         }
      })

      return {
         ...toRefs(state),
         onLogin, 
         loginWithGoogle
      }
   }
}
</script>