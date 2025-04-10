import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";

function Register() {
  const { registerInfo, updateRegisterInfo, registerUser, registerError } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3} className="shadow p-4 rounded bg-light">
              <h2 className="text-center">Register</h2>

              <Form.Control
                type="text"
                name="name"
                placeholder="Name..."
                onChange={(e) => {
                  updateRegisterInfo({ ...registerInfo, name: e.target.value });
                }}
              />
              <Form.Control
                type="email"
                name="email"
                placeholder="Email..."
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    email: e.target.value,
                  });
                }}
              />
              <Form.Control
                type="password"
                name="password"
                placeholder="Password..."
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  });
                }}
              />

              <Button variant="primary" type="submit">
                Register
              </Button>

              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError?.message} </p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Register;
