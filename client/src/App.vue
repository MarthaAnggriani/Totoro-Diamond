<script setup>
import { RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue"
import DiamondPage from "./views/DiamondPage.vue"
</script>

<template>
  <div data-theme="dark">
    <Navbar />
    <!-- <HomePage /> -->
    <RouterView />
  </div>
</template>

