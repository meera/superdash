import { useState, useEffect, useRef } from "react";

import ShareThisModal from "../components/ShareThisModal";

interface InviteFriendsProps {
  name: string;
  url: string;
}
function InviteFriends({ name, url }: InviteFriendsProps) {
  const [showShareThisModal, setShowShareThisModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-between space-y-4 w-full">
      <div className="text-sm font-medium space-y-1">
        <h2 className="text-gray-900 text-3xl font-large pt-4">
          <span className="text-blue-600 font-bold">{name} </span>
          You have started a new group food order!
        </h2>
        <div className="pt-10">
          <button
            type="button"
            className="pointer-events-auto rounded-md bg-blue-600 py-3 px-5 text-[1] font-semibold leading-5 text-white hover:bg-blue-500"
            onClick={() => setShowShareThisModal(true)}
          >
            Invite Friends
          </button>
        </div>
      </div>
        <div> Hi</div>
       {showShareThisModal &&  <ShareThisModal
          onClose={() => setShowShareThisModal(false)}
          url={url}
        />}
     
    </div>
  );
}

export default InviteFriends;
