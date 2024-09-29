const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../pages/loginPage")
const { InventoryPage } = require("../pages/inventoryPage")
const { Utils } = require("../pages/utils")

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage();
const utils = new Utils();


test('Ordenação de produtos por nome', async ({ page }) => {
    global.page = page
  
    await loginPage.navegatTo();
  
    await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
    await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
    await loginPage.clickLoginButton();
  

    //produto ordenado por nome crescente
    await inventoryPage.orderProductBy(inventoryPage.ObjectsPage.NameAsc);
  
    let itemNameAsc = await inventoryPage.getFirstItem();

    expect(itemNameAsc).toContain(inventoryPage.ObjectsPage.FirstItemNameAsc);

    //produto ordenado por nome decrescente

    await inventoryPage.orderProductBy(inventoryPage.ObjectsPage.NameDesc);
  
    let itemNameDesc = await inventoryPage.getFirstItem();

    expect(itemNameDesc).toContain(inventoryPage.ObjectsPage.FirstItemNameDesc);

});

test('Ordenação de produtos por preço', async ({ page }) => {
    global.page = page
  
    await loginPage.navegatTo();
  
    await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
    await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
    await loginPage.clickLoginButton();
  
    //Produto Ordenado por preco crescente
    await inventoryPage.orderProductBy(inventoryPage.ObjectsPage.PriceAsc);
  
    let itemPriceAsc = await inventoryPage.getFirstItem();

    expect(itemPriceAsc).toContain(inventoryPage.ObjectsPage.FirstItemPriceAsc);

    //Produto Ordenado por preco decrescente

    await inventoryPage.orderProductBy(inventoryPage.ObjectsPage.PriceDesc);
  
    let itemPriceDesc = await inventoryPage.getFirstItem();

    expect(itemPriceDesc).toContain(inventoryPage.ObjectsPage.FirstItemPriceDesc);

});

test('Acessar a página do produto', async ({ page }) => {
    global.page = page

    await loginPage.navegatTo();
  
    await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
    await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
    await loginPage.clickLoginButton();

    await inventoryPage.openFirstProduct();

    await utils.validatePage(inventoryPage.ObjectsPage.UrlFirstProduct);

});

test('Adicionar/Remover item do carrinho na pagina do inventário', async ({ page }) => {
    global.page = page

    await loginPage.navegatTo();
  
    await loginPage.fillLoginField(loginPage.ObjectsPage.ValidUser);
    await loginPage.fillPasswordField(loginPage.ObjectsPage.ValidPassword);
    await loginPage.clickLoginButton();

    await inventoryPage.addProductToCart();

    let productAddQtd = await inventoryPage.getProductQtdCart();

    expect(await productAddQtd.textContent()).toContain("1");

    await inventoryPage.removeProductCart();

    let productRemovedQtd = await inventoryPage.getProductQtdCart();

    expect(await productRemovedQtd.count()).toBe(0);
});