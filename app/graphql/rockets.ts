export const GET_ROCKET = gql`
    query GetRocket($id: ID!) {
        rocket(id: $id) {
        id
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