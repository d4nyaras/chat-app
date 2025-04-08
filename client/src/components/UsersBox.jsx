import React from "react";
import { Stack } from "react-bootstrap";
import PotentialChats from "./chat/PotentialChats";
import AvailableChats from "./AvailableChats";

function UsersBox() {
  return (
    <Stack className="d-flex flex-column" style={{ height: "100%" }} gap={4}>
      <PotentialChats />
      <AvailableChats />
    </Stack>
  );
}

export default UsersBox;
