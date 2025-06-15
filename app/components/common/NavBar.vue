<template>
  <v-app-bar color="primary" dark app>
    <v-container class="d-flex align-center justify-space-between">
      <!-- Left: Icon + Title -->
      <div class="d-flex align-center">
        <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />
        <v-icon class="ml-2 mr-2">mdi-rocket-launch</v-icon>
        <span class="text-h6 font-weight-medium">SpaceX</span>
      </div>

      <!-- Right: Nav Links (Desktop) -->
      <div class="d-none d-md-flex align-center">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-white text-decoration-none mx-2"
          :class="{ 'font-weight-bold': route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer v-model="drawer" app temporary class="d-md-none">
    <v-list nav dense>
      <v-list-item
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        @click="drawer = false"
        :active="route.path === link.to"
        link
      >
        <v-list-item-title>{{ link.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const drawer = ref(false)
const route = useRoute()

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/launches', label: 'LAUNCHES' },
  { to: '/favorites', label: 'FAVORITES' },
]
</script>
