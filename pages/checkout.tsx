import { Card, Button } from "flowbite-react";
import type { NextPage } from "next";

// TODO Checkout the Order
const PlaceOrder: NextPage = () => {
    return (
        <div className="flex h-screen">
          <div className="m-auto">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Your Order has been placed!
              </h5>
             
              
            </Card>
          </div>
        </div>
      );

}

export default PlaceOrder;