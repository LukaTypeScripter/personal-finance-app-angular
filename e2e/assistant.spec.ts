import { test, expect } from '@playwright/test';

test('assistant shows user message and AI reply', async ({ page }) => {
  // Seed auth so the route guard passes. authGuard -> AuthService.getToken()
  // -> StorageService.getItem('token'), so the localStorage key is 'token'.
  await page.addInitScript(() => localStorage.setItem('token', 'e2e-fake-token'));

  await page.route('**/graphql', async route => {
    const body = route.request().postDataJSON();
    const op = body?.operationName;
    if (op === 'Me') {
      return route.fulfill({ json: { data: { me: { id: 'u1', email: 'e2e@x.com', name: 'E2E', currency: 'USD' } } } });
    }
    if (op === 'SendChatMessage') {
      return route.fulfill({ json: { data: { sendChatMessage: {
        id: 'm1', role: 'assistant', content: 'You spent 50 USD on Food.', createdAt: '', conversationId: 'c1',
      } } } });
    }
    return route.fulfill({ json: { data: {} } });
  });

  await page.goto('/dashboard/assistant');
  await page.getByTestId('assistant-input').fill('How much did I spend on food?');
  await page.getByTestId('assistant-send').click();

  await expect(page.getByTestId('assistant-messages')).toContainText('How much did I spend on food?');
  await expect(page.getByTestId('assistant-messages')).toContainText('You spent 50 USD on Food.');
});
