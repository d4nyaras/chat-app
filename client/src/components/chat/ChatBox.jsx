import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Button, Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  if (!recipientUser) return <p>No conversation selected yet...</p>;

  return (
    <Stack gap={4} style={{ border: "2px solid black" }}>
      <div>
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3}>
        {messages &&
          messages.map((message, index) => {
            return (
              <Stack key={index}>
                <span>{message.text}</span>
                <span>{moment(message.createdAt).calendar()}</span>
              </Stack>
            );
          })}
      </Stack>
      <Stack>
        <Stack
          direction="horizontal"
          gap={3}
          style={{ border: "2px solid red" }}
        >
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            borderColor="red"
          />
          <Button
            onClick={() =>
              sendTextMessage(
                textMessage,
                user,
                currentChat._id,
                setTextMessage
              )
            }
          >
            send
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ChatBox;
