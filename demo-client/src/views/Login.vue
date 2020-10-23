<template>
  <div class="flex justify-center h-full">
    <div class="mt-5">
      <form>
         <input v-model="user.username" placeholder="Username" type="text" class="block mt-2 p-2 bg-gray-200">
          <input v-model="user.password" placeholder="Password" type="password" class="block mt-2 p-2 bg-gray-200">
          <input @click.prevent='loginUser' class="p-2 mt-2 bg-red-500 block w-full" type="submit" value="Log In">
      </form>
     
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
      
    }
  },

  methods: {
    async loginUser() {
      try {
      const res = await axios.post('/api/auth', this.user) 
      this.$store.commit('SET_TOKEN', res.data.token)
      this.$router.push('/app')
      }catch(e) {
        console.log(e)
      }
    }
  }
};
</script>
