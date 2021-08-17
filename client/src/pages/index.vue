<template>
  <h1 class="text-3xl font-bold py-4">Available links</h1>
  <ul>
    <li v-for="(item, id) in affiliate" :key="id" class="py-2">
      <router-link :to="`/register?aff=${item.token}`" class="text-indigo-700 hover:underline">
        /register?aff={{ item.token }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      affiliate: [],
    };
  },
  async mounted() {
    const response = (await (await fetch('http://localhost:5000/affiliate')).json()).data;
    this.affiliate = response;
  },
};
</script>
