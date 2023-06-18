import { ChangeEvent, useRef } from 'react';
import Portal from './portal';
import ModalButton from './modal-button';

interface Props {
  handleConnection: (loginData: { login: string; password: string }) => void;
}

export function Modal({ handleConnection }: Props) {
  const dataRef = useRef({ login: '', password: '' });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: 'login' | 'password'
  ) => {
    dataRef.current[key] = e.target.value;
  };

  return (
    <Portal>
      <div className='flex flex-col gap-y-2 bg-white p-5 rounded-sm absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
        <input
          type='text'
          className='border p-2'
          placeholder='Enter login'
          onChange={(e) => handleChange(e, 'login')}
        />
        <input
          type='text'
          className='border p-2'
          placeholder='Enter password'
          onChange={(e) => handleChange(e, 'password')}
        />
        <ModalButton
          text='Login'
          data={dataRef.current}
          handleClick={handleConnection}
        />
      </div>
    </Portal>
  );
}
