import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { API } from "../api/api";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await API.post(
        `/api/messages/send/${selectedConversation._id}`,
        {
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const res = await fetch(
      //   `${API}/api/messages/send/${selectedConversation._id}`,
      //   {
      //     method: "POST",
      //     credentials: "include",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ message }),
      //   }
      // );
      // const data = await res.json();
      if (res.data.error) throw new Error(res.data.error);

      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
