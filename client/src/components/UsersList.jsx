import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner, Table, Alert } from "react-bootstrap";

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:5000/api/users");
  return data;
};

const UsersList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading)
    return <Spinner animation="border" className="d-block mx-auto" />;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Table striped bordered hover className="mt-3">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersList;
