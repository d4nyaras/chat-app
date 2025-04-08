import React, { useContext } from "react";
import { Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar className="px-3 mb-5">
      <Stack direction="horizontal" gap={3} className="w-100">
        {user && <span> {user?.name}</span>}
        <div className="p-2 ms-auto d-flex gap-3">
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
              <Link to="/register" className="text-decoration-none link-light ">
                Register
              </Link>
            </>
          )}

          <Link to="/" className="text-decoration-none link-light ">
            LOGO
          </Link>
        </div>
      </Stack>
    </Navbar>
  );
}

export default NavBar;
