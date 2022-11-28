import { PostDto } from '../../api/posts/models/PostDto';
import { PostActionTypes } from './actionTypes';
import { UserDto } from '../../api/users/models/UserDto';

export type Post = PostDto & { user?: UserDto; };

export type PostsReducerAction =
  { type: PostActionTypes.UpdatePosts; payload: Post[]; }
  | { type: PostActionTypes.UpdatePostUsers; payload: UserDto[]; }
  | { type: PostActionTypes.FilterPosts; payload: string; };

interface PostsReducerState {
  allPosts: Post[];
  filteredPostIds: number[];
}

export const initialPostsReducerState: PostsReducerState = {
  allPosts: [],
  filteredPostIds: [],
};

export const postsReducer = (postsState: PostsReducerState, action: PostsReducerAction): PostsReducerState => {
  switch (action.type) {
    case PostActionTypes.UpdatePosts: {
      const postsList = action.payload;

      return ({
        allPosts: postsList,
        filteredPostIds: postsList.map((post) => post.id),
      });
    }
    case PostActionTypes.UpdatePostUsers: {
      const postsList = postsState.allPosts.map((post) => {
        const users = action.payload;
        for (const user of users) {
          if (post.userId === user.id) {
            return ({
              ...post,
              user,
            });
          }
        }

        return post;
      });

      return ({
        ...postsState,
        allPosts: postsList,
      });
    }
    case PostActionTypes.FilterPosts: {
      const userName = action.payload.toLowerCase();

      const filteredPostIds: number[] = postsState.allPosts
        .filter((post) => post.user?.name.toLowerCase().includes(userName))
        .map((post) => post.id);

      return ({
        ...postsState,
        filteredPostIds,
      });
    }
    default: {
      throw Error('Unknown action');
    }
  }
};
