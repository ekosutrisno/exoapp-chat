<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="h-full min-h-screen absolute inset-0 w-full max-w-sm mx-auto flex flex-col justify-center items-center">
         <div class="h-full w-full p-4">
            <div class="mx-auto mb-3 w-28 h-28 ring-2 ring-whatsapp-teal-green rounded-full">
               <img class="w-full h-full object-cover " src="https://avatars0.githubusercontent.com/u/51039205?s=460&u=cb1d242b6a9b13a3b6383e46b5410fafe471b63d&v=4" alt="exoapp-logo">
            </div>
            <h1 class="text-center text-lg font-semibold text-gray-300 mb-6">SIGN UP</h1>
            <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

            <div @submit.prevent="onRegister" class="w-full flex flex-col">
               <input @keyup.enter="onRegister" v-model="username" type="text" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Username" />
               <input @keyup.enter="onRegister" v-model="email" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Email" />
               <input @keyup.enter="onRegister" v-model="password" type="password" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Password" />
               <input @keyup.enter="onRegister" v-model="confirmPassword" type="password" required class="hidden py-3 px-6 text-lg text-gray-300 mb-6 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Confirm Password" />
               <button @click="onRegister" type="button" class="py-4 text-lg px-6 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Sign Up
               </button>
               <p class="text-center text-lg text-gray-300 my-2">Already account? 
                  <router-link to="/login" class="font-semibold">
                     Sign In
                  </router-link>
               </p>
               <p class="text-center mt-6 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex';
import db from '../firebase'
import { useRouter } from 'vue-router'
import Spinner from '../components/Spinner.vue'

export default {
   components:{ Spinner },
   setup () {
       const router = useRouter();
       const store = useStore();

      const state = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            isProcess: false,
            errorMessage: ''
      });

      const ValidateEmail = (mail) => {
         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            return (true)
         }

         return (false)
      }

      const validatePassword = (password) => {
         // 01: TODO added validate with Confirm Password

         if (password.trim() === "" || password.length < 8) {
            return (true)
         }
         return (false)
      }

      const errorMessageHandler = (errors) => {
         state.errorMessage = errors;
         setTimeout(() => {
            state.errorMessage = '';
         }, 10000);
      }

      const validateInput = computed(() => {
         let usernameValidate = state.username === null || state.username === '';
         let emailValidate = state.email === null || state.email === '';
         let passwordValidate = state.password === null || state.password === '';
         
         return usernameValidate || emailValidate || passwordValidate;
      })


      const onRegister = async () => {
         const auth = db.auth();

         if (validateInput.value) {
            return;
         }
         
         if (!ValidateEmail(state.email)) {
            errorMessageHandler('Invalid format email.');
            return;
         }
         if(validatePassword(state.password)){
            errorMessageHandler('Password to short, min 8 caracter.');
            return;
         }

         state.isProcess = true;

        await auth.createUserWithEmailAndPassword( state.email, state.password )
         .then(async data =>{
                const userData = {
                  user_id: data.user.uid,
                  username: state.username,
                  password: state.password,
                  email: state.email,
                  descriptions: `Hi, My name is ${state.username}`,
                  phone_number: '',
                  photo_url: '',
                  status: 'I Love ExoApps'
               }
               
               insertUser(userData); //Save to Store

               await db.firestore().collection('users')
               .doc(data.user.uid)
               .set(userData).then( () =>{

                  state.username = '';
                  state.email = '';
                  state.password = '';

                  state.isProcess = false;

                  router.push("/chat-home") // Change To Page Chat
                  
               }).catch(err =>{
                  state.isProcess = false;
                  state.errorMessage = err.message;
               })
         }).catch(err => {
            state.isProcess = false;
            state.errorMessage = err.message;
         })

      }

      const insertUser = ( data ) => {
         store.dispatch('setCurrentUser', data);
      }

      return {
         ...toRefs(state),
         onRegister
      }
   }
}
</script>