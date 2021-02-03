<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="h-full min-h-screen absolute inset-0 w-full max-w-screen-sm mx-auto flex flex-col justify-center items-center">
         <div class="h-full w-full p-4">
            <div class="mx-auto">
               <ChatIcon class="mx-auto"/>
            </div>
            <h1 class="text-center -mt-6 text-lg font-semibold text-gray-300 mb-6">SIGN UP</h1>
            <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

            <div @submit.prevent="onRegister" class="w-full flex flex-col">
               <input @keyup.enter="onRegister" v-model="username" type="text" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Username" />
               <input @keyup.enter="onRegister" v-model="email" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Email" />
               <input @keyup.enter="onRegister" v-model="password" type="password" required class="py-3 px-6 text-lg text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Password" />
               <input @keyup.enter="onRegister" v-model="confirmPassword" type="password" required class="py-3 px-6 text-lg text-gray-300 mb-6 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Confirm Password" />
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
            colors:[
               '#ffccc7',
               '#ffd8bf',
               '#ffe7ba',
               '#fff1b8',
               '#ffffb8',
               '#f4ffb8',
               '#d9f7be',
               '#b5f5ec',
               '#bae7ff',
               '#d6e4ff',
               '#efdbff',
               '#ffd6e7',
               '#ffadd2',
               '#d3adf7',
               '#adc6ff',
               '#91d5ff',
               '#87e8de',
               '#b7eb8f',
               '#eaff8f',
               '#fffb8f',
               '#ffe58f',
               '#ffd591',
               '#ffbb96',
               '#ffa39e',
               '#69c0ff',
               '#40a9ff',
               '#5cdbd3',
               '#36cfc9',
               '#95de64',
               '#73d13d',
               '#d3f261',
               '#bae637',
               '#fff566',
               '#ffec3d',
               '#ffd666',
               '#ffc53d',
               '#ffc069',
               '#ffa940',
               '#ff9c6e',
               '#ff7a45',
               '#ff7875',
               '#ff4d4f',
               '#eb2f96',
               '#c41d7f',
               '#722ed1',
               '#531dab',
               '#2f54eb',
               '#1d39c4',
               '#1890ff',
               '#096dd9',
               '#13c2c2',
               '#08979c',
               '#52c41a',
               '#389e0d',
               '#a0d911',
               '#7cb305',
               '#fadb14',
               '#d4b106',
               '#faad14',
               '#d48806',
               '#fa8c16',
               '#d46b08',
               '#fa541c',
               '#d4380d',
               '#f5222d',
               '#cf1322',
               '#a8071a',
               '#237804',
               '#006d75',
               '#0050b3',
               '#10239e',
               '#391085',
               '#9e1068',
               '#780650'
            ]
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
         let randomColorCode = state
          .colors[Math.floor(Math.random()*state.colors.length)];
         

         const auth = db.auth();

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
                  color_code: randomColorCode,
                  username: state.username,
                  password: state.password,
                  email: state.email,
                  join_at: moment().format('LLLL'),
                  descriptions: `Hi, My name is ${state.username}`,
                  phone_number: '',
                  photo_url: '',
                  status: 'I Love ExoApps'
               }
               
               insertUser(userData); //Save to Store and LocalStorage

               await db.firestore().collection('users')
               .doc(data.user.uid)
               .set(userData).then( () =>{
                  
                  state.username = '';
                  state.email = '';
                  state.password = '';
                  state.confirmPassword = '';

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