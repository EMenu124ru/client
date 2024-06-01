export interface MakeReservationRequest {
  arrivalTime: string
  restaurant: number
  order: Order,
  place: number,
  city: number,
}

interface OrderDish {
  dish: number
  count: number
  comment: string
}

interface Order {
  comment: string
  client: number
  dishes: OrderDish[],
}