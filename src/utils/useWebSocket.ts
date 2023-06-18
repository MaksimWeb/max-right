import type { Post } from '@/pages/posts';
import { useEffect, useRef, useState } from 'react';

export interface IMessage {
  event: string;
  id: string;
  username: string;
  message?: string | Post[];
}

export const useWebSocket = () => {
  const socket = useRef<WebSocket | null>(null);

  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<IMessage | null>(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:1000');

    socket.current.onopen = (event) => {
      setConnected(true);
      console.log('Соединение установлено');
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessage(message);
    };

    socket.current.onclose = (event) => {
      console.log(event.reason);
      setMessage(null);
      setConnected(false);
    };

    socket.current.onerror = () => {
      console.log('Произошла ошибка с подключением сокета');
    };

    () => {
      socket.current?.close();
    };
  }, []);

  return {
    socket: socket.current,
    message,
    connected,
    setMessage,
    setConnected,
  };
};
