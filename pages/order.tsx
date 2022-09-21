import OrderItemCard from "../components/OrderItemCard";
import ProductItemCard from "../components/ProductItemCard";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import ShareThisModal from "../components/ShareThisModal";
import Avatar from "../components/Avatar";
import InviteFriends from "../components/InviteFriends";
import { IActiveUser, IMenuItem, IOrder, IOrderItem } from "../types/types";
import ActiveUsers from "../components/ActiveUsers";
import { blue } from "@mui/material/colors";
import {makeid} from "../lib/utils";

//https://github.com/supabase/realtime/blob/multiplayer/demo/pages/%5B...slug%5D.tsx
export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const { data } = await supabase.from("MenuItem").select();

  return {
    props: {
      menuItems: data,
      host: process.env['HOST'] || null 
    },
  };
};

const Start: React.FC = ({ menuItems, host }: any) => {
  const initOrder : IOrder = { 
    orderItems: [],
    total: 0,
    subTotal: 0,
    taxes: 6,
    deliveryCharges: 5
  }
  const [order, setOrder] = useState<IOrder>(initOrder);
  const router = useRouter();
  const [activeUsers, setActiveUsers] = useState<IActiveUser[]>([]);
  const [showShareThisModal, setShowShareThisModal] = useState<boolean>(false);
  const user = router.query.name ? (router.query.name as string) : "John Doe";
  const join = router.query.join ? true : false;
  const channelId = router.query.channelId ? (router.query.channelId as string) : "UnnamedChannel";

  const channel_broadcast_order = useRef<RealtimeChannel>();
  const url_to_share = useRef<string>('');
  console.log({ basePath: router.basePath}); 

  function removeOrderItem(id: number) {
    console.log(' remove ' , id);

    const orderItem =  order.orderItems.find((item) => item.id === id);

    if (orderItem === undefined) {
      console.log(' Something went wrong ' , id);

      return;
    }
    const newOrder = { ...order }; 
    newOrder.subTotal = order.subTotal - orderItem.price;
    newOrder.deliveryCharges= 6;
    newOrder.taxes = newOrder.subTotal *.8;
    newOrder.total = order.subTotal +  newOrder.deliveryCharges + newOrder.taxes;
    
    // Remove the order from the list
    newOrder.orderItems =  order.orderItems.filter((item) => item.id !== id);

    //newOrder.total = order.total - orderItem.price;

    channel_broadcast_order.current?.send({
      type: "broadcast",
      event: "order",
      order: newOrder,
    });
    setOrder(newOrder);

  
  }

  async function addOrderItem(orderItem: IOrderItem) {

    order.orderItems = [...order.orderItems, orderItem]

    const newOrder = { ...order }; 
    newOrder.subTotal = order.subTotal + orderItem.price;
    newOrder.deliveryCharges= 6;
    newOrder.taxes = newOrder.subTotal *.8;
    newOrder.total = order.subTotal +  newOrder.deliveryCharges + newOrder.taxes;
    setOrder(newOrder);

   
      
    const status = await channel_broadcast_order.current?.send({
      type: "broadcast",
      event: "order",
      order: newOrder,
    });
    console.log(" Broadcast Send ", status);
  }

  useEffect(() => {
    if (!router.isReady) return;


    
    // Check if user like to join a existing Channel or create a new session
     
    const channel_Id = join ? channelId : makeid(8);
    console.log("inside effect channel " , ' join ' , join, 'session ', channelId, 'channel', channelId);

    const channel_online_users = supabase.channel(channel_Id);
    url_to_share.current = host + '/join' + '?name=' + user + '&channelId=' + channel_Id;
    channel_online_users
      .on("presence", { event: "sync" }, () => {
        console.log(
          "currently online users",
          channel_online_users.presenceState()
        );
        const presentState = channel_online_users.presenceState();
        const keys = Object.keys(presentState);

        const presentUsers: IActiveUser[] = [];
        
       
        keys.map((key) => {
          const activeUser = {} as IActiveUser;

          activeUser.name = presentState[key][0].user_name;
          
          activeUser.id = key;
          presentUsers.push(activeUser);
        });
        
        setActiveUsers(presentUsers);
      })
      .on('presence', { event: 'join' }, () => {
       
        if(!join) {
          channel_broadcast_order.current?.send({
          type: "broadcast",
          event: "order",
          order: order,
        });
      }
      })

      .subscribe(async (status: any) => {
        if (status === "SUBSCRIBED") {
          const status = await channel_online_users.track({ user_name: user });
          console.log(status);
        }
      });

    const channel = supabase.channel("user-order-update", {
      configs: {
        broadcast: { ack: true },
      },
    });

    channel_broadcast_order.current = channel;
    
    channel_broadcast_order.current.subscribe(async (status: any) => {
      if (status === "SUBSCRIBED") {
        // now you can start broadcasting messages
        // sending a new message every second

        console.log(
          " Broad cast ",
          status,
          "channel ",
          channel_broadcast_order
        );

        
      }
    });

    channel_broadcast_order.current.on(
      "broadcast",
      { event: "order-update" },
      (updated_order: any) => {
        // TODO Update the Order State
        console.log("Broad cast receibed", updated_order);
      }
    );

    channel_broadcast_order.current.on(
      "broadcast",
      { event: "order" },
      (updated_order: any) => {
        // TODO Update the Order State
        console.log("Broad cast Order ** Received", updated_order);
        setOrder( updated_order.order);
      }
    );

    
  }, [router.isReady, user]);

  function show_shareThisDialog() {
    setShowShareThisModal(true);
  }

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
          <div className="flex p-4 space-x-6 border-2 border-blue-400 relative rounded-lg shadow-sm flex cursor-pointer bg-white">
            { join? <div> Joined! </div> :
             <><Avatar user={user}/> <InviteFriends name={user} shareThis={show_shareThisDialog} /></> }
            
            <ActiveUsers color="foo" activeusers={activeUsers} />
          </div>

          {/* Product and Orders */}
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="lg:grid grid-cols-3 lg:gap-x-12 xl:gap-x-16">
              <div className="mt-10 lg:mt-0 pt-12 col-span-2">
                {/* Product */}
                <h2 className="text-2xl font-medium text-gray-900">
                  Menu Items
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
              {/* End of Product Div */}
              {/* Orders */}
              <div className="col-span-1">
                {order.orderItems.length > 0 && (
                  <div className="mt-10 lg:mt-0 pt-12">
                    <h2 className="text-2xl font-medium text-gray-900">
                      Order summary
                    </h2>
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <h3 className="sr-only">Items in your cart</h3>
                      <ul role="list" className="divide-y divide-gray-200">
                        {order.orderItems.map((order: IOrderItem, index) => (
                          <OrderItemCard
                            key={index}
                            {...order}
                            removeOrderItem={removeOrderItem}
                          />
                        ))}
                      </ul>
                      <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-sm">Subtotal</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            ${order.subTotal}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-sm">Delivery Charges</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            ${order.deliveryCharges}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-sm">Taxes</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            ${order.taxes}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                          <dt className="text-base font-medium">Total</dt>
                          <dd className="text-base font-medium text-gray-900">
                            ${order.total}
                          </dd>
                        </div>
                      </dl>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <button
                          type="submit"
                          className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/checkout");
                          }}
                        >
                          Place an Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* End of Order Div */}
            </div>
          </div>
        </main>
      </div>
      {showShareThisModal && (
        <ShareThisModal
          show={showShareThisModal}
          setShow={setShowShareThisModal}
          url={url_to_share.current}
        />
      )}
    </>
  );
};

export default Start;
