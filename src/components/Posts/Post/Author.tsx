import React, { ReactNode } from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import { usePostContext } from './context';

interface OwnProps extends LoggerProps {
	children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Author: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => {
  usePostContext();

  return (
    <i className={`post__author ${className}`}>{children}</i>
  );
});

Author.displayName = 'Post.Author';

export default withLogger(Author);
