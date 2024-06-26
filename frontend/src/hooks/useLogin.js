import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { API } from "../api/api";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await API.post(
        "/api/auth/login",
        {
          username,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // const res = await fetch(`${API}/api/auth/login`, {
      //   credentials: "include",
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password }),
      // });

      // const data = await res.json();
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
