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
    price: number
  }
  
export interface MenuItemCardProps extends IMenuItem {
    addOrderItem: (orderItem: IOrderItem) => void;
  }
  

const MenuItemCard = ({ id, name, image, price, addOrderItem }: MenuItemCardProps) => {
    const [quantity, setQuantity] = useState<number>(1);
  
    return ( <li
                    className="flex p-4 space-x-6 border-t border-gray-200 relative border rounded-lg shadow-sm flex cursor-pointer mt-4 bg-white"
                  >
                    <img
                      src="https://theburgershack.pk/upload/1652957388-WhatsApp%20Image%202022-05-19%20at%203.45.37%20PM.jpeg"
                      alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
                      className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                    />
                    <div className="flex flex-col justify-between space-y-4 w-full">
                      <div className="text-sm font-medium space-y-1">
                        <h2 className="text-gray-900 text-lg font-large">Burger</h2>
                        <p className="text-gray-900">$32.00</p>
                        <p className="text-gray-700 pt-4">Description:</p>
                        <p className="text-gray-500">Vegetable, spicy, chicken</p>
                      </div>
                      <div className="flex space-x-4 justify-end">
                        <div className="flex gap-2">
                          <select
                            id="quantity"
                            name="quantity"
                            className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                          </select>
                          <button
                            type="button"
                            className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
    );
  };

  export default MenuItemCard;