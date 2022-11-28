import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import {
  postDetails,
  postsList,
} from '../constants/clientRoutes';
import PostsListPage from '../pages/Posts/PostsListPage';
import PostDetailsPage from '../pages/Posts/PostDetailsPage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route
      path={'/'}
      element={(
        <Navigate
          to={postsList}
          replace={true}
        />
      )}
    />
    <Route
      path={postsList}
      element={<PostsListPage />}
    />
    <Route
      path={postDetails(':postId')}
      element={<PostDetailsPage />}
    />
  </Route>
));

export default router;
