<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import _ from 'underscore'
</script>

<template>
  <v-app>
    <v-app-bar title="ShoppingList" color="blue" v-if="showToolbar">
      <v-btn
        prepend-icon="mdi-logout"
        color="white"
        v-on:click="logout"
      >
      Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="pa-4">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        token: localStorage.getItem('token')
      }
    },
    mounted() {
      
    },
    computed: {
      showToolbar() {
        return !(_.contains(['/login', '/register'], this.$router.currentRoute.value.path))
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
</script>