import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://10.0.2.2:81/chat');

const useChat = () => {
  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to server!!');
      socket.emit('join', 'mimi');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('client', ss => {
      console.log('chatachat', ss);
      //setMessages(prevMessages => [...prevMessages, {senderId, text}]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = (message: string) => {
    socket.emit('send', message);
  };

  return {
    sendMessage,
  };
};

export default useChat;
