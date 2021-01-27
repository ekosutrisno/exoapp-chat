<template>
   <div>
      Home Page {{ count }}
      <button @click="increment">Test</button>
   </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import firebase from '../firebase';
export default {
  setup() {
    const store = useStore();

    const increment = () => {
      store.commit("increment");
    };

    onMounted(() =>{
      insertData()
    })

    const insertData = () => {
      firebase.firestore().collection('exoapps')
      .add({
        username: 'Eko Sutrisno',
        timestamp: new Date().getTime()
      })
      .then(d => console.log('Data Added!',d.id))
      .catch(e => console.log(e))
    }

    return {
      count: computed(() => store.state.count),
      increment,
    };
  },
};
</script>