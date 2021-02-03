<template>
 <div class="flex group items-center cursor-pointer bg-whatsapp-dark-300 hover:bg-gray-800 h-16 px-2">
   <div class="bg-transparent  p-2">
      <img v-if="currentGroup.group_avatar" class="h-14 w-14 rounded-full object-cover" :src="currentGroup.group_avatar" alt="profile">
      <G v-else class="w-14 h-14"/>
   </div>
   <div class="flex-1 h-full leading-none flex justify-center flex-col pr-2 border-b border-gray-700 overflow-x-hidden">
      <div class="flex items-center justify-between">
         <span class="font-semibold text-lg text-gray-50"> {{ currentGroup.group_name }} </span>
         <span v-if="currentGroup.active" class="text-sm text-green-300">Active</span>
         <span v-else class="text-sm text-gray-400">NonActive</span>
      </div>
      <div class="flex items-center justify-between">
         <div class="hidden space-x-2 transition-transform duration-100 ease-linear transform translate-x-7 group-hover:translate-x-0">
            <div  v-if="inboxChat.entry > 0" class="py-1 px-1.5 bg-whatsapp-teal-green leading-none text-gray-900 rounded-full text-xs">
               <span class="p-0.5 w-full">{{ inboxChat.entry }}</span>
            </div>
            <button class="focus:outline-none text-transparent group-hover:text-gray-500">
               <svg class="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
               </svg>
            </button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import moment  from 'moment'
import G from './svg/G.vue'
export default {
  components: { G },
   props:{
      currentGroup: Object
   },
   setup () {
      const state = reactive({
         inboxChat:{
            time: moment(new Date()).format('LT'),
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