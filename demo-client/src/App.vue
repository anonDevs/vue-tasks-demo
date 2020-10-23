<template>
  <div id="app">
    <div class="p-4 bg-green-200" id="nav">
      <router-link class="mr-4" to="/">Login</router-link>
      <router-link class="mr-4" to="/app">App</router-link>
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style></style>
