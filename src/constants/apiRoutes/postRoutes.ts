const apiUrl = process.env.REACT_APP_API_URL;

export const posts = `${apiUrl}/posts`;

export const post = (postId: number) => `${posts}/${postId}`;

export const postComments = (postId: number) => `${post(postId)}/comments`;
