export interface IOrderItem {
    id: number;
    orderid?: number;
    quantity: number;
    name: string | null;
    price: number
    image: string | null;

  }
  
export interface OrderItemCardProps extends IOrderItem {
    removeOrderItem: (id: number) => void;
    
  }
  
  
  const OrderItemCard = ({
    id,
    name,
    image,
    quantity,
    price,
  
    removeOrderItem,
  }: OrderItemCardProps) => {
    return (

         <li className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={image}
                        alt={name}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href="#"
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              Burger1
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vegetable, spicy, chicken
                          </p>
                        </div>

                        <div className="ml-4 flex-shrink-0 flow-root">
                          <button
                            type="button"
                            className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            {/* <!-- Heroicon name: solid/trash --> */}
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 pt-2 flex items-end justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${price}
                        </p>

                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">
                            {quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
    )}

export default OrderItemCard;