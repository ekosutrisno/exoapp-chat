<template>
 <div class="absolute py-2 w-44 h-auto top-1 right-1 rounded bg-whatsapp-dark-100 ring-1 ring-whatsapp-dark-200 shadow-xl">
   <router-link class="inline-flex justify-start items-start pl-4 font-medium float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/profile'}">Profile</router-link>
   <router-link class="inline-flex justify-start items-start pl-4 font-medium float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/invite-friend'}">Invite friend</router-link>
   <p class="inline-flex justify-start items-start pl-4 font-medium float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/'}">New group</p>
   <p class="inline-flex justify-start items-start pl-4 font-medium float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/'}">Settings</p>
   <router-link class="inline-flex justify-start items-start pl-4 font-medium float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/login'}" @click="$emit('on-logout')">Logout</router-link>
   <p class="inline-flex justify-start text-sm items-start pl-4 font-medium float-left py-2 text-gray-400 w-full" >App v0.0.1-Beta</p>
 </div>
</template>