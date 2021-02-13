<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="h-full min-h-screen absolute inset-0 w-full max-w-screen-sm mx-auto flex flex-col justify-center items-center">
         <div class="h-full w-full p-4 nv-transition">
            <div class="mx-auto">
               <ChatIcon class="mx-auto"/>
            </div>
            <h1 class="text-center text-lg font-semibold text-gray-300 mb-3">SIGN UP</h1>
            <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

            <div class="w-full max-w-md mx-auto flex flex-col">
               <div class="rounded-md shadow-sm -space-y-px mb-5">
                  <input @keyup.enter="onRegister" v-model="username" type="text" required class="appearance-none rounded-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 rounded-t-md focus:outline-none focus:ring-whatsapp-teal-green border border-gray-700 focus:border-whatsapp-teal-green focus:z-10" placeholder="Username" />
                  <input @keyup.enter="onRegister" v-model="email" type="email" required class="appearance-none rounded-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 focus:outline-none focus:ring-whatsapp-teal-green border border-gray-700 focus:border-whatsapp-teal-green focus:z-10" placeholder="Email" />
                  <input @keyup.enter="onRegister" v-model="password" type="password" required class="appearance-none rounded-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 focus:outline-none focus:ring-whatsapp-teal-green border border-gray-700 focus:border-whatsapp-teal-green focus:z-10" placeholder="Password" />
                  <input @keyup.enter="onRegister" v-model="confirmPassword" type="password" required class="appearance-none rounded-none relative block w-full px-4 py-3 bg-gray-800 placeholder-gray-400 text-gray-300 rounded-b-md focus:outline-none focus:ring-whatsapp-teal-green border border-gray-700 focus:border-whatsapp-teal-green focus:z-10" placeholder="Confirm Password" />
               </div>

               <button @click="onRegister" type="button" class="py-3 text-lg px-6 rounded-md hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Sign Up
               </button>
               <p class="text-center text-lg text-gray-300 my-2">Already account? 
                  <router-link to="/login" class="text-xl font-semibold">
                     Sign In
                  </router-link>
               </p>
               <p class="text-center my-5 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex';
import { auth, firestore } from '../service/firebase'
import randomColorCode from '../service/randomColor';
import { useRouter } from 'vue-router'
import Spinner from '../components/Spinner'
import ChatIcon from '../components/svg/ChatIcon';
import moment from 'moment';

export default {
   components:{ Spinner, ChatIcon },
   setup () {
      const router = useRouter();
      const store = useStore();

      const state = reactive({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            isProcess: false,
            errorMessage: '',
      });

      const ValidateEmail = (mail) => {
         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            return (true)
         }

         return (false)
      }

      const validatePassword = (password, confirmPassword) => {
         let validatePassword1 = password.trim() === "" || password.length < 8;
         let validatePassword2 = confirmPassword.trim() === "" || confirmPassword.length < 8;
         let finalValidate = password !== confirmPassword;

         if (validatePassword1 || validatePassword2 || finalValidate) {
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
         let passwordConfirmValidate = state.confirmPassword === null || state.confirmPassword === '';
         
         return usernameValidate || emailValidate || passwordValidate || passwordConfirmValidate;
      })


      const onRegister = async () => {
         if (validateInput.value) {
            return;
         }
         
         if (!ValidateEmail(state.email)) {
            errorMessageHandler('Invalid format email.');
            return;
         }
         if(validatePassword(state.password, state.confirmPassword)){
            errorMessageHandler("Password to short, min 8 caracter, or password don't Match");
            return;
         }

         state.isProcess = true;

        await auth.createUserWithEmailAndPassword( state.email, state.password )
         .then(async data =>{
            const userData = {
               user_id: data.user.uid,
               color_code: randomColorCode.call(),
               username: state.username,
               password: state.password,
               email: state.email,
               last_active: '',
               join_at: moment().format('LLLL'),
               descriptions: `Hi, My name is ${state.username}`,
               phone_number: '',
               photo_url: '',
               status: 'I Love ExoApps'
            }
               
            await firestore.collection('users')
            .doc(data.user.uid)
            .set(userData).then( () =>{

               //Sending Email Verifications
               store.dispatch('users/onVerifyEmail');

               // Logout
               auth.signOut();
               
               state.username = '';
               state.email = '';
               state.password = '';
               state.confirmPassword = '';

               state.isProcess = false;

               router.push({ path: '/login', query: { status: 'new-account' } }) // Change To Login Page
               
            }).catch(err =>{
               state.isProcess = false;
               state.errorMessage = err.message;
            })
         }).catch(err => {
            state.isProcess = false;
            state.errorMessage = err.message;
         })

      }

      return {
         ...toRefs(state),
         onRegister
      }
   }
}
</script>