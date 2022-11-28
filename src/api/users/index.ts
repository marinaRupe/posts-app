import {
  user,
  usersByIds,
} from '../../constants/apiRoutes/userRoutes';
import { UserDto } from './models/UserDto';

export const fetchUser = async (userId: number): Promise<Nullable<UserDto>> => {
  const response = await fetch(user(userId));

  if (response.ok) {
    return response.json();
  }

  return null;
};

export const fetchUsers = async (userIds: number[]): Promise<UserDto[]> => {
  const response = await fetch(usersByIds(userIds));

  if (response.ok) {
    return response.json();
  }

  return [];
};
