export interface Launch {
  id: string
  mission_name: string
  launch_date_utc: string
  launch_site: {
    site_name_long: string
  }
  rocket: {
    rocket_name: string
    rocket: {
      id: string
    }
  }
  details?: string
  links: {
    mission_patch_small?: string
  }
}

export interface LaunchesPastResult {
  launchesPast: Launch[]
}
