// @ts-check
const { test, expect } = require("@playwright/test");

test("homepage has Playwright in title and get started link linking to the intro page", async ({
  page,
}) => {
  await page.goto("https://google.com/");

  await page.type("input[name=q]", "JankariTech");
  await page.keyboard.press("Enter");

  await expect(await page.locator("id=search")).toBeVisible();
});
