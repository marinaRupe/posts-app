const apiUrl = process.env.REACT_APP_API_URL;

export const users = `${apiUrl}/users`;

export const user = (userId: number) => `${users}/${userId}`;

export const usersByIds = (userIds: number[]) => `${users}?${userIds.map((id) => `${id}=${id}`).join('&')}`;
