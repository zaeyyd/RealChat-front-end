import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from '@material-ui/core/Button';

import "./Join.css";

export default function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h2 className="heading">Welcome To REAL CHAT!</h2>
        
        <h1 className="subhead">JOIN</h1>
        

        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <select
            placeholder="Select A Chat Room"
            className="joinInput mt-20"
            onChange={(event) => setRoom(event.target.value)}
          >
            <option value="" selected disabled hidden>
              Select A Chat Room...
            </option>
            <option value="Public Room 1"> Public Room 1 </option>
            <option value="Public Room 2"> Public Room 2 </option>
            <option value="Public Room 3"> Public Room 3 </option>
            <option value="Public Room 4"> Public Room 4 </option>
          </select>
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            <h3 className="subhead">Starting Chatting 👉</h3>
          </button>
        </Link>

        <p> </p>
        <CopyToClipboard text="https://real-chat-757a0.firebaseapp.com/">
          <Button color="primary" variant="contained">Copy Invite Link</Button>
        </CopyToClipboard>
        <h4 className="subhead">Send your friends an invite link 👆</h4>
      </div>
    </div>
  );
}
