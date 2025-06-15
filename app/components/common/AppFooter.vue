<template>
  <v-footer color="primary" class="text-center text-white py-4 " height="64" app>
    <v-container>
      <p class="mb-0 text-caption">
        © {{ currentYear }} SpaceX Launch Tracker — Built with ❤️ using Nuxt & Vuetify
      </p>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
