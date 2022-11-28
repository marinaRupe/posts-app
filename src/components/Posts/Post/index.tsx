import React, {
  ReactNode, useCallback, useMemo,
} from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import Content from './Content';
import Title from './Title';
import Author from './Author';
import { PostContext } from './context';

interface PostComposition {
  Content: typeof Content;
  Title: typeof Title;
  Author: typeof Author;
}

interface OwnProps extends LoggerProps {
  postId: number;
	children: ReactNode;
  className?: string;
  onClick?: (postId: number) => void;
}

type Props = OwnProps;

const Post: React.FC<Props> = React.memo(({
  postId,
  children,
  className = '',
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick?.(postId);
  }, [
    onClick,
    postId,
  ]);

  const clickable: boolean = onClick !== undefined;
  const value = useMemo(() => ({ clickable }), [clickable]);

  return (
    <PostContext.Provider value={value}>
      <div
        className={`post ${clickable ? 'post--clickable' : ''} ${className}`}
        onClick={handleClick}
      >
        {children}
      </div>
    </PostContext.Provider>
  );
});

Post.displayName = 'Post';

const PostWithLogger = withLogger(Post) as typeof Post & PostComposition;

PostWithLogger.Content = Content;
PostWithLogger.Title = Title;
PostWithLogger.Author = Author;

export default PostWithLogger;
