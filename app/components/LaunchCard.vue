<template>
  <NuxtLink
    :to="rocketId ? `/rockets/${rocketId}` : ''"
    class="text-decoration-none"
  >
    <v-card
      class="launch-card"
      :elevation="isHovered ? 8 : 2"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <v-card-title class="text-h6 font-weight-bold">
        {{ missionName }}
      </v-card-title>

      <v-card-subtitle class="text-caption mb-2">
        {{ formattedDate }}
      </v-card-subtitle>

      <v-card-text class="card-body">
        <div class="mb-2">
          <strong>Launch Site:</strong><br />
          <span>{{ launchSite }}</span>
        </div>

        <div class="mb-2">
          <strong>Rocket:</strong><br />
          <span>{{ rocketName }}</span>
        </div>

        <div>
          <strong>Details:</strong><br />
          <span v-if="details">{{ trimmedDetails }}</span>
          <em v-else>No details available.</em>
        </div>

        <!-- "Read more" link goes to rocket details page -->
        <div v-if="isLongDetails" class="mt-2">
          <NuxtLink
            :to="rocketId ? `/rockets/${rocketId}` : ''"
            class="text-primary text-caption font-weight-medium text-decoration-underline"
            @click.stop
          >
            Read more →
          </NuxtLink>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps<{
  missionName: string
  launchDateUtc: string
  launchSite: string
  rocketName: string
  details?: string
  rocketId?: string
}>()

const isHovered = ref(false)

const formattedDate = computed(() =>
  new Date(props.launchDateUtc).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
)

const isLongDetails = computed(() => props.details?.length > 180)

const trimmedDetails = computed(() =>
  props.details && props.details.length > 180
    ? props.details.slice(0, 180) + '...'
    : props.details
)
</script>

<style scoped>
.launch-card {
  height: 340px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.launch-card:hover {
  transform: scale(1.015);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 8px;
}

.card-body div {
  line-height: 1.5;
  margin-bottom: 8px;
}

.v-card-title,
.v-card-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
