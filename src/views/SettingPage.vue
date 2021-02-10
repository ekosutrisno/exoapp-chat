<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="bg-whatsapp-dark-300 inset-0 min-h-screen h-screen w-full max-w-screen-sm mx-auto flex flex-col overflow-y-auto justify-center items-center">
         <div class="flex px-4 fixed w-full top-0 max-w-screen-sm items-center bg-whatsapp-dark-300 text-gray-300 h-16 shadow-lg z-40">
            <svg @click="back" class="w-5 md:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
         </div>
         <div class="h-full w-full px-4 pb-4 pt-20 nv-transition">
            <div class="mx-auto flex w-40 h-40 max-w-screen-sm justify-center relative mb-6 cursor-pointer">
               <div class="absolute bottom-2 right-0 z-30">
                  <label for="file-upload" class="relative cursor-pointer rounded-md font-medium bg hover:bg-opacity-50 text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                     <div class="rounded-full bg-whatsapp-teal-green bg-opacity-80 text-gray-200 p-3 hover:bg-opacity-100 transition">
                        <span>
                           <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                           </svg>
                        </span>
                     </div>
                     <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="changeAvatar">
                  </label>
               </div>
               <img v-if="photo_url" class="w-40 h-40 object-cover ring-whatsapp-teal-green rounded-full" :src="photo_url" alt="exoapp-logo">
               <U v-else class="w-40 h-40"/>
            </div>
               <h1 v-if="messageInfo" class="text-center text-sm font-semibold text-green-500 mb-6">{{messageInfo}}</h1>
            <div class="w-full flex flex-col">
               <h1 class="text-gray-300 font-semibold pl-2 text-sm mb-4 z-30">PERSONAL</h1>
               <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Username</h1>
                     <input v-model="username" type="text" required class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder- text-sm-70" placeholder="Username" />
                  </div>
               </div>

                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Status</h1>
                     <input v-model="status" type="text" required class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Status" />
                  </div>
                </div>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                   <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Handphone</h1>
                     <input v-model="phoneNumber" type="text" required class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Phone Number" />
                  </div>
                </div>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">About Me</h1>
                     <textarea v-model="descriptions" class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" rows="2" placeholder="Your Descriptions"></textarea>
                  </div>
               </div>
               <button type="button" @click="uploadAvatar" class="py-3 px-6 text-lg mt-4 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Update Profile
               </button>
            </div>
            <div class="w-full flex mt-4 flex-col">
               <h1 class="text-gray-300 font-semibold pl-2 text-sm z-30">ADVANCED</h1>
               <p class="text-whatsapp-yellow pl-2 text-sm z-30 mb-4">Change the email maybe can affect another configuration!.</p>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Change your email account</h1>
                     <div class="relative w-full">
                        <input v-model="email" type="text" :readonly="!isEdit" required class="py-2 w-full pl-2 z-20 text-gray-300 bg-transparent text-lg focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Email" />
                        <svg @click="isEdit = true" v-if="!isEdit" class="text-gray-400 w-6 absolute top-2 hover:text-gray-300 cursor-pointer right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <svg @click="isEdit = false" v-else class="text-gray-400 w-6 absolute top-2 hover:text-gray-300 cursor-pointer right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                     </div>
                  </div>
                </div>
            </div>
            <div class="w-full flex mt-8 flex-col">
               <div class="text-red-600 inline-flex items-center space-x-2 font-semibold pl-2 text-sm z-30">
                  <span>DANGER ZONE</span>
                  <span>
                     <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  </span>
               </div>
                  <p class="text-red-600 text-sm z-30 pl-2">This action canot be restore!</p>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-center space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <div class="relative w-full">
                        <input v-model="emailVerifyDelete" type="text" required class="py-2 w-full pl-2 z-20 text-gray-300 bg-transparent text-lg focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Your email here" />
                     </div>
                  </div>
                </div>
                  <button type="button" @click="onDeleteAccount" :disabled="!onVerifyDelete" :class="[!onVerifyDelete ? 'bg-gray-600' : 'bg-red-600' ]" class="py-2 px-4 w-48 mx-auto text-lg mt-4 rounded hover:bg-opacity-80 font-semibold text-gray-300 focus:outline-none">
                     Delete account
                  </button>
               <p class="text-center py-6 text-xs text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>

<script>
import {computed, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import { firestore, storage } from '../service/firebase'
import { useRouter } from 'vue-router'
import Spinner from '../components/Spinner.vue'
import U from '../components/svg/U.vue'
import { useStore } from 'vuex'

export default {
   components:{ Spinner, U },
   setup () {
      const router = useRouter();
      const store = useStore();

      const state = reactive({
         user_id: localStorage.getItem('user_id'),
         photo_url: '',
         username: '',
         phoneNumber: '',
         email: '',
         emailVerifyDelete: '',
         status: '',
         descriptions: '',
         newFoto : null,
         isProcess: false,
         messageInfo: '',
         isEdit: false
      })

      onMounted(()=> setUserDetail());

      const setUserDetail = ()=>{
         const me = store.state.users.currentUser;

         state.photo_url = me.photo_url;
         state.username = me.username;
         state.phoneNumber = me.phone_number;
         state.status = me.status;
         state.descriptions = me.descriptions;
         state.email = me.email;

      }

      const onVerifyDelete = computed(()=>{
         if(state.email === state.emailVerifyDelete){
            return true;
         }else{
            return false;
         }
      })

      const changeAvatar = (event) => {
         if (event.target.files && event.target.files[0]) {
            const fileType = event.target.files[0].type.toString();

            if(fileType.indexOf('image') != 0){
               alert('Please Choose an Image')
               return;
            }

            state.newFoto = event.target.files[0];
            state.photo_url = URL.createObjectURL(event.target.files[0])
         }else{
            alert('Error when change avatar!')
         }
      }

      const uploadAvatar = () => {
         state.isProcess = true;
         autoStopSpinner();

         if(state.newFoto){
            const upload = storage.ref()
            .child(state.user_id)
            .put(state.newFoto)

            upload.on(
                  'state_changed', 
                  null, 
                  err => console.log(err),
                  () => {
                     upload.snapshot.ref.getDownloadURL().then(url => {
                        updateUserInfo(true, url);
                     })
                  }
               )
         } else {
             updateUserInfo(false, null);
         }
      }

      const onDeleteAccount = ()=>{
         if(state.email.trim() !== state.emailVerifyDelete.trim()){
            return;
         }
         
         // TODO
         console.log('Account Deleted!');
      }

      const updateUserInfo = (isUrlPresent, downloadURL) => {
         let newInfo = {}
         if (isUrlPresent) {
            newInfo = {
               username: state.username,
               descriptions: state.descriptions,
               status: state.status,
               phone_number: state.phoneNumber,
               photo_url: downloadURL
            }
         } else {
              newInfo = {
               username: state.username,
               descriptions: state.descriptions,
               status: state.status,
               phone_number: state.phoneNumber
            }
         }

         firestore.collection('users')
            .doc(state.user_id)
            .update(newInfo)
            .then( () => {
               stopSpinner();
            })

      }

      onBeforeMount(() => {
         if (!localStorage.getItem("user_id")) {
          router.push("/login")
         }
      })

      const back = () => {
         router.back()
      }

      const stopSpinner = () => {
         state.isProcess = false;
         state.messageInfo = 'Profile Updated.';
         setTimeout(() => {
            state.isProcess = false;
            state.messageInfo = '';
         }, 5000);
      }

      const autoStopSpinner = () => {
         setTimeout(() => {
            state.isProcess = false;
         }, 10000);
      }

      return {
         ...toRefs(state),
         changeAvatar,
         uploadAvatar,
         onVerifyDelete,
         onDeleteAccount,
         back
      }
   }
}
</script>