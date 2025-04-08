import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import Wrapper from "../Wrapper";

function PotentialChats() {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);

  return (
    <Wrapper styles="potential-chats-wrapper ">
      {potentialChats.map((u, index) => (
        <div
          key={index}
          onClick={() => createChat(user._id, u._id)}
          className="potential-chats-user"
        >
          <div className="user-name">{u.name}</div>
        </div>
      ))}
    </Wrapper>
  );
}

export default PotentialChats;
