import { IOrderItem } from "../components/OrderItemCard";
import OrderItemCard from "../components/OrderItemCard";
import ProductItemCard from "../components/ProductItemCard";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { RealtimeChannel, RealtimePresence } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { IMenuItem } from "../components/MenuItemCard";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import ShareThisModal from "../components/ShareThisModal";

//https://github.com/supabase/realtime/blob/multiplayer/demo/pages/%5B...slug%5D.tsx
export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const { data } = await supabase.from("MenuItem").select();

  const resp = data;

  return {
    props: {
      menuItems: data,
    },
  };
};

const Home: React.FC = ({ menuItems }) => {
  const [order, setOrder] = useState<IOrderItem[]>([]);
  const router = useRouter();
  //var channel: RealtimeChannel;
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [user, setUser] = useState("Joe Doe");
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const deliveryCharges = 5;
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(3);
  const [showShareThisModal, setShowShareThisModal] = useState<boolean>(true);

  useEffect(() => {
  

    const channel = supabase.channel("meera11", {
      configs: {
        broadcast: { ack: true },
      },
    });


    channel
      .on("presence", { event: "sync" }, () => presenceChanged(channel))
      .on("presence", { event: "join" }, (newEvent: any) => {
        const newUser = newEvent.newPresences[0].user;
        console.log("a new user has joined", newUser);
        setActiveUsers((oldUserArray) => [...oldUserArray, newUser]);
      })
      .on("presence", { event: "leave" }, ({ leftUser }: any) =>
        console.log("a user has left", leftUser)
      )
      .subscribe((status: string) => {
        if (status === "SUBSCRIBED") {
          channel.track({ order: "124", user: user });
          channelRef.current = channel;
          console.log("subscribed ", status);
        }
        console.log("status ", status);
      });
      return () => {
        channel.unsubscribe()
        
      }
  }, []);

  function addOrderItem(orderItem: IOrderItem) {
    console.log("inside add ", channelRef.current, "order ", order);
    channelRef.current?.track({ order: "new value", user: user });
    setTotal( total + orderItem.price + deliveryCharges + taxes);
    setSubTotal( total + orderItem.price )
    setOrder((existingItem) => [...existingItem, orderItem]);
  }

  function removeOrderItem(id: number) {
    setOrder(order.filter((item) => item.id !== id));
  }

  const handleCheckoutOrder = (e: any) => {
    e.preventDefault();
    router.push("/CheckoutOrder");
  };

  const presenceChanged = (channel: RealtimeChannel) => {
    //const trackedState = channelRef.current?.presenceState();
    const trackedState = channelRef.current?.presence;
    // for (const [key, value] of Object.entries(trackedState)) {
    //   console.log(`${key}: ${value}`);
    // }

    const state = trackedState?.state;
    console.log("presenceChanged", trackedState?.state);
    console.log("keys", Object.keys(state as Object));
    // const state = channel.presence.state;
    //  console.log("changed", trackedState);
    Object.values(state as Object).map((userState: any) =>
      console.log("User State ", userState, "user ", userState[0].user)
    );
  };

  return (
    <>
      <Head>
        <title>SuperDasher</title>
        <meta
          name="description"
          content="Real Time Food Ordering System - Hackathon Project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-50">         
        <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <Header shareThis={() => setShowShareThisModal(true)} user={user} setUser={setUser} />
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h1 className="sr-only">Product List</h1>


            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div className="pt-12">
                <h2 className="text-2xl font-medium text-gray-900">
                  Product List
                </h2>

                <ul role="list">
                  {menuItems.map((menuItem: IMenuItem) => (
                    <ProductItemCard
                      key={menuItem.id}
                      id={menuItem.id}
                      name={menuItem.name}
                      description={menuItem.description}
                      image={menuItem.image}
                      price={menuItem.price}
                      addOrderItem={addOrderItem}
                    />
                  ))}
                </ul>
              </div>
              {/* <!-- Order summary --> */}
              {order.length > 0 && (
                <div className="mt-10 lg:mt-0 pt-12">
                  <h2 className="text-2xl font-medium text-gray-900">
                    Order summary
                  </h2>
                  <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="sr-only">Items in your cart</h3>
                    <ul role="list" className="divide-y divide-gray-200">
                      {order.map((orderItem: IOrderItem, index) => (
                        <OrderItemCard
                          key={index}
                          {...orderItem}
                          removeOrderItem={removeOrderItem}
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
            </div>
          </div>
        </main>
        
      </div>    
      {/* <ShareThisModal show={showShareThisModal} setShow={setShowShareThisModal}></ShareThisModal> */}

    </>
  );
};

export default Home;
