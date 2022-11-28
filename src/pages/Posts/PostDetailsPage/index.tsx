import React, {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import {
  fetchPost,
  fetchPostComments,
} from '../../../api/posts';
import { CommentDto } from '../../../api/posts/models/CommentDto';
import CommentsList from '../../../components/Comments/CommentsList';
import { fetchUser } from '../../../api/users/index';
import { Post as PostItem } from '../../../reducers/posts/reducer';
import withLogger, { LoggerProps } from '../../../components/hoc/withLogger';
import Post from '../../../components/Posts/Post';
import Comment from '../../../components/Comments/Comment';

type Props = LoggerProps;

const PostDetailsPage: React.FC<Props> = React.memo<Props>(() => {
  const [
    post,
    setPost,
  ] = useState<Nullable<PostItem>>(null);
  const [
    comments,
    setComments,
  ] = useState<CommentDto[]>([]);

  const { postId } = useParams();

  useEffect(() => {
    let ignore = false;

    if (!postId) {
      setPost(null);
      setComments([]);

      return;
    }

    const fetchPostDetails = async () => {
      const postDetails = await fetchPost(parseInt(postId));
      const user = await fetchUser(postDetails.userId);

      if (ignore === true) return;
      setPost({
        ...postDetails,
        user,
      });
    };

    const fetchComments = async () => {
      const commentsList = await fetchPostComments(parseInt(postId));

      if (ignore === true) return;
      setComments(commentsList);
    };

    fetchPostDetails();
    fetchComments();

    return () => {
      ignore = true;
    };
  }, [postId]);

  const renderComment = (comment: CommentDto) => (
    <Comment
      key={comment.id}
      commentId={comment.id}
    >
      <Comment.Title>{comment.name}</Comment.Title>
      <Comment.Content>{comment.body}</Comment.Content>
    </Comment>
  );

  if (!post) return null;

  return (
    <div>
      <Post postId={post.id}>
        <Post.Title>{post.title}</Post.Title>
        <Post.Author>{post.user?.name}</Post.Author>
        <Post.Content>{post.body}</Post.Content>
      </Post>
      <CommentsList className='post-details-page__comments-list'>
        {comments.map(renderComment)}
      </CommentsList>
    </div>
  );
});

PostDetailsPage.displayName = 'PostDetailsPage';

export default withLogger(PostDetailsPage);
