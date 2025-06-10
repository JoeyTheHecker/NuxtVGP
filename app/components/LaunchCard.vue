<template>
  <v-card class="mb-4" elevation="2">
    <v-card-title>{{ missionName }}</v-card-title>
    <v-card-subtitle>{{ formattedDate }}</v-card-subtitle>
    <v-card-text>
      <p><strong>Launch Site:</strong> {{ launchSite }}</p>
      <p><strong>Rocket:</strong> {{ rocketName }}</p>
      <p v-if="details"><strong>Details:</strong> {{ details }}</p>
      <p v-else><em>No details available.</em></p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
  missionName: string
  launchDateUtc: string
  launchSite: string
  rocketName: string
  details?: string
}>()

const formattedDate = computed(() =>
  new Date(props.launchDateUtc).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
)
</script>

<style scoped>
.v-card-text p {
  margin: 0.5rem 0;
}
</style>
