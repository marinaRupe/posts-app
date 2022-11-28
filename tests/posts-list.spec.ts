import { test, expect } from '@playwright/test';

const appUrl = 'http://localhost:3000';

test('posts list shows search input and posts', async ({ page }) => {
  await page.goto(`${appUrl}/posts`);

  const searchInput = page.getByPlaceholder('Search');
  await expect(searchInput).toBeVisible();

  const postsList = page.getByTestId('posts-list');
  await expect(postsList).toBeVisible();
});

test('clicking on post redirects to post details page', async ({ page }) => {
  await page.goto(`${appUrl}/posts`);

  const firstPostIndex = 0;

  const post = page.getByTestId('post').nth(firstPostIndex);
  expect(post).toBeVisible();
  
  const postTitle = page.getByTestId('post-title').nth(firstPostIndex);
  expect(postTitle).toBeVisible();

  const postTitleText = await postTitle.textContent();
  expect(postTitleText).not.toBeFalsy();

  await post.click();

  await expect(page).toHaveURL(/.*post/);

  const postDetailsTitle = page.getByTestId('post-title');
  const postDetaiksTitleText = await postDetailsTitle.textContent();
  expect(postDetaiksTitleText).toBe(postTitleText!);
});
