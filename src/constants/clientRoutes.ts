export const postsList = '/posts' as const;
export const postDetails = (id: number | string) => `/post/${id}` as const;
