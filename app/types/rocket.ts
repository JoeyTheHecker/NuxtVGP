export interface Rocket {
  id: string
  name: string
  description: string
  first_flight: string
  height: {
    meters: number
  }
  diameter: {
    meters: number
  }
  mass: {
    kg: number
  }
  stages: number
}

export interface RocketQueryResult {
  rocket: Rocket
}
