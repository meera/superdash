
export interface IActiveUser {
    id: string;
    name: string;
    color: string;
  }

  export interface IMenuItem {
    id: number;
    created_at: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    price: number
  }

  export interface IOrderItem {
    id: number;
    orderid?: number;
    quantity: number;
    name: string | null;
    description: string | null;
    price: number
    image: string | null;
  
  }
  
  export interface IOrder {
    orderItems: IOrderItem[];
    total: number;
    subTotal: number;
    taxes: number;
    deliveryCharges: number;
  }