import {test, expect} from '@playwright/test';

test.describe('Signin', () => {
  test('form works correctly', async ({page}) => {
    await page.goto('/');

    await expect(page).toHaveURL(/signin/);

    await page.getByTestId('username').fill('Davit');
    await page.getByTestId('password').fill('123abc45d');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\//);
  });
});

test.describe.only('Todo', () => {
  test.use({
    storageState: {
      cookies: [], origins: [
        {
          "origin": "http://localhost:3050/",
          "localStorage": [
            {
              "name": "username",
              "value": "Davit"
            },
            {
              "name": "token",
              "value": "12313qs21"
            },
          ]
        }
      ]
    }
  });

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('todo list works properly', async ({page}) => {
    await expect(page.getByRole('heading')).toHaveText('Davit\'s todo list');

    await page.getByRole('button', {name: 'Add Todo'}).click();
    await page.getByTestId('todo-modal-title').fill('Todo 1');
    await page.getByTestId('todo-modal-date').fill('2023-11-10');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('todo-list')).toHaveText('Todo 1November 10, 2023');

    const firstTodo = page.locator('tbody tr:nth-child(1)');
    await firstTodo.getByTestId('edit').click();

    await expect(page.getByTestId('todo-modal-title')).toHaveValue('Todo 1');
    await expect(page.getByTestId('todo-modal-date')).toHaveValue('2023-11-10');
    await page.getByTestId('todo-modal-title').fill('Todo 1 edited');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('todo-list')).toHaveText('Todo 1 editedNovember 10, 2023');
    page.on('dialog', dialog => dialog.accept());
    await firstTodo.getByTestId('delete').click();

    await expect(page.getByTestId('todo-list')).not.toBeVisible();
  });
});