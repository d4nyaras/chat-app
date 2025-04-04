import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, ListGroup, Spinner, Alert } from "react-bootstrap";
import ChatRoom from "../components/ChatRoom"; // Chat component

// Fetch users from backend
const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:5000/api/users");
  return data;
};

const Home = ({ userId }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading)
    return <Spinner animation="border" className="d-block mx-auto" />;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <div className="container mt-3">
      <h3 className="text-center">Users List</h3>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item
            key={user._id}
            className="d-flex justify-content-between align-items-center"
          >
            {user.name}
            {user._id !== userId && (
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedChat(user._id);
                }}
              >
                Start Chat
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedChat && userId && (
        <div>
          {console.log("Rendering ChatRoom with:", userId, selectedChat)}
          <ChatRoom userId={userId} chatWithId={selectedChat} />
        </div>
      )}
    </div>
  );
};

export default Home;
