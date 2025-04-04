import React, { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <Link to="/" className="text-decoration-none link-light ">
          Chat App
        </Link>

        {user && (
          <span className="text-warning">Logged in as {user?.name}</span>
        )}

        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  to="/login"
                  onClick={() => logoutUser()}
                  className="text-decoration-none link-light "
                >
                  Logout
                </Link>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="text-decoration-none link-light ">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-decoration-none link-light "
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
