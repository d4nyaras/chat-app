import React, { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextmessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [socket, setSocket] = useState(null);

  console.log(JSON.stringify(messages));

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", {
      ...newMessage,
      recipientId,
    });
  }, [newMessage]);

  //receive message
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/auth`);

      if (response.error) {
        console.log(response + " this error is from chat context");
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u.id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        if (response.error) {
          console.log(response.error + " this error is from chat context");
        }
        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      if (response.error) {
        console.log(response.error + " this error is from chat context");
      }
      setMessages(response);
      console.log(JSON.stringify(response) + "CCCCCCCCCCCCC");
    };

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You much type something...");

      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        setUserChats,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
