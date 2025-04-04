import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
function Chat() {
  const chatContext = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  if (!chatContext) {
    console.error("ChatContext is null!");
    return <div>Loading chats...</div>;
  }

  const { userChats, updateCurrentChat } = chatContext;

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="flex-grow-0" gap={3}>
            {userChats?.map((chat, index) => {
              return (
                <div
                  key={index}
                  onClick={() => updateCurrentChat(chat)}
                  style={{ border: "3px solid black" }}
                >
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
}
export default Chat;
