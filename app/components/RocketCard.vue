<template>
  <v-card class="pa-4 mb-4 rounded-xl elevation-2">
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-h6">{{ rocketName }}</span>

      <v-btn icon @click="toggleFavorite">
        <v-icon color="yellow darken-2">
          {{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <p class="mb-2">
        <strong>Description:</strong><br />
        {{ shortDescription }}
      </p>

      <v-row dense>
        <v-col cols="12" sm="6">
          <strong>First Flight:</strong> {{ firstFlight }}
        </v-col>
        <v-col cols="12" sm="6" v-if="height">
          <strong>Height:</strong> {{ height.meters }} m
        </v-col>
        <v-col cols="12" sm="6" v-if="diameter">
          <strong>Diameter:</strong> {{ diameter.meters }} m
        </v-col>
        <v-col cols="12" sm="6" v-if="mass">
          <strong>Mass:</strong> {{ mass.kg }} kg
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <NuxtLink :to="`/rockets/${rocketId}`" class="text-decoration-none">
        <v-btn color="primary" variant="outlined" size="small">
          View Details →
        </v-btn>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

const props = defineProps<{
  rocketId: string
  rocketName: string
  description?: string
  firstFlight?: string
  height?: { meters: number }
  diameter?: { meters: number }
  mass?: { kg: number }
}>()

const store = useFavoritesStore()

const isFavorite = computed(() => store.isFavorite(props.rocketId))

const shortDescription = computed(() =>
  props.description && props.description.length > 150
    ? props.description.slice(0, 150) + '...'
    : props.description
)

function toggleFavorite() {
  store.toggleFavorite({
    id: props.rocketId,
    name: props.rocketName,
    description: props.description || '',
    first_flight: props.firstFlight || '',
    height: props.height,
    diameter: props.diameter,
    mass: props.mass,
    stages: 2, // you can pass this from parent if needed
  })
}
</script>
