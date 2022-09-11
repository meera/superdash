import { type } from "os";
import { IActiveFriends } from "../types";

interface ActiveFriendsProps {
  color: string;
  activeFriends: IActiveFriends[];
}
function ActiveFriends({ activeFriends }: ActiveFriendsProps) {
  return (
    <div className="flex justify-end">
      <h3 className="text-gray-700 pt-4">Active friends:</h3>
      <ul className="flex">
        {activeFriends.map((friend) => (
          <li key={friend.id}>
            {friend.name}
            <div className="w-72 h-72 bg-blue-500 rounded-full bg-color-blue"></div>

           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveFriends;
