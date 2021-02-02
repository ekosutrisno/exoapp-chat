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
         <div class="h-full w-full px-4 pb-4 pt-20">
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
               <img class="w-40 h-40 object-cover ring-whatsapp-teal-green rounded-full" :src="photoUrl ? photoUrl: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-128.png'" alt="exoapp-logo">
            </div>
               <h1 v-if="messageInfo" class="text-center text-sm font-semibold text-green-500 mb-6">{{messageInfo}}</h1>
            <div class="w-full flex flex-col">
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
               <p class="text-center py-6 text-xs text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
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
<style scoped>
.bg-all {
  background-color: #131c21;
  background-image: url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%2306877d' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>