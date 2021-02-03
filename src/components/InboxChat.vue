<template>
 <div class="flex group items-center cursor-pointer bg-whatsapp-dark-300 hover:bg-gray-800 h-16 px-2">
   <div class="bg-transparent  p-2">
      <img v-if="currentPeerUser.photo_url" class="h-14 w-14 rounded-full object-cover" :src="currentPeerUser.photo_url" alt="profile">
      <U v-else class="h-14 w-14"/>
   </div>
   <div class="flex-1 h-full leading-none flex justify-center flex-col pr-2 border-b border-gray-700 overflow-x-hidden">
      <div class="flex items-center justify-between">
         <span class="font-semibold text-lg text-gray-50"> {{ currentPeerUser.username }} </span>
         <span v-if="currentPeerUser.online " class="text-sm font-semibold text-green-300">Online</span>
         <span v-else class="text-sm font-semibold text-gray-400">Offline</span>
      </div>
   </div>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import U from './svg/U.vue'
export default {
  components: { U },
   props:{
      currentPeerUser: Object
   },
   setup () {
      const state = reactive({
         inboxChat:{
            imageAvatar: localStorage.getItem('photoUrl'),
            username: localStorage.getItem('username'),
            time: 'Online',
            entry: 3,
            message:'Test Message'
         }
      })

      return {
         ...toRefs(state),
      }
   }
}
</script>