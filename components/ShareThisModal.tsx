import { Button, Modal } from "flowbite-react";
import React from "react";
import { useState} from "react";


export interface ShareThisModalProp {
 show: boolean;
 setShow: Function;
}
export default function ShareThisModal({show, setShow}:ShareThisModalProp ) {

    function onClick() {
        navigator.clipboard.writeText('inclick');
        setShow(false);
    }
    function onClose() {
       setShow(false);
    }
    return (<>
    
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>
        Send Invite to Join this session
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Share the joy, share food. Invite your family and friends to collectively place a large order.  
              </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Send this link to your friends.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClick}>
          Copy to Clipboard
        </Button>
        
      </Modal.Footer>
    </Modal>
  </>)
  
}