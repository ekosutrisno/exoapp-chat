<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="bg-whatsapp-dark-300 h-screen w-full max-w-sm mx-auto flex flex-col">
      <div class="h-28 fixed top-0 w-full max-w-sm flex-shrink-0 shadow-lg z-50 p-4 bg-gray-800 text-gray-300">
         <div class="flex items-start justify-between">
            <div class="inline-flex items-center space-x-2">
            <button class="w-5 font-medium text-2xl hover:text-gray-400 focus:outline-none">
               ExoApp
            </button>
            </div>
            <div class="inline-flex items-center space-x-4">
            <button class="hover:text-gray-400 focus:outline-none">
               <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>
            <div class="focus:outline-none">
               <svg @click="toggleOption" class="w-7 md:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
               </svg>
                <MenuOption v-click-away="toggleOption" v-if="option" @on-logout="onLogout" />
            </div>
            </div>
         </div>
         <div class="flex items-center mt-4">
             <button class="hover:text-gray-400 w-10 focus:outline-none">
                <svg class="w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
            </button>
             <button v-for="nav in togle" :key="nav.id" class="py-2 text-lg hover:text-gray-400 w-24 font-semibold border-whatsapp-teal-green focus:outline-none focus:text-whatsapp-teal-green">
                <div> {{nav.text}} </div>
            </button>
         </div>
      </div>
      <div class="flex-1 pb-2 pt-28 flex flex-col overflow-y-auto on-scrollbar">
         <ul>
            <li v-for="(user, i) in friends" :key="i">
               <InboxChat  @click="letChat(user)" :currentPeerUser="user"/>
            </li>
            <li v-if="friends.length === 0" class="text-gray-300 text-center py-4">
               <h1 class="mb-6">Yo No have a Friend!</h1>
               <router-link to="/invite-friend" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                  Invite Friend
               </router-link>
            </li>
         </ul>
      </div>

   </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue'
import db from '../firebase'
import InboxChat from '../components/InboxChat.vue'
import MenuOption from '../components/MenuOption.vue'
import Spinner from '../components/Spinner.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: { InboxChat, Spinner, MenuOption },
      setup () {
         const option = ref(false);
         const router = useRouter();
         const store = useStore();

         const state = reactive({
            currentPeerUser: null,
            currentUserId: computed(() => store.getters.getUserId),
            friends: [],
            groups:[],
            isProcess: false,
            togle: [
               {
                  id: 1,
                  text: 'CHATS'
               },
               {
                  id: 2,
                  text: 'GROUPS'
               },
            ]
         })

         onMounted(() =>{ 
            getFriendList();
         })

         onBeforeMount(() =>{
            if(!localStorage.getItem('user_id'))
               router.push('/login')
         })

         const toggleOption = () => {
            return option.value = !option.value
         }

         const onLogout = () => {
            db.auth().signOut().then(() => {
               localStorage.clear();
               router.push('/login');
            }).catch((error) => {
               console.log(error)
            });
         }

         const getFriendList = async () => {

            state.isProcess = true;
            
            setTimeout(() => {
               state.isProcess = false;
            }, 5000);

            const data = await db.firestore().collection('users')
            .doc(state.currentUserId)
            .collection('friends')
            .get();

            if (data.docs.length > 0) {
               let listUser = [];
               listUser = [...data.docs]
               listUser.forEach((item, index) => {
                  
                  if(item.data().user_id !== state.currentUserId){
                     state.friends.push({
                        key: index,
                        documentKey: item.id,
                        id: item.data().user_id,
                        username: item.data().username,
                        photo_url: item.data().photo_url,
                        descriptions: item.data().descriptions,
                     })
                  }

               })
            }
            state.isProcess = false;
         }

         const letChat = ( peerUser ) => {
            state.currentPeerUser = peerUser;
            localStorage.setItem('peer_user_id', peerUser.id);
            localStorage.setItem('peer_photo_url', peerUser.photo_url);
            localStorage.setItem('peer_username', peerUser.username);
            router.push("/chat-room")
         }

         return{
            ...toRefs(state),
            option,
            onLogout,
            toggleOption,
            letChat
         }
      }
   }
</script>