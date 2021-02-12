<template>
  <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
  </div>
  <div class="h-screen mx-auto flex flex-col w-full max-w-screen-sm">
    <div class="flex fixed w-full top-0 max-w-screen-sm items-center justify-between px-4 bg-whatsapp-dark-300 text-gray-300 h-16 flex-shrink-0 shadow-lg z-40">
      <div class="inline-flex items-center space-x-2">
        <button @click="$router.back()" class="w-5 hover:text-gray-400 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <router-link :to="{name: 'group-description', params: {group_id: $route.params.group_id}}" class="inline-flex focus:outline-none items-center space-x-2">
          <img v-if="currentPeerGroupAvatar" class="w-9 h-9 object-cover rounded-full" :src="currentPeerGroupAvatar" alt="profile">
          <G v-else class="w-9 h-9"/>
          <div class="text-left">
            <p class="block text-lg font-semibold">{{ currentPeerGroupname }}</p>
            <p class="block text-sm -mt-1">Group</p>
          </div>
        </router-link>
      </div>
      <div class="inline-flex items-center space-x-4">
        <button class="hover:text-gray-400 focus:outline-none">
          <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </button>
        <button class="hover:text-gray-400 focus:outline-none">
          <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </button>
        <div class="relative md:cursor-pointer">
          <svg @click="toggleOption" class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
         <MenuOption v-click-away="toggleOption" v-if="option" @on-logout="logout" />
        </div>
      </div>
    </div>
    <div style="height:4.25rem" class="w-full"></div>
    <div class="flex-1 px-4 overflow-y-auto md:on-scrollbar bg-transparent">
      <ul class="space-y-1 text-gray-300 relative">
        <li class="text-center mb-2">
          <span class="py-1 px-2 text-xs font-semibold bg-whatsapp-dark-200 rounded shadow-lg text-gray-400">Let's broadcash message in {{currentPeerGroupname ? currentPeerGroupname : 'Your Friend' }}</span>
        </li>
        <li class="text-center">
          <p class="py-1 px-2 text-xs mb-2 bg-whatsapp-dark-200 rounded font-semibold shadow-lg text-whatsapp-yellow">
            <span class="inline-flex items-start"><svg class="w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg></span> Messages and calls are end-to-end encrypted. No one outside of this chat, not even whatsapp, can read or listen to them. Tap to learn more.
          </p>
        </li>
        <!-- Li Parent -->
        <li class="pb-10"> 
          <ul v-for="(message, idx) in listMessages" :key="idx" class="space-y-1 text-center text-gray-300">
            <div class="my-4">
              <span v-if="message.date == today" class="py-1 px-2 uppercase text-xs mx-auto bg-whatsapp-dark-200 rounded shadow-lg text-gray-400 leading-none font-semibold">TODAY</span>
              <span v-else-if="message.date == yesterday" class="py-1 px-2 uppercase text-xs mx-auto bg-whatsapp-dark-200 rounded shadow-lg text-gray-400 leading-none font-semibold">YESTERDAY</span>
              <span v-else class="py-1 px-2 uppercase text-xs mx-auto bg-whatsapp-dark-200 rounded shadow-lg text-gray-400 leading-none font-semibold">{{formatDate(message.date)}}</span>
            </div>
            <li v-for="chat in message.chats"  :key="chat.user_id" class="flex flex-col" :class="{'items-end': chat.idFrom === currentUserId , 'items-start': chat.idFrom !== currentUserId}">
              <Chat 
                :idx="idx++" 
                :chat="chat"
                :isOwner="chat.idFrom === currentUserId"
              />     
            </li>
          </ul>
        <div ref="bottom" class="mt-10"></div>
        </li>
      </ul>
    </div>
     <div class="fixed bottom-0 z-40 px-4 w-full max-w-screen-sm bg-whatsapp-dark-300 h-16 flex-shrink-0 flex items-center justify-between space-x-2">
         <div class="relative w-full">
           <input @keyup.enter="sendMessage(inputMessage)" v-model="inputMessage" placeholder="Type a message..." type="text" class="py-3 pl-10 pr-16 w-full text-gray-200 focus:outline-none rounded-full bg-gray-700 bg-opacity-50">
            <button @click="scrollToBottom" class="hover:text-gray-200 text-gray-400 text-opacity-80">
              <svg class="w-6 absolute top-3 left-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd" />
              </svg>
            </button>
           <button class="hover:text-gray-200 text-gray-500 text-opacity-80" >
              <svg class="w-6 absolute top-3 right-12 transform -rotate-90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
           </button>
            <button class="hover:text-gray-200 text-gray-400 text-opacity-80">
              <svg class="w-6 absolute top-3 right-2.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </button>
         </div>
          <a @click="sendMessage(inputMessage)" class="p-3 w-14 md:cursor-pointer focus:outline-none bg-whatsapp-teal-green rounded-full text-gray-300 hover:text-gray-200">
            <svg class="w-7 transform rotate-90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </a>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref, computed, onBeforeMount, onUpdated } from 'vue'
import moment from 'moment'
import Chat from '../components/Chat.vue'
import {auth,database, firestore} from '../service/firebase'
import { useRoute, useRouter } from 'vue-router'
import MenuOption from '../components/MenuOption.vue'
import Spinner from '../components/Spinner.vue'
import G from '../components/svg/G.vue'
import { useStore } from 'vuex'

export default {
  components: {
    Chat,
    MenuOption,
    Spinner,
    G
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const option = ref(false);
    const inputMessage = ref("");

    const state = reactive({
      currentUsername:  computed(()=>store.state.users.currentUser.username),
      currentUserId: localStorage.getItem('user_id'),
      currentUserColorCode:  computed(()=>store.state.users.currentUser.color_code),
      currentPeerGroupId: '',
      currentPeerGroupAvatar: '',
      currentPeerGroupname: '',
      listMessages: [],
      groupChatId: null,
      isProcess: false,
      initialState: false,
      today: computed(()=> moment().format('YYYY-MM-DD').toString()),
      yesterday: computed(()=> moment().subtract(1, 'days').format('YYYY-MM-DD')),
    })

     const logout = () => {
       const dbUser = firestore.collection("users");
         dbUser.doc(localStorage.getItem('user_id')).update({
            online: false,
            last_active: new Date().toISOString(),
         });

         store.dispatch('users/onUserSignout', state.currentUserId);
         
        auth.signOut().then(() => {
            
            localStorage.clear();
            router.push('/login');

         }).catch((error) => {
            console.log(error)
         });
      }
      

    const sendMessage = ( inputMessageValue ) => {
      
        // Check text message not null or blank
        if(inputMessageValue.trim() === ""){
          return;
        }
        
        // Generate Message Object
        const message = {
          username: state.currentUsername,
          isGroup: true,
          colorCode: state.currentUserColorCode,
          idFrom: state.currentUserId,
          timestamp: moment().valueOf().toString(),
          sendTime:formatTime(new Date()),
          content: inputMessageValue.trim()
        }

        // DB Object Init
        database
        .ref(`${state.groupChatId}/${moment().format('YYYY-MM-DD').toString()}`)
        .push(message);

        state.initialState = true;

        // Reset TextMessage
        inputMessage.value = "";
    }

    // Lifecicle Hook
    onMounted(() => {
        getDataMessages();
    })

    // Lifecicle Hook
    onBeforeMount(() => {
        if (!localStorage.getItem("user_id")) {
          router.push("/login")
        }
        getGroupDetail();
      })

    // Scrolldwon when chatroom updated
    onUpdated(()=> {
      if(state.initialState){
        scrollToBottom();
      }else{
        toBottom();
      }
    });

    const getGroupDetail = () => {
      let current_group_id = route.params.group_id;

      firestore.collection('groups')
          .doc(current_group_id)
          .get().then(group => {
            if(group.exists){
              state.currentPeerGroupId = group.data().group_id;
              state.currentPeerGroupname = group.data().group_name;
              state.currentPeerGroupAvatar = group.data().group_avatar;
            }
          })

    }

   const getDataMessages = async () => {
      state.isProcess = true;

      // Temp Current Room
      let groupChatId = `active_user_groups/G-${route.params.group_id}`;

      // Init DB Object
      const messageRefw = database.ref(groupChatId);
      
      // Get Reference
      let keyChek = await messageRefw.get()
    
      // Checking Conditon To Check Existing Room Data
      if (keyChek.exists()) {

          // Set Room To Current State
          state.groupChatId = groupChatId;
          retrieveMessagesFromDB(groupChatId);
      } else {
        
          // Set new Room
          state.groupChatId = `active_user_groups/G-${route.params.group_id}`;
          retrieveMessagesFromDB(state.groupChatId);
          
      }
    }

    const retrieveMessagesFromDB = ( group ) => {
        database.ref(group)
        .on('value', (snapshot) => {
        const data = snapshot.val();

        let messages=[]

        if(data!==null) {
          Object.keys(data).forEach(key => {
            const obejctMessage = {
              date: key,
              chats: data[key]
            }
            messages.push(obejctMessage)
          })
        }
        // Set ListMessage Data
        state.listMessages = messages;
        state.isProcess = false;
      });
    }

    const toggleOption = () => {
      return option.value = !option.value
    }

    const formatTime = (dateValue) => {
      return moment(dateValue).format('LT');
    }

    const formatDate = (dateValue) => {
      return moment(dateValue).format('LL');
    }

    const bottom = ref(null)

    const scrollToBottom = () => {
      bottom.value.scrollIntoView({behavior: 'smooth'})
    }

    const toBottom = () => {
      bottom.value.scrollIntoView();
    }

    return{
      ...toRefs(state),
      option,
      bottom,
      inputMessage,
      toggleOption,
      logout,
      sendMessage,
      formatDate,
      scrollToBottom
    }
  }
}
</script>
