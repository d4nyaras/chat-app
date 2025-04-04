import React from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";

function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="align-items-center p-2 justify-content-between"
      style={{ border: "2px solid red" }}
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">A</div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div>Text</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date"> 12/22/2022</div>
        <div
          style={{
            background: "pink",
            borderRadius: "500px",
            width: "20px",
            height: "20px",
          }}
        >
          2
        </div>

        <div
          className="user-online"
          style={{
            borderRadius: "300px",
            background: "green",
            width: "10px",
            height: "10px",
          }}
        ></div>
      </div>
    </Stack>
  );
}

export default UserChat;
