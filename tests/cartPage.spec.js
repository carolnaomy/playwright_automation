const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../pages/loginPage")
const { InventoryPage } = require("../pages/inventoryPage")
const { CartPage } = require("../pages/cartPage")
const { Utils } = require("../pages/utils")


const loginPage = new LoginPage()
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const utils = new Utils();

test('Finalizar a compra com um produto', async ({ page }) => {
   global.page = page

   await loginPage.navegatTo();

   await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
   await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
   await loginPage.clickLoginButton();

   await inventoryPage.addProductToCart();

   await cartPage.openCart();
   await utils.validatePage(cartPage.ObjectsPage.UrlCart);
   
   await cartPage.checkoutCart();
   await utils.validatePage(cartPage.ObjectsPage.UrlCheckoutOne);

   await cartPage.checkoutFillFirstName(cartPage.ObjectsPage.FirstNameValue);
   await cartPage.checkoutFillLastName(cartPage.ObjectsPage.LastNameValue);
   await cartPage.checkoutFillZipCode(cartPage.ObjectsPage.ZipCodeValue);

   await cartPage.continueCheckout();
   await utils.validatePage(cartPage.ObjectsPage.UrlCheckoutTwo);
   expect(await cartPage.getQtdProductCart()).toBe(1);

   await cartPage.finishCheckout();
   await utils.validatePage(cartPage.ObjectsPage.UrlChecktouComplete);

});

test('Adicionar item pelo inventário e remover pelo carrinho', async ({ page }) => {
   global.page = page

   await loginPage.navegatTo();
 
   await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
   await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
   await loginPage.clickLoginButton();

   await inventoryPage.addProductToCart();

   await cartPage.openCart();
   await utils.validatePage(cartPage.ObjectsPage.UrlCart);

   let productAddQtd = await cartPage.getQtdProductCart();

   expect(await productAddQtd).toBe(1);

   await cartPage.removeProductCart();

   let productRemovedQtd = await cartPage.getQtdProductCart();

   expect(await productRemovedQtd).toBe(0);

});

test('Finalizar a compra sem produto', async ({ page }) => {
   global.page = page

   await loginPage.navegatTo();

   await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
   await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
   await loginPage.clickLoginButton();

   await cartPage.openCart();
   await utils.validatePage(cartPage.ObjectsPage.UrlCart);
   
   await cartPage.checkoutCart();
   await utils.validatePage(cartPage.ObjectsPage.UrlCart);
});