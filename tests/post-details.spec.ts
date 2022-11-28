import { test, expect } from '@playwright/test';

const appUrl = 'http://localhost:3000';

test('post details shows post with comments', async ({ page }) => {
  const postId = 1;
  await page.goto(`${appUrl}/post/${postId}`);

  const post = page.getByTestId('post');
  await expect(post).toBeVisible();

  const postsList = page.getByTestId('comments-list');
  await expect(postsList).toBeVisible();
});
