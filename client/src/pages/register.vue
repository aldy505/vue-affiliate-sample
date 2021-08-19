<template>
  <h1 class="text-3xl font-bold py-4">Register</h1>
  <form @submit.prevent="register">
    <div class="flex flex-col w-full">
      <div class="flex-1 py-2">
        <label for="name" class="py-1 block">Name:</label>
        <input type="text" v-model="form.name" class="bg-light-500 focus:bg-light-300 w-2/3 py-2 my-2" required />
      </div>
      <div class="flex-1 py-2">
        <label for="email" class="py-1 block">Email:</label>
        <input type="email" v-model="form.email" class="bg-light-500 focus:bg-light-300 w-2/3 py-2 my-2" required />
      </div>
      <div class="flex-1 py-2">
        <button type="submit" class="py-2 w-2/3 bg-blue-700 text-white">Register!</button>
      </div>
    </div>
  </form>
  <div v-if="success === 'true'" :key="success">
    <h2 class="text-lg font-bold py-4" >Registration success!</h2>
    <p class="text-base py-2">
      <router-link to="/users" class="text-indigo-700 hover:underline">Please continue to this link</router-link>
    </p>
  </div>
  <div v-else-if="success === 'false'">
    <h2 class="text-lg font-bold py-4" >Registration failed :(</h2>
    <p class="text-base py-2">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        affiliate: null,
        name: '',
        email: '',
      },
      success: '',
      error: '',
    };
  },
  async mounted() {
    if (this.$route?.query?.aff) {
      this.form.affiliate = this.$route.query.aff;
    }
  },
  beforeUnmount() {
    this.form = {affiliate: null, name: '', email: ''};
    this.success = '';
    this.error = '';
  },
  methods: {
    async register() {
      try {
        const {affiliate, name, email} = this.form;
        const response = await (await fetch(
          'http://localhost:5000/register',
          {
            method: 'POST',
            body: JSON.stringify({affiliate, name, email}),
            headers: {'content-type': 'application/json'},
          },
        )).json();
        if (response.message) {
          this.success = 'true';
          return;
        }

        this.success = 'false';
        this.error = 'please check network tab and logs';
      } catch (error) {
        this.success = 'false';
        this.error = error;
      }
    },
  },
};
</script>
