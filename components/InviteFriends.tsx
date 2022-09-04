
interface InviteFriendsProps {
    shareThis: () => void;
    user: string;
    setUser: Function;
  }
  function InviteFriends({shareThis, user, setUser}:InviteFriendsProps) { 
  
  
      
    
      return   <div
      className="flex p-4 space-x-6 border-2 border-purple-400 relative rounded-lg shadow-sm flex cursor-pointer mt-4 bg-white"
    >
      <div className="flex flex-col justify-center px-10">
        <img
          src="https://i.pravatar.cc/200?img=12"
          alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
          className="flex-none w-40px h-40px object-center object-cover bg-gray-200 rounded-full border-4 border-purple-100"
        />
        <h2 className="text-center text-gray-700 text-md font-bold pt-4">
          {user}
        </h2>
      </div>
    
      <div className="flex flex-col justify-between space-y-4 w-full">
        <div className="text-sm font-medium space-y-1">
          <h2 className="text-gray-900 text-3xl font-large pt-4">
            <span className="text-purple-600 font-bold">{user}</span> has
            started a new group Food Order
          </h2>
          <div className="pt-10">
            <button
              type="button"
              className="pointer-events-auto rounded-md bg-purple-600 py-3 px-5 text-[1] font-semibold leading-5 text-white hover:bg-purple-500"
              onClick={()=> shareThis()}
           >
              Invite Friends
            </button>
          </div>
    
          <div className="flex justify-end">
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
        </div>
        <div className="flex space-x-4 justify-end">
          <div className="flex pl-4"></div>
        </div>
      </div>
    </div>
    
    }
  
    export default InviteFriends;