<template>
  <v-container>
    <v-row>
      <v-col cols="12">
       <v-row class="mb-4" align="center" justify="space-between" dense>

        <v-col cols="12" md="4">
          <h1 class="text-h5 mb-4">SpaceX Launches</h1>
        </v-col>

      <!-- Filter by Year -->
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedYear"
          :items="availableYears"
          label="Year"
          clearable
          density="compact"
          variant="outlined"
          hide-details
        />
      </v-col>

      <!-- Sort by Date -->
      <v-col cols="12" md="4">
        <v-select
          v-model="sortOrder"
          :items="[
            { text: 'Newest First', value: 'desc' },
            { text: 'Oldest First', value: 'asc' }
          ]"
          item-title="text"
          item-value="value"
          label="Sort"
          density="compact"
          variant="outlined"
          hide-details
        />
      </v-col>
    </v-row>
    </v-col>

      <!-- Launch Cards -->
      <v-col
        v-for="launch in launches"
        :key="launch.id"
        cols="12"
        md="6"
        lg="4"
      >
        <LaunchCard
          :missionName="launch.mission_name"
          :launchDateUtc="launch.launch_date_utc"
          :launchSite="launch.launch_site?.site_name_long"
          :rocketName="launch.rocket.rocket_name"
          :details="launch.details"
          :rocketId="launch.rocket.rocket.id"
        />
      </v-col>

      <v-col v-if="error" cols="12">
        <v-alert type="error">Failed to load launches: {{ error.message }}</v-alert>
      </v-col>

      <v-col v-if="filteredLaunches.length === 0" cols="12">
        <v-progress-circular indeterminate color="primary" />
      </v-col>

      <!-- Pagination -->
      <v-col cols="12" class="text-center">
        <v-pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :length="totalPages"
          total-visible="7"
          color="primary"
        />
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import LaunchCard from '~/components/LaunchCard.vue'
import { useLaunches } from '~/composables/useLaunches'

const {
  launches,
  filteredLaunches,
  selectedYear,
  availableYears,
  sortOrder,
  currentPage,
  totalPages,
  error,
} = useLaunches()
</script>
