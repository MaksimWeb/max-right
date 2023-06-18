import { useAppDispatch } from '@/store/hooks';
import { IUser, setUser } from '@/store/users';
import { useState } from 'react';

export function useUserCredentials() {
  const dispatch = useAppDispatch();

  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  const saveUser = (message: IUser) => {
    dispatch(setUser(message));

    setUserProfile(message);

    if (typeof window !== 'undefined') {
      if (!window.sessionStorage.getItem('auth')) {
        window.sessionStorage.setItem('auth', JSON.stringify(message));
      } else {
        const oldUser = JSON.parse(window.sessionStorage.getItem('auth') ?? '');

        if (oldUser.username !== message.username) {
          window.sessionStorage.setItem('auth', JSON.stringify(message));
        }
      }
    }
  };

  const getUser = (): IUser | null => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem('auth');
      const user = JSON.parse(item ?? '{}');

      return Object.keys(user).length ? user : null;
    }

    return null;
  };

  return { user: getUser(), saveUser };
}
