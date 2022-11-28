import React, {
  ReactNode,
  useCallback,
} from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import {
  CommentContext,
  useCommentListContext,
} from '../context';
import Content from './Content';
import Title from './Title';

interface CommentComposition {
  Content: typeof Content;
  Title: typeof Title;
}

interface OwnProps extends LoggerProps {
  commentId: number;
	children: ReactNode;
  className?: string;
  onClick?: (commentId: number) => void;
}

type Props = OwnProps;

const Comment: React.FC<Props> = React.memo<Props>(({
  children,
  commentId,
  className = '',
  onClick,
}) => {
  useCommentListContext();

  const handleClick = useCallback(() => {
    onClick?.(commentId);
  }, [
    onClick,
    commentId,
  ]);

  return (
    <CommentContext.Provider value={{}}>
      <div
        className={`comment ${className}`}
        onClick={handleClick}
      >
        {children}
      </div>
    </CommentContext.Provider>
  );
});

Comment.displayName = 'Comment';

const CommentWithLogger = withLogger(Comment) as typeof Comment & CommentComposition;

CommentWithLogger.Content = Content;
CommentWithLogger.Title = Title;

export default CommentWithLogger;
