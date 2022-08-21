import { TrashIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

export interface IOrderItem {
    id: number;
    orderid?: number;
    quantity: number;
    name: string | null;
  }
  
export interface OrderItemCardProps extends IOrderItem {
    removeOrderItem: (id: number) => void;
  }
  
  
  const OrderItemCard = ({
    id,
    name,
    quantity,
    removeOrderItem,
  }: OrderItemCardProps) => {
    return (
      <>
        <span> {name}</span>
        <span> Quantity: {quantity} </span>
        <TrashIcon
          onClick={() => removeOrderItem(id)}
          width="50px"
          height="50px"
        />
      </>
    );
  };

  export default OrderItemCard;