import { IActiveFriends } from "../types";

  function ActiveFriends( props: IActiveFriends[]) { 

    console.log('friends', props);
      return  <div className="flex justify-end">
            <h3 className="text-gray-700 pt-4">Active friends:</h3>
            <ul className="flex">

              {/* { friends.map( (friend )=>  <li
                
              >
                {friend.name}
                <img className="bg-red-100 w-9 h-9 rounded-full border-2 border-purple-200 m-1 overflow-hidden" src="https://i.pravatar.cc/400?img=64" />
              </li>
              )} */}
             
             
            </ul>
          </div>
    
    }
  
    export default ActiveFriends;