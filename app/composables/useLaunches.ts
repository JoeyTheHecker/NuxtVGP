// composables/useLaunches.ts
import { gql } from 'graphql-tag'
import { computed, ref } from 'vue'

const GET_LAUNCHES = gql`
  query GetLaunches {
    launchesPast(limit: 100) {
      id
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      details
    }
  }
`

export function useLaunches() {
  const selectedYear = ref<string | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const { data } = useAsyncQuery(GET_LAUNCHES)

  const launches = computed(() => {
    if (!data.value?.launchesPast) return []

    let filtered = data.value.launchesPast

    if (selectedYear.value) {
      filtered = filtered.filter((launch: any) =>
        new Date(launch.launch_date_utc).getFullYear().toString() === selectedYear.value
      )
    }

    return filtered.slice().sort((a: any, b: any) => {
      const dateA = new Date(a.launch_date_utc).getTime()
      const dateB = new Date(b.launch_date_utc).getTime()
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })
  })

  const availableYears = computed(() => {
    const years = new Set<string>()
    data.value?.launchesPast.forEach((launch: any) => {
      const year = new Date(launch.launch_date_utc).getFullYear().toString()
      years.add(year)
    })
    return Array.from(years).sort((a, b) => Number(b) - Number(a))
  })

  return {
    launches,
    selectedYear,
    availableYears,
    sortOrder,
  }
}
