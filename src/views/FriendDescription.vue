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
         <div class="h-full w-full px-4 pb-4">
         <div style="height:5.5rem" class="w-full"></div>
            <div class="mx-auto flex w-40 h-40 max-w-screen-sm justify-center relative mb-6 md:cursor-pointer">
               <img v-if="photo_url" class="w-40 h-40 object-cover ring-whatsapp-teal-green rounded-full" :src="photo_url" :alt="username">
               <U v-else class="w-40 h-40"/>
            </div>
               <h1 v-if="messageInfo" class="text-center text-sm font-semibold text-green-500 mb-6">{{messageInfo}}</h1>
            <div class="w-full flex flex-col">
               <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Username</h1>
                     <input v-model="username" type="text" readonly class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder- text-sm-70" placeholder="Username" />
                  </div>
               </div>

                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Status</h1>
                     <input v-model="status" type="text" readonly class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Status" />
                  </div>
                </div>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                   <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Handphone</h1>
                     <input v-model="phoneNumber" type="text" readonly class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Phone Number" />
                  </div>
                </div>
                 <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">Email</h1>
                     <input v-model="email" type="text" readonly required class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Email" />
                  </div>
                </div>
                <div class="inline-flex px-4 w-full max-w-screen-sm items-start space-x-2">
                  <svg class="w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div class="flex flex-col w-full">
                     <h1 class="text-gray-400 pl-2 text-sm -mb-2 z-30">About Me</h1>
                     <textarea v-model="descriptions" readonly class="py-2 pl-2 z-20 text-gray-300 mb-2 bg-transparent focus:outline-none border-b border-transparent transition-colors focus:border-gray-700 placeholder-gray-400 placeholder-opacity-70" rows="2" placeholder="Your Descriptions"></textarea>
                  </div>
               </div>

               <button @click="back" type="button" class="py-3 px-6 text-lg mt-4 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Chat
               </button>
               <p class="text-center my-5 text-xs text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
            </div>
         </div>
   </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import { firestore } from '../service/firebase'
import { useRoute, useRouter } from 'vue-router'
import Spinner from '../components/Spinner.vue'
import U from '../components/svg/U.vue'

export default {
   components:{ Spinner, U },
   setup () {
      const route = useRoute();
      const router = useRouter();

      const state = reactive({
         user_id: localStorage.getItem('user_id'),
         photo_url: '',
         username: '',
         phoneNumber: '',
         email: '',
         status: '',
         descriptions: '',
         isProcess: false,
         messageInfo: ''
      })

      onBeforeMount(() => {
         if (!localStorage.getItem("user_id")) {
          router.push("/login")
         }
      })

      onMounted(() => {
        getUserData()
      })

      const getUserData = async () => {
         
         state.isProcess = true;

         let userId = route.params.user_id;

         await firestore.collection('users')
            .doc( userId )
            .get().then(doc => {
               
               if(doc.exists){
                  
                  state.username = doc.data().username;
                  state.status = doc.data().status;
                  state.phoneNumber = doc.data().phone_number;
                  state.photo_url = doc.data().photo_url;
                  state.descriptions = doc.data().descriptions;
                  state.email = doc.data().email;
               
                  state.isProcess = false;
            }
         })
      }

      const back = () => {
         router.back()
      }
      return {
         ...toRefs(state),
         back
      }
   }
}
</script>