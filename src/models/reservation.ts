export interface MakeReservationRequest {
  arrivalTime: string
  restaurant: number
  order: Order,
  place: number,
  comment: string,
  tagToPlace?: number,
}

interface OrderDish {
  dish: number
  count: number
  comment: string
}

interface Order {
  comment: string
  client?: number
  dishes: OrderDish[],
}
