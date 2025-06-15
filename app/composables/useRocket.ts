import type { RocketQueryResult } from '~/types/rocket'
import { GET_ROCKET } from '~/graphql/rockets'

export function useRocket() {
    const route = useRoute()
    const rocketId = route.params.id as string
    
    const { data } = useAsyncQuery<RocketQueryResult>({
    query: GET_ROCKET,
    variables: { id: rocketId },
    })

    const rocket = computed(() => data.value?.rocket || null)

    return {
        rocket,
        rocketId
    }
}
