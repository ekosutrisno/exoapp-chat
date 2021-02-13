<template>
 <div class="absolute z-50 py-2 w-44 h-auto top-1 right-1 rounded bg-whatsapp-dark-100 ring-1 ring-whatsapp-dark-200 shadow-xl">
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/profile'}">Profile</router-link>
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/invite-friend'}">Invite friend</router-link>
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/create-group'}">New group</router-link>
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/settings'}">Settings</router-link>
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/login'}" @click="$emit('on-logout')">Logout</router-link>
   <p class="inline-flex justify-start text-sm items-start pl-4 font-semibold float-left py-2 text-gray-400 w-full" >App version v1.0.0</p>
 </div>
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
export default {
  setup(_, { emit }){
    const store = useStore();
    const state = reactive({
      user_id: localStorage.getItem('user_id')
    })

    const onRefreshContact = () => {
      store.dispatch('friends/setListFriend',state.user_id);
      emit('on-refresh');
    }

    return {
      onRefreshContact
    }

  }
}
</script>