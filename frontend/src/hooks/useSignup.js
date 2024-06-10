import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { API } from "../api/api";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await API.post(
        "/api/auth/signup",
        {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // const res = await fetch(`${API}/api/auth/signup`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     fullName,
      //     username,
      //     password,
      //     confirmPassword,
      //     gender,
      //   }),
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

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
