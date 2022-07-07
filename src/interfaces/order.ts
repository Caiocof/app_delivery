export interface IOrder {
  id?: number;
  user_id: number;
  address: string;
  items: Array<any>;
  method_payment: "money" | "card";
  shipping: number;
  sub_total: number;
  the_change: number;
  order_state: string;
  created_at?: Date;
}