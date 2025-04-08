import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import UsersBox from "../components/UsersBox";

import ChatBox from "../components/chat/ChatBox";

import Sidebar from "../components/Sidebar";

function Chat() {
  const chatContext = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  if (!chatContext) {
    console.error("ChatContext is null!");
    return <div>Loading chats...</div>;
  }

  const { userChats, updateCurrentChat } = chatContext;

  return (
    <Stack className="h-100" direction="horizontal" gap={3}>
      <Sidebar />
      <ChatBox />
      {/* {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" className="w-100" gap={4}>
          <Stack
            style={{
              maxWidth: "300px",
            }}
          >
            <UsersBox />
          </Stack>
          <Stack className="d-flex flex-grow-1  h-100">
            <ChatBox />
          </Stack>
        </Stack>
      )} */}
    </Stack>
  );
}

export default Chat;
