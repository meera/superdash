
interface ActiveFriendsProps {
    shareThis: () => void;
    user: string;
    setUser: Function;
  }
  function ActiveFriends({shareThis, user, setUser}:ActiveFriendsProps) { 

      return  <div className="flex justify-end">
            <h3 className="text-gray-700 pt-4">Active friends:</h3>
            <ul className="flex">
              <li
                title="img1"
                className="w-11 h-11 rounded-full border-2 border-purple-200 m-1 overflow-hidden"
              >
                <img src="https://i.pravatar.cc/300" />
              </li>
              <li
                className="w-11 h-11 rounded-full border-2 border-purple-200 m-1 overflow-hidden"
              >
                <img src="https://i.pravatar.cc/400?img=64" />
              </li>
              <li
                className="w-11 h-11 rounded-full border-2 border-purple-200 m-1 overflow-hidden"
              >
                <img src="https://i.pravatar.cc/400?img=65" />
              </li>
            </ul>
          </div>
    
    }
  
    export default ActiveFriends;