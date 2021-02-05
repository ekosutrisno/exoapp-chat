<template>
   <div class="h-auto group max-w-xs text-sm rounded-lg relative shadow-lg text-gray-300" 
   :class="{
      'rounded-bl-none ':idx == 0 && isOwner == false,
      'bg-whatsapp-dark-200': isOwner == false,
      'rounded-br-none ':idx == 0 && isOwner,
      'bg-whatsapp-teal-green ': isOwner,
   }"
   >

      <div
         class="absolute bottom-0 arrow-down"
         :class="{
            '-left-2': isOwner == false,
            'arrow-down-gray' : isOwner == false,
            '-right-2': isOwner,
            'arrow-down-green' : isOwner,
         }"
      >
      </div>
      
      <div class="text-xs px-2 pt-2 text-left font-semibold" v-if="isOwner == false && chat.isGroup"> 
         <span :style="{color: chat.colorCode ? chat.colorCode : '#eaff8f'}">
            {{chat.username}}
         </span>
      </div>
     
      <div :class="[isOwner == false && chat.isGroup ? 'px-2 pb-2': 'p-1.5']" >
         <p class="w-full text-left font-semibold">{{chat.content}} </p>
         <span class="inline-flex items-center float-right pb-1">
               <span style="font-size: 0.675rem;line-height: 1rem;" class="text-gray-400 font-semibold">  {{chat.sendTime}} </span>
               <span v-if="isOwner" class="ml-0.5 text-whatsapp-blue ">
                  <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
               </span>
         </span>
      </div>
  </div>
</template>

<script>
export default {
   props:{
      idx: Number,
      chat: Object,
      isOwner: Boolean
   }
}
</script>

<style scoped>
   .arrow-down-gray {
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-radius: 10px;
      border-bottom: 10px solid #262D31
   }
   .arrow-down-green {
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-radius: 10px;
      border-bottom: 10px solid #056162;
   }
</style>