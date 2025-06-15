<template>
  <v-container class="py-16 text-center">
    <!-- Hero Section -->
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <transition name="fade-slide">
			<h1 v-if="show" class="text-h2 font-weight-bold mb-4">
				Welcome to SpaceX Explorer 🚀
			</h1>
		</transition>
        <p class="text-subtitle-1 mb-6">
          Dive into the universe of SpaceX missions, rockets, and launches. Explore historical data, view rocket specs, and save your favorite crafts.
        </p>
        <v-btn to="/launches" color="primary" size="large" class="mr-4">
          View Launches
        </v-btn>
        <v-btn to="/favorites" color="secondary" size="large">
          Favorites
        </v-btn>
      </v-col>
    </v-row>

    <!-- Feature Cards -->
    <v-row class="mt-16" dense>
      <v-col cols="12" md="4">
        <v-card elevation="4" class="pa-6 rounded-xl">
          <v-icon color="primary" size="40">mdi-rocket-launch</v-icon>
          <h3 class="text-h6 font-weight-bold mt-4 mb-2">Launch History</h3>
          <p>Explore past launches with mission details, rocket data, and launch sites.</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="4" class="pa-6 rounded-xl">
          <v-icon color="primary" size="40">mdi-rocket</v-icon>
          <h3 class="text-h6 font-weight-bold mt-4 mb-2">Rocket Specs</h3>
          <p>Get technical details on each SpaceX rocket including dimensions, mass, and stage info.</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="4" class="pa-6 rounded-xl">
          <v-icon color="primary" size="40">mdi-star-outline</v-icon>
          <h3 class="text-h6 font-weight-bold mt-4 mb-2">Favorites</h3>
          <p>Bookmark your favorite rockets to revisit anytime.</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 300)
})
</script>

<style scoped>
.fade-slide-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

<style scoped>
.text-primary {
  color: #1976D2;
}
</style>
