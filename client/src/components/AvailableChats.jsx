import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import UserChat from "./chat/UserChat";

function AvailableChats() {
  const { userChats, updateCurrentChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <div>
      {userChats?.map((chat, index) => (
        <div
          key={index}
          onClick={() => updateCurrentChat(chat)}
          className="available-chats-user"
        >
          <UserChat chat={chat} user={user} />
        </div>
      ))}
    </div>
  );
}

export default AvailableChats;
