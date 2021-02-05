<template>
 <div class="absolute z-50 py-2 w-44 h-auto top-1 right-1 rounded bg-whatsapp-dark-100 ring-1 ring-whatsapp-dark-200 shadow-xl">
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/profile'}">Profile</router-link>
   <!-- <button @click="onRefreshContact" class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full focus:outline-none">Refresh Contact</button> -->
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/invite-friend'}">Invite friend</router-link>
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/create-group'}">New group</router-link>
   <p class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/'}">Settings</p>
   <router-link class="inline-flex justify-start items-start pl-4 font-semibold float-left py-2 hover:bg-gray-700 w-full" :to="{path:'/login'}" @click="$emit('on-logout')">Logout</router-link>
   <p class="inline-flex justify-start text-sm items-start pl-4 font-semibold float-left py-2 text-gray-400 w-full" >App v0.0.1-RC-1</p>
 </div>
</template>
<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
export default {
  setup(_, { emit }){
    const store = useStore();
    const state = reactive({
      user_id: computed(() => store.getters.getUserId)
    })

    const onRefreshContact = () => {
      store.dispatch('setListFriend',state.user_id);
      emit('on-refresh');
    }

    return {
      onRefreshContact
    }

  }
}
</script>