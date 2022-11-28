import React, {
  ReactNode,
  useMemo,
} from 'react';

import withLogger, { LoggerProps } from '../hoc/withLogger';
import { CommentListContext } from './context';

interface OwnProps extends LoggerProps {
  children: ReactNode;
  className?: string;
  customListItemClass?: string;
  onClickOnComment?: (postId: number) => void;
  isExpanded?: boolean;
}

type Props = OwnProps;

const CommentsList: React.FC<Props> = React.memo<Props>(({
  children,
  className = '',
  isExpanded = true,
}) => {
  const value = useMemo(() => ({ isExpanded }), [isExpanded]);

  return (
    <CommentListContext.Provider value={value}>
      {
        isExpanded &&
        <div className={`comments-list ${className}`}>{children}</div>
      }
    </CommentListContext.Provider>
  );
});

CommentsList.displayName = 'CommentsList';

export default withLogger(CommentsList);
