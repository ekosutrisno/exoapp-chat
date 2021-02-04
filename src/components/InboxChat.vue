<template>
 <div class="flex group items-center cursor-pointer bg-whatsapp-dark-300 hover:bg-gray-800 h-16 px-2">
   <div class="bg-transparent  p-2">
      <img v-if="currentPeerUser.photo_url" class="h-14 w-14 rounded-full object-cover" :src="currentPeerUser.photo_url" alt="profile">
      <U v-else class="h-14 w-14"/>
   </div>
   <div class="flex-1 h-full leading-none flex justify-center flex-col pr-2 border-b border-gray-700 overflow-x-hidden">
      <div class="flex items-center justify-between">
         <div class="font-semibold text-lg text-gray-50"> {{ currentPeerUser.username }} </div>
         <div v-if="currentPeerUser.online " class="text-sm font-semibold text-green-300">Online</div>
         <div v-else class="font-semibold text-right">
            <span class="block text-sm text-gray-400 ">Offline</span>
            <span v-if="currentPeerUser.last_active" class="block text-xs text-gray-500">{{lastSeen(currentPeerUser.last_active)}}</span>
            <span v-else class="block text-xs text-gray-500">Off</span>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import U from './svg/U.vue'
import moment from 'moment';
export default {
  components: { U },
   props:{
      currentPeerUser: Object
   },
   setup () {
      const lastSeen = ( last_seen ) => {
         return moment(last_seen).fromNow();
      }

      return {
         lastSeen
      }
   }
}
</script>