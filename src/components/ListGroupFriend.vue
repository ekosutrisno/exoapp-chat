<template>
 <div class="flex group items-center cursor-pointer bg-whatsapp-dark-300 hover:bg-gray-800 h-16 px-2">
   <div class="bg-transparent  p-2">
      <img class="h-14 w-14 rounded-full object-cover" :src="currentPeerUser.photo_url ? currentPeerUser.photo_url : 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/avocado_scream_avatar_food-128.png'" alt="profile">
   </div>
   <div class="flex-1 h-full leading-none flex justify-center flex-col pr-2 border-b border-gray-700 overflow-x-hidden">
      <div class="flex items-center justify-between">
         <span class="font-semibold text-lg text-gray-50"> {{ currentPeerUser.username }} </span>
         <button @click="$emit('add-member')" class="text-xs p-1 px-2 inline-flex items-center focus:outline-none bg-whatsapp-teal-green text-gray-200 rounded-md hover:bg-opacity-70">
            <span>Add</span>
         </button>
      </div>
   </div>
</div>
</template>

<script>
export default {
   props:{
      currentPeerUser: Object,
   }
}
</script>