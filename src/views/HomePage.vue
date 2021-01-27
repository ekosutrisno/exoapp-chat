<template>
   <div>
      Home Page {{ count }}
      <button @click="increment">Test</button>
   </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const increment = () => {
      store.commit('increment');
    }

    return {
      count: computed(() => store.state.count),
      increment
    };
  },
};
</script>