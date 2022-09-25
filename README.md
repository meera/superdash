This is a [Supabase Launch Week 5 Hackathon submission](https://supabase.com/blog/launch-week-5-hackathon). 


This is a multi-user, collaborative food ordering system. Think of this system as a real-time collaborative version of  DoorDash (or Swiggy).

A user can start a new food order. They can invite their friend, family, or colleagues to join the session. The URL can be shared using any IM application such as discord or WhatsApp or in a Text. When other users join in the session, everyone will be able to see who is present. All users can add food items to the cart or remove food items from the cart.  If any one user updates the food order – everybody’s screens will get instantly updated with the latest change. When you are done with the order, you can place the order to checkout.




## See the live Demo 
  

[ >>> SEE SUPERDASH DEMO <<<](https://sd.askus.how/) 
  

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Technology Used

- React/NextJS
- TailwindCSS
- Vercel
- Supabase Realtime
- Supabase Presence: Used to get list of Active Users.
- Supabase Broadcast: Used to share ReactJS State amoung users

## What Next

- **Build Real Time Dashboards using this learning**
- Working to make this experience a beautiful Pleasant User Interface.
- Displaying other person's order in different color.

## Why Collaborative Web Applications?
We all have used Google Docs, where users can collaborate to edit a document in real time. These multi-user, collaborative real-time applications are not new. Many online games and social media platforms implement it.. However,  this pattern is not widely adopted within the enterprise world.

Imagine an e-commerce application where users could collaborate to procure supplies in real-time without the need for an approval workflow. Or an employee performance evaluation portal, where all evaluators can share a common view and stack-rank bonuses. Or a system where two parties negotiate and agree on terms in real-time without the need for a centralized authority.. 
 
These peer-to-peer and distributed applications can be game-changing and will lead to innovative next-generation applications. The promise of Metaverse, where employees meet at the virtual world’s water cooler, seems too futuristic - However, real-time collaborative applications are achievable and buildable today. 

This hackathon coincided while I had Covid. I remember only two things during that time, 
- Ordering lots of greasy food 🍜 using Doordash.
- Coordinated food orders with others.  

This project aims to solve the problem of collaborative ordering 😊!

[![Watch the video](https://raw.githubusercontent.com/meera/superdash/main/public/collaborative_webapp_video_thumbnail.png)](https://www.youtube.com/watch?v=z3m7ZNZgnSY)


## Conclusion and Afterthoughts
 - Impressed by Supabase Realtime! Superdooper cool!! You get power of Elixir/Phoenix framework without learning different toolset. 
 - The data structure returned by Broadcast/Present can be documented better. 
 - For leader/follower schenario, would like to see better abstractions. 

