<template>
 <div class="flex group items-center cursor-pointer bg-whatsapp-dark-300 hover:bg-gray-800 h-16 px-2">
   <div class="bg-transparent  p-2">
      <img class="h-14 w-14 rounded-full object-cover" :src="currentPeerUser.photo_url ? currentPeerUser.photo_url : 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-128.png'" alt="profile">
   </div>
   <div class="flex-1 h-full leading-none flex justify-center flex-col pr-2 border-b border-gray-700 overflow-x-hidden">
      <div class="flex items-center justify-between">
         <span class="font-semibold text-lg text-gray-50"> {{ currentPeerUser.username }} </span>
         <span class="text-sm text-green-500"> {{ inboxChat.time }} </span>
      </div>
   </div>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
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