import {
  post,
  postComments,
  posts,
} from '../../constants/apiRoutes/postRoutes';
import { PostDto } from './models/PostDto';
import { CommentDto } from './models/CommentDto';

export const fetchPosts = async (): Promise<PostDto[]> => {
  const response = await fetch(posts);

  return response.json();
};

export const fetchPost = async (postId: number): Promise<PostDto> => {
  const response = await fetch(post(postId));

  return response.json();
};

export const fetchPostComments = async (postId: number): Promise<CommentDto[]> => {
  const response = await fetch(postComments(postId));

  return response.json();
};
