import React, { ReactNode } from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import { usePostContext } from './context';

interface OwnProps extends LoggerProps {
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Content: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => {
  usePostContext();

  return (
    <div className={`post__content ${className}`}>{children}</div>
  );
});

Content.displayName = 'Post.Content';

export default withLogger(Content);
