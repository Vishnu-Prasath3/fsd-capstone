import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const { logout: signout } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('https://fsd-capstone.onrender.com/api/users/logout', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        signout();
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    };

    logout();
  }, [navigate, signout]);

  return <div>Logging out...</div>;
}

export default Logout;
