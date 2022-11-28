import React from 'react';

import { Post as PostItem } from '../../reducers/posts/reducer';
import withLogger, { LoggerProps } from '../hoc/withLogger';
import Post from './Post';

interface OwnProps extends LoggerProps {
	posts: PostItem[];
  onClickOnPost?: (postId: number) => void;
  className?: string;
  customListItemClass?: string;
}

type Props = OwnProps;

const PostsList: React.FC<Props> = React.memo<Props>(({
  posts,
  onClickOnPost,
  className = '',
  customListItemClass = '',
}) => {
  const renderPost = (post: PostItem) => (
    <Post
      key={post.id}
      postId={post.id}
      onClick={onClickOnPost}
      className={customListItemClass}
    >
      <Post.Title>{post.title}</Post.Title>
      <Post.Author>{post.user?.name ?? ''}</Post.Author>
      <Post.Content>{post.body}</Post.Content>
    </Post>
  );

  return (
    <div className={className}>{posts.map(renderPost)}</div>
  );
});

PostsList.displayName = 'PostsList';

export default withLogger(PostsList);
