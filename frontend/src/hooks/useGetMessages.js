import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { API } from "../api/api";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/messages/${selectedConversation._id}`);
        // const res = await fetch(
        //   `${API}/api/messages/${selectedConversation._id}`,
        //   {
        //     credentials: "include",
        //   }
        // );
        // const data = await res.json();
        if (res.data.error) throw new Error(res.data.error);
        setMessages(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
