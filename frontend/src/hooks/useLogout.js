import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { API } from "../api/api";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await API.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const res = await fetch(`${API}/api/auth/logout`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      // });
      // const data = await res.json();
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
