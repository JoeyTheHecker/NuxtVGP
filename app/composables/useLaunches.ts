import { computed, ref } from 'vue'

const GET_LAUNCHES = gql`
  query GetLaunches {
    launchesPast {
      id
      mission_name
      launch_date_utc
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket {
            id
          }
      }
      details
      links {
        mission_patch_small
      }
    }
  }
`

export function useLaunches() {
  const selectedYear = ref<string | null>(null)
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const searchQuery = ref('')
  const currentPage = ref(1)
  const perPage = 6

  const { data, loading, error } = useAsyncQuery(GET_LAUNCHES)

  const filteredLaunches = computed(() => {
    if (!data.value?.launchesPast) return []

    let result = data.value.launchesPast

    // Year filter
    if (selectedYear.value) {
      result = result.filter((launch: any) =>
        new Date(launch.launch_date_utc).getFullYear().toString() === selectedYear.value
      )
    }

    // Sort
    result = result.slice().sort((a: any, b: any) => {
      const dateA = new Date(a.launch_date_utc).getTime()
      const dateB = new Date(b.launch_date_utc).getTime()
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })

    return result
  })

  const launches = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredLaunches.value.slice(start, start + perPage)
  })

  const totalPages = computed(() =>
    Math.ceil(filteredLaunches.value.length / perPage)
  )

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
    filteredLaunches,
    selectedYear,
    availableYears,
    sortOrder,
    currentPage,
    totalPages,
    loading,
    error,
  }
}
