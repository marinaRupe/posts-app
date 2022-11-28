import {
  createContext,
  useContext,
} from 'react';

interface PostContextValue {
  clickable: boolean;
}

export const PostContext = createContext<PostContextValue | undefined>(undefined);

export const usePostContext = () => {
  const context = useContext(PostContext);

  return context;
};
