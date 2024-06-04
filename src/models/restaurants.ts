enum TagTypes {
  Location = "LOCATION",
  NumberOfSeats = "NUMBER_OF_SEATS",
}

export interface Schedule {
  id: number
  weekDay: number
  timeStart: Date
  timeFinish: Date
}

export interface Restaurant {
  id: number
  address: string
  schedule: Schedule[]
}

export interface Tag {
  id: string
  name: string
  type: TagTypes
}

export type GetRestaurantsResponse = Restaurant[];

interface RestaurantTable {
  id: number
  place: string
  tags: {
    id: string
    name: string
  }[]
}

export interface GetRestaurantPlacesResponse {
  free: RestaurantTable[]
  reserved: RestaurantTable[]
  busy: RestaurantTable[]
}

export type GetPlacesTagsResponse = Tag[];

export interface GetRestaurantPlacesRequest {
  tag: string
}
