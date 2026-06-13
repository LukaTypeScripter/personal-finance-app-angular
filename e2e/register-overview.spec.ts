import { test, expect } from '@playwright/test';

// NOTE: The register form (auth-register.html) renders fields via the
// <app-reusable-input> component. Its <label> is NOT associated with the
// <input> (no for/id, no aria-label), so getByLabel() cannot target the
// fields. Inputs render in DOM order: [0] name, [1] email, [2] password,
// [3] repeatPassword. The currency <select> defaults to 'USD'. Selectors
// below are adjusted to the real markup accordingly.
test('new user lands on a working overview page', async ({ page }) => {
  const email = `e2e_${Date.now()}@example.com`;
  const errors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('/auth/register');

  // Confirm the register page actually rendered the form.
  const inputs = page.locator('app-reusable-input input');
  await expect(inputs.first()).toBeVisible();

  await inputs.nth(0).fill('E2E User');        // name
  await inputs.nth(1).fill(email);             // email
  await inputs.nth(2).fill('secret123');       // password
  await inputs.nth(3).fill('secret123');       // repeatPassword
  // currency select defaults to USD (valid), so no action needed.

  await page.getByRole('button', { name: /create account|sign up|register/i }).click();

  await expect(page).toHaveURL(/dashboard\/overview/, { timeout: 15_000 });
  await expect(page.locator('app-overview')).toBeVisible();
  expect(errors.join('\n')).not.toContain('TypeError');
});
