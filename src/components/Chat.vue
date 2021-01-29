<template>
   <div class="h-auto group max-w-xs text-sm rounded-lg relative shadow-lg text-gray-300" :class="{
      'rounded-tl-none ':idx == 0 && isOwner == false,
      'bg-whatsapp-dark-200': isOwner == false,
      'rounded-br-none ':idx == 0 && isOwner,
      'bg-whatsapp-teal-green-dark ': isOwner,
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
      ></div>
      <div class="p-2">
         <span class="text-xs -mb-1.5 text-yellow-400 text-left" v-if="isOwner == false && chat.isGroup == true"> {{chat.username}} </span>
         <p class="w-full text-left"> {{chat.content}} </p>
         <div class="inline-flex items-center float-right pb-1">
               <span class="text-xs text-gray-300 text-opacity-75">  {{chat.sendTime}} </span>
               <span v-if="isOwner" class="ml-0.5 text-whatsapp-blue">
                  <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg class="w-4 -mt-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
               </span>
         </div>
      </div>
  </div>
</template>

<script>
export default {
   props:{
      idx: Number,
      chat: Object,
      isOwner: Boolean
   },
   setup(){

      const userNameFormat = (val) => {
         let username = val.replace(" ","_").toLowerCase();
         return `@${username}`
      }

      return{
         userNameFormat
      }
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
      border-bottom: 10px solid #2A2F32
   }
   .arrow-down-green {
      width: 0; 
      height: 0; 
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-radius: 10px;
      border-bottom: 10px solid #075E54
   }
</style>