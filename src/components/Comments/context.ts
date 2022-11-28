import {
  createContext,
  useContext,
} from 'react';

interface CommentListContextValue {
  isExpanded: boolean;
}

export const CommentListContext = createContext<CommentListContextValue | undefined>(undefined);

export const useCommentListContext = () => {
  const context = useContext(CommentListContext);

  return context;
};

export const CommentContext = createContext<Record<string, unknown> | undefined>(undefined);

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  return context;
};
