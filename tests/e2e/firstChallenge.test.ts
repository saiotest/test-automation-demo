import { test, expect } from '@playwright/test';

test('testeando el componente buttons', async ({ page }) => {
    await page.goto('https://dojo.upexgalaxy.com')

    await page.getByText('Buttons', { exact: true }).click();

    // Page: /buttons

    // ARRANGE
    const oneTimerButton = page.getByTestId('click-button');
    const twiceTimerButton = page.getByTestId('double-click-button');
    const threeTimerButton = page.getByTestId('right-click-button');

    const oneTimerResult = page.getByTestId('click-count');
    const twiceTimerResult = page.getByTestId('double-click-count');
    const threeTimerResult = page.getByTestId('right-click-count');

    // ACT
    await oneTimerButton.click();
    await twiceTimerButton.dblclick();
    await threeTimerButton.click({ button: 'right' });

    // ASSERT
    await expect(oneTimerResult).toHaveText(/\b1\b/);
    await expect(twiceTimerResult).toHaveText(/\b1\b/);
    await expect(threeTimerResult).toHaveText(/\b1\b/);
})