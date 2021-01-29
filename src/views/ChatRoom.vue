<template>
  <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
  </div>
  <div class="h-screen mx-auto flex flex-col w-full max-w-sm">
    <div class="flex fixed w-full top-0 max-w-sm items-center justify-between px-4 bg-whatsapp-dark-300 text-gray-300 h-16 flex-shrink-0 shadow-lg z-40">
      <div class="inline-flex items-center space-x-2">
        <router-link to="/chat-home" class="w-5 hover:text-gray-400 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
        <button class="inline-flex focus:outline-none items-center space-x-2">
          <img class="w-9 h-9 object-cover rounded-full" :src="currentPeerURL ? currentPeerURL : 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-128.png'" alt="profile">
          <div class="text-left">
            <p class="block text-lg">{{ currentPeerUsername }}</p>
            <p class="block text-sm -mt-1">online</p>
          </div>
        </button>
      </div>
      <div class="inline-flex items-center space-x-4">
        <button class="hover:text-gray-400 focus:outline-none">
          <svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button class="hover:text-gray-400 focus:outline-none">
          <svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <div class="relative md:cursor-pointer">
          <svg @click="toggleOption" class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
         <MenuOption v-click-away="toggleOption" v-if="option" @on-logout="logout" />
        </div>
      </div>
    </div>
    <div class="flex-1 px-4 pt-20 overflow-y-auto md:on-scrollbar bg-transparent">
      <ul class="space-y-1 text-gray-300 relative">
        <li class="text-center mb-2">
          <span class="py-1 px-2 text-xs bg-whatsapp-dark-200 rounded-md shadow-lg text-gray-400">Let's say hay with {{currentPeerUsername ? currentPeerUsername : 'Your Friend' }}</span>
        </li>
        <li class="text-center">
          <p class="py-1 px-2 text-xs mb-2 bg-whatsapp-dark-200 rounded-md shadow-lg text-yellow-400">
            <span class="inline-flex items-start"><svg class="w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg></span> Messages and calls are end-to-end encrypted. No one outside of this chat, not even whatsapp, can read or listen to them. Tap to learn more.
          </p>
        </li>
        <!-- Li Parent -->
        <li class="pb-10"> 
          <ul v-for="(message, idx) in listMessages" :key="idx" class="space-y-1 text-center text-gray-300">
            <div class="my-4">
              <span class="py-1 px-2 uppercase text-xs mx-auto bg-whatsapp-dark-100 rounded-md shadow-lg text-gray-400">{{ message.date == toDay ? 'TODAY': formatDate(message.date)}}</span>
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
     <div class="fixed bottom-0 z-40 px-4 w-full max-w-sm bg-whatsapp-dark-300 h-16 flex-shrink-0 flex items-center justify-between space-x-2">
         <div class="relative w-full">
           <input @keyup.enter="sendMessage(inputMessage)" v-model="inputMessage" placeholder="Type a message..." type="text" class="py-3 pl-10 pr-16 w-full text-gray-200 focus:outline-none rounded-full bg-gray-700 bg-opacity-50">
            <button @click="scrollToBottom" class="hover:text-gray-200 text-gray-400 text-opacity-80">
              <svg class="w-6 absolute top-3 left-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
           <button class="hover:text-gray-200 text-gray-400 text-opacity-80" >
              <svg class="w-6 absolute top-3 right-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
           </button>
            <button class="hover:text-gray-200 text-gray-400 text-opacity-80">
              <svg class="w-6 absolute top-3 right-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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
import db from '../firebase'
import { useRouter } from 'vue-router'
import MenuOption from '../components/MenuOption.vue'
import Spinner from '../components/Spinner.vue'

export default {
  components: {
    Chat,
    MenuOption,
    Spinner
  },
  setup () {
    const router = useRouter()

    const option = ref(false);
    const inputMessage = ref("");

    const state = reactive({
      currentUsername: localStorage.getItem('username'),
      currentUserId: localStorage.getItem('user_id'),
      currentPhotoUrl: localStorage.getItem('photo_url'),
      currentPeerUserId: localStorage.getItem('peer_user_id'),
      currentPeerURL: localStorage.getItem('peer_photo_url'),
      currentPeerUsername: localStorage.getItem('peer_username'),
      currentPeerUser: null,
      listMessages: [],
      groupChatId: null,
      isProcess: false,
      toDay: computed(()=> moment().format('YYYY-MM-DD').toString())
    })

     const logout = () => {
        db.auth().signOut().then(() => {
            router.push('/login');
            localStorage.clear();
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
          isGroup: false,
          idFrom: state.currentUserId,
          idTo: state.currentPeerUserId,
          timestamp: moment().valueOf().toString(),
          sendTime:formatTime(new Date()),
          content: inputMessageValue.trim()
        }

        // DB Object Init
        const messageRef = db.database().ref(state.groupChatId);

        // Save and Insert Data To Realtime DB Firebase
        messageRef.child(moment()
          .format('YYYY-MM-DD').toString())
          .push(message)

        // Reset TextMessage
        inputMessage.value = ""
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
      })

    // Scrolldwon when chatroom updated
    onUpdated(()=> scrollToBottom())

   const getDataMessages = async () => {
      state.isProcess = true;
      autoStopSpinner();

      // Temp Current Room
      let groupChatId = `${state.currentPeerUserId}+${state.currentUserId}`;

      // Init DB Object
      const messageRefw = db.database().ref(groupChatId);
      
      // Get Reference
      let keyChek = await messageRefw.get()
    
      // Checking Conditon To Check Existing Room Data
      if (keyChek.exists()) {

          // Set Room To Current State
          state.groupChatId = groupChatId;
          retrieveMessagesFromDB(groupChatId);

      } else {
        
          // Set new Room
          state.groupChatId =  `${state.currentUserId}+${state.currentPeerUserId}`;
          retrieveMessagesFromDB(state.groupChatId);
          
      }

    }

    const retrieveMessagesFromDB = ( group ) => {
        db.database().ref(group).on('value', (snapshot) => {
        const data=snapshot.val()

        let messages=[]

        if(data!==null) {
          Object.keys(data).forEach(key => {
            const obejctMessage={
              date: key,
              chats: data[key]
            }
            messages.push(obejctMessage)
          })
        }
        // Set ListMessage Data
        state.listMessages=messages
        state.isProcess=false
      });
    }

    const toggleOption = () => {
      return option.value = !option.value
    }

    const autoStopSpinner = () => {
         setTimeout(() => {
            state.isProcess = false;
         }, 10000);
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
