'use client';

import { useEffect, useState } from 'react';
import { GiDiamondsSmile, GiSharpSmile } from 'react-icons/gi';
import Button from './button';
import { Modal } from './modal';

import { areUsersCredentials } from '@/utils/areUserCredentials';

import { useUserCredentials } from '@/utils/useUserCredentials';
import { IMessage, useWebSocket } from '@/utils/useWebsocket';

export function Navbar() {
  const { user, saveUser } = useUserCredentials();

  const { socket, message, connected, setMessage, setConnected } =
    useWebSocket();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (message && areUsersCredentials(message)) {
      saveUser(message);
    }
  }, [message]);

  const handleConnect = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    window.sessionStorage.removeItem('auth');
  };

  const handleLogin = async (loginData: {
    login: string;
    password: string;
  }) => {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: loginData.login,
        password: loginData.password,
      }),
    });

    const userData = await response.json();

    const userCredentials: IMessage & { accessToken: string } = userData;

    if (userCredentials.accessToken) {
      setMessage(userCredentials);
      setShowModal(false);
      setConnected(true);
    } else {
      alert('Unauthorized');
    }
  };

  return (
    <div className='w-full flex justify-between bg-sky-400 py-5 px-2'>
      <h2 className='text-2xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-900'>
        Это блог свобдных мыслей
      </h2>

      <div className='flex items-center gap-x-5'>
        {connected && user && (
          <p className='text-2xl'>Добро пожаловать обратно, {user.username}</p>
        )}

        {connected && user ? (
          <Button
            text='Выйти'
            icon={GiSharpSmile}
            size={1.5}
            handleClick={handleClose}
          />
        ) : (
          <Button
            text='Войти'
            icon={GiDiamondsSmile}
            size={1.5}
            handleClick={handleConnect}
          />
        )}
      </div>

      {showModal && <Modal handleConnection={handleLogin} />}
    </div>
  );
}
