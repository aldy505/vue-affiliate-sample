<template>
  <h1 class="text-3xl font-bold py-4">Users Data</h1>
  <p class="text-indigo-700 pb-4">
    <router-link to="/" class="hover:underline pr-4">Home</router-link>
    &nbsp;
    <router-link to="/register" class="hover:underline">Register</router-link>
  </p>
  <div class="flex flex-col w-full">
    <div class="flex flex-row">
        <div class="flex-1 font-bold">ID</div>
        <div class="flex-1 font-bold">NAME</div>
        <div class="flex-1 font-bold">EMAIL</div>
        <div class="flex-1 font-bold">AFFILIATOR ID</div>
        <div class="flex-1 font-bold">AFFILIATOR TOKEN</div>
      </div>
    <div class="flex-1" v-for="user in users" :key="user.id">
      <div class="flex flex-row">
        <div class="flex-1">{{ user.id }}</div>
        <div class="flex-1">{{ user.name }}</div>
        <div class="flex-1">{{ user.email }}</div>
        <div class="flex-1">{{ user.affiliator }}</div>
        <div class="flex-1">{{ user.token }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    const response = (await (await fetch('http://localhost:5000/users')).json()).data;
    this.users = response;
  },
};
</script>
