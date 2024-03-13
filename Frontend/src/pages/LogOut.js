import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return logout;
};

export default useLogout;
