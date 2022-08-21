import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useReducer } from "react";
import { supabase } from "../lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import OrderItemCard, {IOrderItem} from "../components/OrderItemCard";
import MenuItemCard, {IMenuItem} from "../components/MenuItemCard";
import Header from "../components/header";


enum OrderActionKind {
  ADD = 'ADD',
  DELETE = 'REMOVE',
}

interface OrderAction {
  type: OrderActionKind;
  
}

const reducer = (order:IOrderItem[], action:OrderAction) => {
  switch (action.type) {
    case "ADD": {
      const modal: IOrderItem = {
        id: 1,
    orderid: 11,
    quantity: 1,
    name: 'str',
    };return [...order, modal];
    }
      
    case 'REMOVE':
          //setOrder((existingItem) => [...existingItem, orderItem]);

    default:
      return order;
  }
};
const Home: NextPage = () => {

  const [menu, setMenu] = useState<IMenuItem[]>([]);
  //const [order, setOrder] = useState<IOrderItem[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel>();
  const [dname, setdname] = useState<string>("dname");
  const [users, setUsres] = useState<string[]>([]);
  const router = useRouter();
  const [order, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("MenuItem").select();
      console.log("data", data);
      setMenu(data as IMenuItem[]);
      return;
    };

    fetchData();
  }, []);
  const presenceChanged = () => {
    const newState = channel?.presenceState();
    dispatch({ type: OrderActionKind.ADD });

    console.log("changed", newState, "channel", channel, " dname", dname);
  };

  function addOrderItem(orderItem: IOrderItem) {
    dispatch({ type: OrderActionKind.ADD });

    //setOrder((existingItem) => [...existingItem, orderItem]);
  }

  function removeOrderItem(id: number) {
    //setOrder(order.filter((item) => item.id !== id));
    dispatch({ type: OrderActionKind.DELETE});

  }

  const handleCheckoutOrder = (e: any) => {
    e.preventDefault();
    router.push("/CheckoutOrder");
  };


  function shareThis() {

    // Generate random number
    //Math.floor(Math.random()*100000+1)
    
    const tchannel = supabase.channel("room2", {
      configs: {
        broadcast: { ack: true },
        presence: { key: "121" },
      },
    });

    tchannel
      .on("presence", { event: "sync" }, () => presenceChanged())
      .subscribe((status: string) => {
        if (status === "SUBSCRIBED") {
          //channel.track({ user_name: 'user123'})
          console.log("subscribed ", status);

          setChannel(tchannel);
          setdname("Meera");

          console.log("name", name, "channel ", tchannel, "dname", dname);
          tchannel?.track({ user_name: name });
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
        
        <Header/>
              

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
            {order.map((orderItem: IOrderItem) => (
              <OrderItemCard
                key={orderItem.id}
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
