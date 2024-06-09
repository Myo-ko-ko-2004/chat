import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notisound from "../assets/audio/notification.mp3";
const useListenMessage = () => {
  const { socket } = useSocketContext();

  //   console.log(socket);

  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shakeAble = true;
      const sound = new Audio(notisound);
      sound.play();
      setMessages([...messages, newMessage]);
      //   console.log(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
  console.log(messages);

  //   return { messages };
};

export default useListenMessage;
