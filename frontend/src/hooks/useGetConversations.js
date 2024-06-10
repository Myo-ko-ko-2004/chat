import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API } from "../api/api";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await API.get("/api/users");
        // const res = await fetch(`${API}/api/users`, {
        //   credentials: "include",
        // });
        // const data = await res.json();
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setConversations(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
