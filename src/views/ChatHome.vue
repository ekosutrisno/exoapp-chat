<template>
   <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
   </div>
   <div class="bg-whatsapp-dark-300 h-screen w-full max-w-screen-sm mx-auto flex flex-col">
      <div class="h-28 fixed top-0 w-full max-w-screen-sm flex-shrink-0 shadow-lg z-50 p-4 bg-gray-800 text-gray-300">
         <div class="flex items-start justify-between">
            <div class="inline-flex items-center space-x-2">
            <button class="w-5 font-medium text-2xl hover:text-gray-400 focus:outline-none">
               ExoApp<sup v-if="isOnline.valueOf()" :class="{'text-green-400': isOnline.valueOf()}">&bull;</sup>
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
                <MenuOption v-click-away="toggleOption" v-if="option" @on-logout="onLogout" @on-refresh="toggleOption"/>
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
             <button 
               v-for="nav in togle" 
               :key="nav.id"
               :class="{'border-b-2': currentTab === nav.text}" 
               @click="switchToggle(nav.id, nav.text)"
               class="py-2 text-lg w-24 font-semibold border-whatsapp-teal-green focus:outline-none">
                <div> {{nav.text}} </div>
            </button>
         </div>
      </div>
      <div class="w-full h-28"></div>
      <div class="flex-1 pb-2 flex flex-col overflow-y-auto on-scrollbar">
         <ul v-show="isChat">
               <li v-for="(user, i) in friends" :key="i" >
                  <InboxChat class="nv-transition" @click="letChat(user)" :currentPeerUser="user"/>
               </li>

               <li v-if="friends.length === 0" class="text-gray-300 text-center py-4">
                  <h1 class="mb-6">You No have a Friend!</h1>
                  <div class="inline-flex space-x-2">
                     <button @click="setFriends" class="py-3 px-4 items-center space-x-2 rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-dark-200 ring-1 ring-whatsapp-dark-100 focus:outline-none">
                        <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg>
                     </button>
                     <router-link  to="/invite-friend" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                        Invite Friend
                     </router-link>
                  </div>
               </li>
            </ul>
            <ul v-show="isGroup">
               <li v-for="(group, i) in groups" :key="i">
                  <InboxGroup class="nv-transition"  @click="letChatGroup(group)" :currentGroup="group"/>
               </li>
               <li v-if="groups.length === 0" class="text-gray-300 text-center py-4">
                  <h1 class="mb-6">Group Empty!</h1>
                  <router-link to="/create-group" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
                     Create Group
                  </router-link>
               </li>
            </ul>
      </div>

   </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {firestore, auth} from '../service/firebase'
import InboxChat from '../components/InboxChat.vue'
import InboxGroup from '../components/InboxGroup.vue'
import MenuOption from '../components/MenuOption.vue'
import Spinner from '../components/Spinner.vue'

export default {
   components: {InboxChat, InboxGroup, Spinner, MenuOption},
   setup () {
      const router = useRouter();
      const store = useStore();

      const state = reactive({
         currentUserId: computed(() => store.getters.getUserId),
         friends: [],
         groups: computed(() => store.state.groups.groups),
         me: computed(() => store.state.users.currentUser) ,
         isProcess: false,
         isChat: true,
         option : false,
         isOnline: navigator.onLine.valueOf(),
         isGroup: false,
         currentTab:'CHATS',
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

      const refreshCurrentUser = async ()=>{
         await store.dispatch('setCurrentUser', state.currentUserId);

      }

      onMounted(() => {
         refreshCurrentUser();
         getFriendList();
         getGroupList();
         isLogin()
      })

      onBeforeMount(() =>{
         if(!localStorage.getItem('user_id'))
            router.push('/login')
      })

      const toggleOption = () => {
         return state.option = !state.option
      }

      const onLogout = () => {
         store.dispatch('onUserSignout', state.currentUserId);

         auth.signOut().then(() => {
            
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

         const data = await firestore.collection('users')
                        .doc(state.currentUserId)
                        .collection('friends')
                        .get();

         if (data.docs.length > 0) {
            let listUser = [];
            listUser = [...data.docs]

            listUser.forEach((item, index) => {
               firestore.collection('users')
                  .doc( item.id )
                  .get().then(doc => {
                     
                     if(doc.exists){
                        state.friends.push({
                           key: index,
                           online: doc.data().online,
                           last_active: doc.data().last_active,
                           user_id: doc.data().user_id,
                           username: doc.data().username,
                           photo_url: doc.data().photo_url,
                           descriptions: doc.data().descriptions,
                        })
                     }
                  })
            })
         }
         
         state.isProcess = false;

         // Set to Store 
         await store.dispatch('setListFriend', state.currentUserId);

      }
      const setFriends = async () => {
         state.friends = computed(() => store.state.friends.friends);
      }

      const getGroupList = async () => {
        await store.dispatch('setListGroup', state.currentUserId)
      }

      const letChat = ( peerUser ) => {
         router.push({
            name: 'chat-room', 
            params: {user_peer_id: peerUser.user_id}
         })
      }

      const isLogin = () => {
         store.dispatch('onUserSigin', state.currentUserId)
      }

      const letChatGroup = ( group ) => {
         router.push({ 
            name: 'group-chat-room', 
            params: { group_id: group.group_id } 
         })
      }

      const switchToggle = ( id, text ) => {
            state.currentTab = text;
           
           if(id === 1){
               state.isGroup = false;
               state.isChat = true;
            }else if(id === 2){
               state.isGroup = true;
               state.isChat = false;
            }
      }

      return{
         ...toRefs(state),
         onLogout,
         setFriends,
         getFriendList,
         toggleOption,
         letChat,
         letChatGroup,
         switchToggle
      }
   }
}
</script>