<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Section Heading -->
        <h2 class="text-h5 text-uppercase font-weight-bold text-primary mb-4">
          Rocket Details
        </h2>

        <!-- Rocket Card -->
        <v-card class="pa-6 rounded-xl elevation-3">
          <v-card-title class="text-h4 font-weight-bold mb-4">
            {{ rocket?.name }}
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
            <v-btn color="primary" variant="flat" @click="$router.back()">← Back to Launches</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const rocketId = route.params.id as string

const GET_ROCKET = gql`
  query GetRocket($id: ID!) {
    rocket(id: $id) {
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

const { data, error, fetching } = useAsyncQuery({
  query: GET_ROCKET,
  variables: { id: rocketId },
})

const rocket = computed(() => data.value?.rocket)
</script>
