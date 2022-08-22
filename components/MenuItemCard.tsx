import { ArrowCircleDownIcon } from "@heroicons/react/solid";
import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import {IOrderItem} from './OrderItemCard';
import { useState, useEffect } from "react";

export interface IMenuItem {
    id: number;
    created_at: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
  }
  
export interface MenuItemCardProps extends IMenuItem {
    addOrderItem: (orderItem: IOrderItem) => void;
  }
  

const MenuItemCard = ({ id, name, image, addOrderItem }: MenuItemCardProps) => {
    const [quantity, setQuantity] = useState<number>(1);
  
    return (
      <div className="border border-neutral-300	 rounded">
        <span>{name}</span>
        <img src={image!} alt="github logo" width="150px" height="50px" />
        <span className="inline-flex ">
          <span> Quantity: </span>
          <ArrowCircleDownIcon
            onClick={() => quantity && setQuantity(quantity - 1)}
            className="h-16 w-16 text-blue-500"
          />
          <span> {quantity} </span>
  
          <ArrowCircleUpIcon
            onClick={() => setQuantity(quantity + 1)}
            className="h-16 w-16 text-blue-500"
          />
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            const orderItem: IOrderItem = { id, name, quantity };
            addOrderItem(orderItem);
          }}
        >
          Add
        </button>
      </div>
    );
  };

  export default MenuItemCard;