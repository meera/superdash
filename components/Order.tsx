import orderCard, { Iorder } from "./orderCard";
import { useRouter } from "next/router";

export interface IOrder {
    orders: Iorder[]
    total: number;
    subTotal: number;
    taxes: number;
    deliveryCharges: number;
  }

  function Order({ orders, total, subTotal, taxes, deliveryCharges }: IOrder) {
    const router = useRouter();

    function removeorder(id: number) {
      (orders.filter((item) => item.id !== id));
    }
  
    return (
      {orders.length > 0 && (
        <div className="mt-10 lg:mt-0 pt-12">
          <h2 className="text-2xl font-medium text-gray-900">
            Order summary
          </h2>
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="sr-only">Items in your cart</h3>
            <ul role="list" className="divide-y divide-gray-200">
              {orders.map((order: Iorder, index) => (
                <orderCard
                  key={index}
                  {...order}
                  removeorder={removeorder}
                />
              ))}
            </ul>
            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subTotal}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Delivery Charges</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${deliveryCharges}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Taxes</dt>
                <dd className="text-sm font-medium text-gray-900">
                 ${taxes}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${total}
                </dd>
              </div>
            </dl>

            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <button
                type="submit"
                className="w-full bg-purple-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                
                onClick= { () => router.push("/checkout" )}
             >
                Place an Order
              </button>
            </div>
          </div>
        </div>
      )}
    );
  }
  
  export default Order;
  