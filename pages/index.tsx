import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import OrderItemCard, { IOrderItem } from "../components/OrderItemCard";
import MenuItemCard, { IMenuItem } from "../components/MenuItemCard";
import Header from "../components/header";

enum OrderActionKind {
  ADD = "ADD",
  DELETE = "REMOVE",
}

interface OrderAction {
  type: OrderActionKind;
}

const Home: NextPage = () => {
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  const [order, setOrder] = useState<IOrderItem[]>([]);
  const router = useRouter();
  //var channel: RealtimeChannel;
  const channelRef = useRef<RealtimeChannel| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("MenuItem").select();
      console.log("data", data);
      setMenu(data as IMenuItem[]);
      return;
    };

    fetchData();
  }, []);

 

  function addOrderItem(orderItem: IOrderItem) {
    console.log('inside add ', channelRef.current, 'order ', order);
    channelRef.current?.track({ order: "new value" });


    setOrder((existingItem) => [...existingItem, orderItem]);
  }

  function removeOrderItem(id: number) {
    setOrder(order.filter((item) => item.id !== id));
  }

  const handleCheckoutOrder = (e: any) => {
    e.preventDefault();
    router.push("/CheckoutOrder");
  };

  const presenceChanged = () => {
    const newState = channelRef.current?.presenceState();


    console.log("changed", newState, "channel", channelRef.current);
  };
  function shareThis() {
    // Generate random number
    //Math.floor(Math.random()*100000+1)
    console.log("share this");
    const channel = supabase.channel("room23", {
      configs: {
        broadcast: { ack: true },
        presence: { key: "121" },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => presenceChanged())
      .on("presence", { event: "join" }, ({ newUser }: any) => {
        console.log("a new user has joined", newUser);
      })
      .on("presence", { event: "leave" }, ({ leftUser }: any) =>
        console.log("a user has left", leftUser)
      )
      .subscribe((status: string) => {
        if (status === "SUBSCRIBED") {
          channel.track({ order: JSON.stringify(order) });
          channelRef.current = channel; 
          console.log("subscribed ", status, "json", JSON.stringify(order));
        }
        console.log("status ", status);
      });
  }

  return (
    <div className="min-h-full  max-w-none prose lg:prose-xl ">
      <Head>
        <title>SuperDasher</title>
        <meta
          name="description"
          content="Real Time Food Ordering System - Hackathon Project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* // Header  */}

        <Header shareThis={() => shareThis()} />

        <div className="flex flex-row">
          {/* // Menu  */}
          <div className="basis-3/4 bg-slate-50	">
            {menu.map((menuItem: IMenuItem) => (
              <MenuItemCard
                key={menuItem.id}
                {...menuItem}
                addOrderItem={addOrderItem}
              />
            ))}
          </div>

          {/* // Selected Items  */}

          <div className="basis-1/4 bg-slate-200">
            <h1> Current Order Items</h1>
            {order.map((orderItem: IOrderItem, index) => (
              <OrderItemCard
                key={index}
                {...orderItem}
                removeOrderItem={removeOrderItem}
              />
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleCheckoutOrder}
            >
              Place an Order!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
