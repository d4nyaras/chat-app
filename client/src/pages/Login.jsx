import React, { useContext, useState } from "react";
import { Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { loginInfo, updateLogin, loginUser, updateLoginInfo } =
    useContext(AuthContext);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  // const loginUser = async (userData) => {
  //   const response = await axios.post(
  //     "http://localhost:5000/api/auth/login",
  //     userData
  //   );
  //   return response.data;
  // };

  // const mutation = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: (data) => {
  //     localStorage.setItem("chat_app_user", JSON.stringify(data));
  //     navigate("/");
  //   },
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   mutation.mutate(formData);
  // };

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                name="email"
                placeholder="email..."
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                name="password"
                placeholder="password..."
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Login;
