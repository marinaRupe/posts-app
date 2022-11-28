import React, { createContext } from 'react';

import {
  Post,
  PostsReducerAction,
} from './reducer';

export const PostsContext = createContext<Post[]>([]);
export const PostsDispatchContext = createContext<Nullable<React.Dispatch<PostsReducerAction>>>(null);
