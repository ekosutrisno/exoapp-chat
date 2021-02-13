<template>
 <div class="flex group items-center cursor-pointer bg-whatsapp-dark-300 hover:bg-gray-800 h-16 px-2">
   <div class="bg-transparent  p-2">
   <img v-if="currentPeerUser.photo_url" class="h-14 w-14 rounded-full object-cover" :src="currentPeerUser.photo_url" alt="profile">
   <U v-else class="h-14 w-14"/>
   </div>
   <div class="flex-1 h-full leading-none flex justify-center flex-col pr-2 border-b border-gray-700 overflow-x-hidden">
      <div class="flex items-center justify-between">
         <span class="font-semibold text-lg text-gray-50"> {{ currentPeerUser.username }} </span>
         <button v-if="currentPeerUser.is_admin" class="text-xs mr-2 py-1 px-2 inline-flex items-center focus:outline-none bg-green-500 text-gray-200 rounded-md">
            <span>Admin</span>
         </button>
         <button v-else @click="$emit('remove-member')" class="text-sm py-2 px-3 inline-flex items-center focus:outline-none bg-whatsapp-teal-green text-gray-200 rounded-md hover:bg-opacity-70">
            <span>Remove</span>
         </button>
      </div>
   </div>
</div>
</template>

<script>
import {  reactive, toRefs } from 'vue'
import U from './svg/U.vue';
export default {
  components: { U },
   props:{
      currentPeerUser: Object
   },
   setup ( ) {

      const state = reactive({
         currentUserId: localStorage.getItem('user_id'),
      })

      return {
         ...toRefs(state)
      }
   }
}
</script>