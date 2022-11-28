import React, {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchPosts } from '../../../api/posts';
import { postDetails } from '../../../constants/clientRoutes';
import SearchInput from '../../../components/Inputs/SearchInput';
import PostsList from '../../../components/Posts/PostsList';
import {
  initialPostsReducerState,
  postsReducer,
} from '../../../reducers/posts/reducer';
import { PostActionTypes } from '../../../reducers/posts/actionTypes';
import {
  PostsContext,
  PostsDispatchContext,
} from '../../../reducers/posts/context';
import { fetchUsers } from '../../../api/users';
import withLogger, { LoggerProps } from '../../../components/hoc/withLogger';

type Props = LoggerProps;

const PostsListPage: React.FC<Props> = React.memo<Props>(() => {
  const [
    {
      allPosts,
      filteredPostIds,
    },
    dispatch,
  ] = useReducer(postsReducer, initialPostsReducerState);

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchUsersList = async (userIds: number[]) => {
      const usersList = await fetchUsers(userIds);

      if (ignore === true) return;
      dispatch({
        type: PostActionTypes.UpdatePostUsers,
        payload: usersList,
      });
    };

    const fetchPostsList = async () => {
      const postsList = await fetchPosts();

      if (ignore === true) return;
      dispatch({
        type: PostActionTypes.UpdatePosts,
        payload: postsList,
      });

      const userIds: number[] = Array.from(new Set(postsList.map((post) => post.userId)));
      fetchUsersList(userIds);
    };

    fetchPostsList();

    return () => {
      ignore = true;
    };
  }, []);

  const filterPostsByUserName = useCallback((userName: string) => {
    dispatch({
      type: PostActionTypes.FilterPosts,
      payload: userName,
    });
  }, []);

  const handleSearchInputChange = useCallback((searchInputValue: string) => {
    filterPostsByUserName(searchInputValue);
  }, [filterPostsByUserName]);

  const handleClickOnPost = useCallback((postId: number) => {
    navigate(postDetails(postId));
  }, [navigate]);

  const filteredPosts = useMemo(() => (
    allPosts.filter((post) => filteredPostIds.includes(post.id))
  ), [
    allPosts,
    filteredPostIds,
  ]);

  return (
    <PostsContext.Provider value={filteredPosts}>
      <PostsDispatchContext.Provider value={dispatch}>
        <div className='posts-list-page'>
          <div className='posts-list-page__search-input-container'>
            <SearchInput onChange={handleSearchInputChange} />
          </div>
          <PostsList
            posts={filteredPosts}
            onClickOnPost={handleClickOnPost}
            className={'posts-list-page__posts-list'}
          />
        </div>
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  );
});

PostsListPage.displayName = 'PostsListPage';

export default withLogger(PostsListPage);
