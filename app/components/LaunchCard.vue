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
      <v-card-title class="text-h6 font-weight-bold mb-1">
        {{ missionName }}
      </v-card-title>

      <v-card-subtitle class="text-caption mb-1">
        {{ formattedDate }}
      </v-card-subtitle>

      <v-card-text
        class="card-body"
        :class="{ scrollable: showFullDetails }"
      >
        <div class="mb-2">
          <strong>Launch Site:</strong><br />
          <span>{{ launchSite }}</span>
        </div>

        <div class="mb-2">
          <strong>Rocket:</strong><br />
          <span>{{ rocketName }}</span>
        </div>

        <div class="mb-2">
          <strong>Details:</strong><br />
          <span v-if="details">
            {{ showFullDetails ? details : trimmedDetails }}
          </span>
          <em v-else>No details available.</em>

          <div v-if="isLongDetails" class="mt-1">
            <button
              @click.stop.prevent="toggleDetails"
              class="text-primary text-caption font-weight-medium text-decoration-underline btn-reset"
            >
              {{ showFullDetails ? 'Show less' : 'Read more →' }}
            </button>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </NuxtLink>
</template>



<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

const props = defineProps<{
  missionName: string
  launchDateUtc: string
  launchSite: string
  rocketName: string
  details?: string
  rocketId?: string
}>()

const isHovered = ref(false)
const showFullDetails = ref(false)

const toggleDetails = () => {
  showFullDetails.value = !showFullDetails.value
}

const formattedDate = computed(() =>
  new Date(props.launchDateUtc).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
)

const isLongDetails = computed(() => (props.details?.length ?? 0) > 180)

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
  justify-content: flex-start;
  cursor: pointer;
  overflow: hidden;
}

.launch-card:hover {
  transform: scale(1.015);
}

.card-body {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  font-size: 0.9rem;
}

/* When full details are shown, allow scroll */
.scrollable {
  overflow-y: auto;
  padding-right: 4px;
}

/* Optional: make scroll less intrusive */
.scrollable::-webkit-scrollbar {
  width: 4px;
}
.scrollable::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.btn-reset {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 0.8rem;
}

</style>
