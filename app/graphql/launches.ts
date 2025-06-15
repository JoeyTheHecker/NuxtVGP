export const GET_LAUNCHES = gql`
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