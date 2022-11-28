import React, { ReactNode } from 'react';

import withLogger, { LoggerProps } from '../../hoc/withLogger';
import { usePostContext } from './context';

interface OwnProps extends LoggerProps {
  children: ReactNode;
  className?: string;
}

type Props = OwnProps;

const Title: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
}) => {
  const context = usePostContext();

  return (
    <h2 className={`post__title ${context?.clickable ? 'post__title--clickable' : ''} ${className}`}>{children}</h2>
  );
});

Title.displayName = 'Post.Title';

export default withLogger(Title);
