<template>
  <v-container class="py-10">
    <h2 class="text-h5 font-weight-bold mb-6">Favorite Rockets</h2>

    <v-row class="mb-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn
          v-if="store.favorites.length > 0"
          color="red"
          variant="flat"
          @click="confirmDialog = true"
        >
          Clear All Favorites
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="rocket in store.favorites"
        :key="rocket.id"
        cols="12"
        md="6"
        lg="4"
      >
        <RocketCard
          :rocketId="rocket.id"
          :rocketName="rocket.name"
          :description="rocket.description"
          :firstFlight="rocket.first_flight"
          :height="rocket.height"
          :diameter="rocket.diameter"
          :mass="rocket.mass"
        />
      </v-col>

      <v-col v-if="store.favorites.length === 0" cols="12">
        <v-alert type="info">No favorites yet.</v-alert>
      </v-col>
    </v-row>
  </v-container>

  <!-- Confirmation Dialog -->
  <v-dialog v-model="confirmDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h6">Clear All Favorites?</v-card-title>

    <v-card-text>
      This action will remove all saved favorite rockets. Are you sure?
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text @click="confirmDialog = false">Cancel</v-btn>
      <v-btn color="red" text @click="() => { store.clearFavorites(); confirmDialog = false }">
        Yes, Clear
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>


<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'
import RocketCard from '../components/RocketCard.vue'

const store = useFavoritesStore()
const confirmDialog = ref(false)

</script>
