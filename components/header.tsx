import ShareThisModal from "./ShareThisModal";
import { ShareIcon } from "@heroicons/react/solid";
import { useState, useEffect, useReducer } from "react";

interface HeaderProps {
    shareThis: () => void;

}
const Header = ({shareThis}:HeaderProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState("");

  return (
    <>
      <ShareThisModal setOpen={setOpen} open={open}/>
      <div className="bg-slate-200">
        <h1 className="text-3xl font-bold underline">Welcome to SuperDash!</h1>
        <p> This is a Food Delivery System - Just like Doordash with a Collaborative Ordering.</p>
        <a href="https://github.com">
          <img
            src="/GitHub-Mark-64px.png"
            alt="github logo"
            width="50px"
            height="50px"
          />
        </a>
        <label> Name:</label>

         <input
          type="text"
          id="fname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="fname"
        />

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={()=> shareThis()}
        >
          <ShareIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Share This with Others
        </button> 
      </div>
    </>
  );
};

export default Header;
