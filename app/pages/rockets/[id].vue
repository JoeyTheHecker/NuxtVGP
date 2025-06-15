<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Section Heading -->
        <h2 class="text-h5 text-uppercase font-weight-bold text-primary mb-4">
          Rocket Details
        </h2>

        <!-- Rocket Card -->
        <v-card v-if="rocket" class="pa-6 rounded-xl elevation-3">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">{{ rocket.name }}</span>
            <!-- Favorite button -->
            <v-btn icon @click="toggleFavorite">
              <v-icon color="yellow darken-2">
                {{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-divider class="mb-4" />

          <v-card-text class="text-body-1">
            <p class="mb-4">
              <strong class="text-primary">Description:</strong><br />
              {{ rocket?.description }}
            </p>

            <v-row dense>
              <v-col cols="12" sm="6" class="mb-2">
                <strong>First Flight:</strong> {{ rocket?.first_flight }}
              </v-col>
              <v-col cols="12" sm="6" class="mb-2">
                <strong>Height:</strong> {{ rocket?.height?.meters }} meters
              </v-col>
              <v-col cols="12" sm="6" class="mb-2">
                <strong>Diameter:</strong> {{ rocket?.diameter?.meters }} meters
              </v-col>
              <v-col cols="12" sm="6" class="mb-2">
                <strong>Mass:</strong> {{ rocket?.mass?.kg }} kg
              </v-col>
              <v-col cols="12" sm="6" class="mb-2">
                <strong>Stages:</strong> {{ rocket?.stages }}
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider class="my-4" />

          <v-card-actions>
            <v-btn color="primary" variant="flat" @click="goBack">← Back to Launches</v-btn>
          </v-card-actions>
        </v-card>
        <v-progress-circular v-else indeterminate color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router'
import { useFavoritesStore } from '~/stores/favorites'

const router = useRouter()
const route = useRoute()
function goBack() {
  router.back()
}
const rocketId = route.params.id as string

const GET_ROCKET = gql`
  query GetRocket($id: ID!) {
    rocket(id: $id) {
      id
      name
      description
      first_flight
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      stages
    }
  }
`

const { data } = useAsyncQuery({
  query: GET_ROCKET,
  variables: { id: rocketId },
})

const rocket = computed(() => data.value?.rocket || null)


const store = useFavoritesStore()

const isFavorite = computed(() => store.isFavorite(rocketId))

function toggleFavorite() {
  if (rocket.value) {
  store.toggleFavorite({ id: rocketId, ...rocket.value })
}
}
</script>
