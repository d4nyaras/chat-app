import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Stack } from "react-bootstrap";

import ChatBox from "../components/chat/ChatBox";
import Sidebar from "../components/Sidebar";

function Chat() {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    console.error("ChatContext is null!");
    return <div>Loading chats...</div>;
  }

  return (
    <Stack className="h-100" direction="horizontal" gap={3}>
      <Sidebar />
      <ChatBox />
    </Stack>
  );
}

export default Chat;
