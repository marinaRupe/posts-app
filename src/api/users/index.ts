import {
  user,
  usersByIds,
} from '../../constants/apiRoutes/userRoutes';
import { UserDto } from './models/UserDto';

export const fetchUser = async (userId: number): Promise<UserDto> => {
  const response = await fetch(user(userId));

  return response.json();
};

export const fetchUsers = async (userIds: number[]): Promise<UserDto[]> => {
  const response = await fetch(usersByIds(userIds));

  return response.json();
};
