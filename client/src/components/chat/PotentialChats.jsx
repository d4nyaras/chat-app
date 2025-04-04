import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

function PotentialChats() {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  return (
    <div style={{ border: "2px solid blue" }}>
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: "pink" }}
              onClick={() => createChat(user._id, u._id)}
            >
              {u.name}
              <div></div>
            </div>
          );
        })}
    </div>
  );
}

export default PotentialChats;
