import React, { ReactNode } from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import { useCommentContext } from '../context';

interface OwnProps extends LoggerProps {
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Content: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => {
  useCommentContext();

  return (
    <div className={`comment__content ${className}`}>{children}</div>
  );
});

Content.displayName = 'Comment.Content';

export default withLogger(Content);
