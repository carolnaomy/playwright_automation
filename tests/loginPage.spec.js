// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../pages/loginPage")
const { InventoryPage } = require("../pages/inventoryPage")
const { Utils } = require("../pages/utils")


const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const utils = new Utils()

test('Login com credenciais válidas', async ({ page }) => {
  global.page = page

  await loginPage.navegatTo();

  await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
  await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
  await loginPage.clickLoginButton();

  await utils.validatePage(inventoryPage.ObjectsPage.UrlInvetory);
});


test('Login com credenciais inválidas', async ({ page }) => {
  global.page = page

  await loginPage.navegatTo();

  await loginPage.fillLoginField(loginPage.ObjectsPage.InvalidUser);
  await loginPage.fillPasswordField(loginPage.ObjectsPage.InvalidPassword);
  await loginPage.clickLoginButton();

  let errorMessage = await loginPage.getErrorMessage();

  expect(errorMessage).toContain(loginPage.ObjectsPage.MessageUserOrPasswordNotMatch);

});

test('Login com dados em brancos', async ({ page }) => {
  global.page = page

  await loginPage.navegatTo();

  await loginPage.clickLoginButton();

  let errorMessage = await loginPage.getErrorMessage();

  expect(errorMessage).toContain(loginPage.ObjectsPage.MessageUserRequired);

});

test('Login com username válido e senha em branco', async ({ page }) => {
  global.page = page

  await loginPage.navegatTo();
  await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
  
  await loginPage.clickLoginButton();

  let errorMessage = await loginPage.getErrorMessage();

  expect(errorMessage).toContain(loginPage.ObjectsPage.MessagePasswordRequired);

});