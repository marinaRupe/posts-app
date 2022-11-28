import React, { ReactNode } from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import { useCommentContext } from '../context';

interface OwnProps extends LoggerProps {
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Title: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => {
  useCommentContext();

  return (
    <h4 className={`comment__title ${className}`}>{children}</h4>
  );
});

Title.displayName = 'Comment.Title';

export default withLogger(Title);
