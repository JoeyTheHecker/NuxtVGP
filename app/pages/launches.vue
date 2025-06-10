<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">SpaceX Launches</h1>
        <v-select
          v-model="selectedYear"
          :items="availableYears"
          label="Filter by Year"
          clearable
          class="mb-4"
        />
      </v-col>

      <v-col
        v-if="!loading"
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
        />
      </v-col>

      <v-col v-if="loading" cols="12">
        <v-progress-circular indeterminate color="primary" />
      </v-col>

      <v-col v-if="error" cols="12">
        <v-alert type="error">Failed to load launches: {{ error.message }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import LaunchCard from '~/components/LaunchCard.vue'
import { useLaunches } from '~/composables/useLaunches'

const {
  launches,
  loading,
  error,
  selectedYear,
  availableYears,
} = useLaunches()
</script>
