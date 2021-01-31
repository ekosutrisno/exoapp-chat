<template>
 <div v-if="isProcess" class="absolute flex items-center justify-center inset-0 z-50 bg-opacity-50 bg-gray-900">
      <Spinner/>
</div>
 <div class="min-h-screen w-full absolute inset-0 max-w-screen-sm mx-auto flex flex-col justify-center items-center">
   <div class="h-full w-full p-4">
      <div @click="back" class="font-semibold md:cursor-pointer text-gray-300">
         <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
         </svg>
      </div>
      <div class="mx-auto mb-3 w-28 h-28 ring-2 ring-whatsapp-teal-green rounded-full">
         <img class="w-full h-full object-cover " src="https://avatars0.githubusercontent.com/u/51039205?s=460&u=cb1d242b6a9b13a3b6383e46b5410fafe471b63d&v=4" alt="exoapp-logo">
      </div>
      <h1 class="text-center text-lg font-semibold text-gray-300 mb-6">CREATE GROUP</h1>
      <h1 v-if="errorMessage" class="text-center text-sm font-semibold text-green-500 mb-6">{{errorMessage}}</h1>

      <div class="w-full flex flex-col">
         <input @keyup.enter="onCreateGroup" v-model="groupName" type="email" required class="py-3 px-6 text-lg text-gray-300 mb-6 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" placeholder="Group Name" />
         <textarea v-model="groupDescriptions" class="py-2 px-4 text-gray-300 mb-2 rounded bg-gray-800 focus:outline-none focus-within:ring-1 focus:ring-gray-700 placeholder-gray-400 placeholder-opacity-70" rows="4" placeholder="Group Descriptions"></textarea>
         <button @click="onCreateGroup" type="button" class="py-3 px-6 text-lg rounded hover:bg-opacity-80 font-semibold text-gray-300 bg-whatsapp-teal-green focus:outline-none">
            Create Group
         </button>
         <p class="text-left mt-6 text-sm text-gray-400">Hi <span class="font-semibold">{{ currentUsername }}</span>, you can add member of group. It should be noted that you can only invite the member who are also registered and use ExoApp.</p>
         
         <div class="mt-4 text-white">
            Member in Here
         </div>
         
         <p class="text-center mt-6 text-sm text-gray-400">From Eko Sutrisno &copy;{{new Date().getFullYear()}} All right reserved</p>
      </div>
   </div>
</div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import db from '../firebase';
import Spinner from '../components/Spinner.vue';

export default {
   components: { 
      Spinner
   },
   setup(){
      const store = useStore();
      const router = useRouter();

      const state = reactive({
         groupName: '',
         groupDescriptions: '',
         errorMessage: '',
         isProcess: false,
         user_id: computed(() => store.getters.getUserId),
         currentUsername: localStorage.getItem('username')
      })

      const onCreateGroup = () => {
         let groupId = state.groupName.toUpperCase().replace(" ","") + new Date().getTime();
         db.firestore()
            .collection('users')
            .doc(state.user_id)
            .collection('groups')
            .doc(groupId)
            .set({
               created_date: new Date().toDateString(),
               group_name: state.groupName,
               group_description: state.groupDescriptions,
               admin_create_id: state.user_id,
               group_avatar: '',
               group_id: groupId,
               active: true
            })
            .then(() =>{
              db.firestore().collection('users')
                  .where('user_id', '==', state.user_id )
                  .get().then( querySnapshot => {
                     querySnapshot.forEach(doc => {
                        db.firestore()
                           .collection('users')
                           .doc(state.user_id)
                           .collection('groups')
                           .doc(groupId)
                           .collection('members')
                           .doc(state.user_id)
                           .set(doc.data())
                           .then(() =>{
                              state.errorMessage ='Group Added!';
                           }).catch(e =>{
                              console.log(e)
                           })
                     })
                  })
            }).catch(e =>{
               console.log(e)
            })
      }

      // const addGroupMember = () => {
         
      // }

      const back = () => {
         router.back()
      }

      return {
         ...toRefs(state),
         onCreateGroup,
         back
      }
   }
}
</script>