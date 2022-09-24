import { type } from "os";
import { IActiveUser } from "../types/types";

interface ActiveUsersProps {

  activeusers: IActiveUser[];
}
function ActiveUsers({ activeusers }: ActiveUsersProps) {
  const divStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  };
  return (

  

      <div className="flex-row">
      <h3 className="text-gray-700 pt-4">Active users:</h3>
      
      <ul >
        {activeusers.map((friend) => (
          <li key={friend.id}>
            {friend.name}
            <div style={{...divStyle, 'backgroundColor': '#' + friend.color}} 
            ></div>

           </li>
         
        ))}
      </ul>
    </div>
  );
}

export default ActiveUsers;
