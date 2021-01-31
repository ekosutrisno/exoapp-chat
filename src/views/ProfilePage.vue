<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="bg-gray-800 h-full inset-0 min-h-screen w-full max-w-screen-sm mx-auto flex flex-col overflow-y-auto justify-center items-center">
         <div class="h-full w-full p-4">
            <div @click="back" class="font-semibold md:cursor-pointer text-gray-300">
               <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
               </svg>
            </div>
            <div class="mx-auto relative mb-6 w-40 h-40 overflow-hidden ring-4 ring-opacity-70 cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 ring-whatsapp-teal-green rounded-full">
               <div class="absolute bottom-2 right-16">
                  <label for="file-upload" class="relative cursor-pointer rounded-md font-medium bg hover:bg-opacity-50 text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <div class="rounded bg-gray-300 p-1">
                     <span>
                        <svg class="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                     </svg>
                     </span>
                  </div>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="changeAvatar">
               </label>
               </div>
               <img class="w-full h-full object-cover" :src="photoUrl ? photoUrl: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-128.png'" alt="exoapp-logo">

            </div>
               <h1 v-if="messageInfo" class="text-center text-sm font-semibold text-green-500 mb-6">{{messageInfo}}</h1>
            <div class="w-full flex flex-col">
               <span class="text-gray-400 text-sm px-4 -mb-2 z-50">Username</span>
               <input v-model="username" type="text" required class="py-2 px-4 text-gray-300 mb-2 rounded bg-transparent focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder- text-sm-70" placeholder="Username" />
               <span class="text-gray-400 text-sm px-4 -mb-2 z-50">Status</span>
               <input v-model="status" type="text" required class="py-2 px-4 text-gray-300 mb-2 rounded bg-transparent focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Status" />
               <span class="text-gray-400 text-sm px-4 -mb-2 z-50">Handphone</span>
               <input v-model="phoneNumber" type="text" required class="py-2 px-4 text-gray-300 mb-2 rounded bg-transparent focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Phone Number" />
               <span class="text-gray-400 text-sm px-4 -mb-2 z-50">About Me</span>
               <textarea v-model="descriptions" class="py-2 px-4 text-gray-300 mb-2 rounded bg-transparent focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" rows="2" placeholder="Your Descriptions"></textarea>

               <button type="button" @click="uploadAvatar" class="py-3 px-6 text-lg mt-4 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Update Profile
               </button>
               <p class="text-center mt-6 text-xs text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from 'vue'
import db from '../firebase'
import { useRouter } from 'vue-router'
import Spinner from '../components/Spinner.vue'

export default {
   components:{ Spinner },
   setup () {
      const router = useRouter();

      const state = reactive({
         user_id: localStorage.getItem('user_id'),
         photoUrl: localStorage.getItem('photo_url'),
         username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
         phoneNumber: localStorage.getItem('phone_number') ? localStorage.getItem('phone_number') : '',
         status: localStorage.getItem('status') ? localStorage.getItem('status') : '',
         descriptions: localStorage.getItem('descriptions') ? localStorage.getItem('descriptions') : '',
         newFoto : null,
         isProcess: false,
         messageInfo: ''
      })

      const changeAvatar = (event) => {
         if (event.target.files && event.target.files[0]) {
            const fileType = event.target.files[0].type.toString();

            if(fileType.indexOf('image') != 0){
               alert('Please Choose an Image')
               return;
            }

            state.newFoto = event.target.files[0];
            state.photoUrl = URL.createObjectURL(event.target.files[0])
         }else{
            alert('Error when change avatar!')
         }
      }

      const uploadAvatar = () => {
         state.isProcess = true;
         autoStopSpinner();

         if(state.newFoto){
            const upload = db.storage().ref()
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

         db.firestore().collection('users')
            .doc(state.user_id)
            .update(newInfo)
            .then( () => {
                  localStorage.setItem('username', state.username)
                  localStorage.setItem('descriptions', state.descriptions)
                  if (isUrlPresent) {
                     localStorage.setItem('photo_url', downloadURL)
                  }
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
         back
      }
   }
}
</script>