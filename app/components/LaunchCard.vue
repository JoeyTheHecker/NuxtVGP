<template>
  <v-card class="launch-card" elevation="2">
    <v-card-title class="text-h6 font-weight-bold">
      {{ missionName }}
    </v-card-title>

    <v-card-subtitle class="text-caption mb-2">
      {{ formattedDate }}
    </v-card-subtitle>

    <v-card-text class="card-body">
      <p><strong>Launch Site:</strong> {{ launchSite }}</p>
      <p><strong>Rocket:</strong> {{ rocketName }}</p>
      <p v-if="details"><strong>Details:</strong> {{ trimmedDetails }}</p>
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

const trimmedDetails = computed(() =>
  props.details && props.details.length > 180
    ? props.details.slice(0, 180) + '...'
    : props.details
)
</script>

<style scoped>
.launch-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-body p {
  margin: 0.35rem 0;
  line-height: 1.4;
}

.v-card-title,
.v-card-subtitle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
