import { type } from "os";
import { IActiveUser } from "../types";

interface ActiveUsersProps {
  color: string;
  activeusers: IActiveUser[];
}
function ActiveUsers({ activeusers }: ActiveUsersProps) {
  return (
    <div className="flex justify-end">
      <h3 className="text-gray-700 pt-4">Active users:</h3>
      <ul className="flex">
        {activeusers.map((friend) => (
          <li key={friend.id}>
            {friend.name}
            <div className="w-72 h-72 bg-blue-500 rounded-full bg-color-blue"></div>

           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveUsers;
