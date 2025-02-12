import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Logout() {
	const navigate = useNavigate();
	const { logout: signout } = useAuth();

	useEffect(() => {
		const logout = async () => {
			try {
				await axios.post(`${API_BASE_URL}/api/users/logout`, {});
				document.cookie =
					"jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
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
