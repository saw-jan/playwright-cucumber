const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("navigated google.com", async function () {
  await page.goto("/");
});

When("I search {string}", async function (searchTerm) {
  await page.type("input[name=q]", searchTerm);
  await page.keyboard.press("Enter");
});

Then("I should see search list", async function () {
  await expect(await page.locator("id=search")).toBeVisible();
});
