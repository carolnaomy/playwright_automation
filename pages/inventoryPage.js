const { expect } = require('@playwright/test');

class InventoryPage {
    constructor() {
        this.ObjectsPage = {
            "UrlInvetory": "https://www.saucedemo.com/inventory.html",
            "DropDownProductSort": "[data-test='product-sort-container']",
            "InventoryList": "[data-test='inventory-item-name']",
            "PriceAsc": "lohi",
            "PriceDesc": "hilo",
            "NameAsc": "az",
            "NameDesc": "za",
            "FirstItemNameAsc": "Sauce Labs Backpack",
            "FirstItemNameDesc":"Test.allTheThings() T-Shirt (Red)",
            "FirstItemPriceAsc": "Sauce Labs Onesie",
            "FirstItemPriceDesc": "Sauce Labs Fleece Jacket",
            "UrlFirstProduct": "https://www.saucedemo.com/inventory-item.html?id=4",
            "ButtonAddProductCart": "[data-test='add-to-cart-sauce-labs-backpack']",
            "ButtonRemoveProdutctCart": "[data-test='remove-sauce-labs-backpack']",
            "ProductCart": "[data-test='shopping-cart-link']",
            "UrlCart": "https://www.saucedemo.com/cart.html",
            "ProductQtdCart": "[data-test='shopping-cart-badge']"

        }
    }
    
    async getFirstItem(){
        return await page.locator(this.ObjectsPage.InventoryList).first().textContent();
    }


    async orderProductBy(sortValue){
        let dropDown = await page.locator(this.ObjectsPage.DropDownProductSort);
        await dropDown.selectOption( {value: sortValue });
    }

    async openFirstProduct(){
        return await page.locator(this.ObjectsPage.InventoryList).first().click();
    }

    async addProductToCart(){
        await page.locator(this.ObjectsPage.ButtonAddProductCart).click();
    }

    async removeProductCart(){
        await page.locator(this.ObjectsPage.ButtonRemoveProdutctCart).click();
    }


    async getProductQtdCart(){
        return await page.locator(this.ObjectsPage.ProductQtdCart);
    }

}

module.exports = { InventoryPage: InventoryPage }