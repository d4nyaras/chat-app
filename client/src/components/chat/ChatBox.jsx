import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter")
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
  };

  if (!recipientUser) return <p>No conversation selected yet...</p>;

  return (
    <div className="chat-box d-flex flex-column h-100 p-5 gap-3 ">
      <div className="chat-box-body d-flex flex-column overflow-y-auto   ">
        <div className="chat-box-body-header p-3 d-flex justify-content-center ">
          <strong>{recipientUser?.name}</strong>
        </div>
        {messages &&
          messages.map((message, index) => {
            const isSender = message.senderId === user._id;
            return (
              <div
                key={index}
                className={`d-flex gap-2 flex-column text-box my-2 ${
                  isSender ? "sent" : "received"
                }`}
              >
                <span>{message.text}</span>
                <small className=" d-flex justify-content-end ">
                  {moment(message.createdAt).calendar()}
                </small>
              </div>
            );
          })}
      </div>
      <div className="chat-box-input d-flex justify-content-center align-items-center ">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          onKeyDown={handleKeyDown}
          theme="light"
        />
        <div
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-telegram"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
