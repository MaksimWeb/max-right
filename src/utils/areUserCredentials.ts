import { IUser } from '@/store/users';

export function areUsersCredentials(message: unknown): message is IUser {
  return 'username' in (message as IUser);
}
