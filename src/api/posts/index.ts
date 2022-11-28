import {
  post,
  postComments,
  posts,
} from '../../constants/apiRoutes/postRoutes';
import { PostDto } from './models/PostDto';
import { CommentDto } from './models/CommentDto';

export const fetchPosts = async (): Promise<PostDto[]> => {
  const response = await fetch(posts);

  if (response.ok) {
    return response.json();
  }

  return [];
};

export const fetchPost = async (postId: number): Promise<Nullable<PostDto>> => {
  const response = await fetch(post(postId));

  if (response.ok) {
    return response.json();
  }

  return null;
};

export const fetchPostComments = async (postId: number): Promise<CommentDto[]> => {
  const response = await fetch(postComments(postId));

  if (response.ok) {
    return response.json();
  }

  return [];
};
