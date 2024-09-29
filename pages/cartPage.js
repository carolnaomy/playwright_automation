const { expect } = require('@playwright/test');

class CartPage {
    constructor() {
        this.ObjectsPage = {
            "ButtonCheckout": "[data-test='checkout']",
            "ButtonProductCart": "[data-test='shopping-cart-link']",
            "ProductCartItem": "[data-test='inventory-item']",
            "UrlCart": "https://www.saucedemo.com/cart.html",
            "UrlCheckoutOne":"https://www.saucedemo.com/checkout-step-one.html",
            "UrlCheckoutTwo":"https://www.saucedemo.com/checkout-step-two.html",
            "UrlChecktouComplete": "https://www.saucedemo.com/checkout-complete.html",
            "CheckoutFirstNameInput": "[data-test='firstName']",
            "CheckoutLastNameInput": "[data-test='lastName']",
            "CheckoutZipCodeInput": "[data-test='postalCode']",
            "CheckoutContiueButton": "[data-test='continue']",
            "CheckoutFinishButton": "[data-test='finish']",
            "FirstNameValue": "Ana",
            "LastNameValue": "Silva",
            "ZipCodeValue": "00212400",
            "ButtonRemoveProductCart": "[data-test='remove-sauce-labs-backpack']",
        }
    }


    async openCart(){
        await page.locator(this.ObjectsPage.ButtonProductCart).click();
    }

    async removeProductCart(){
        await page.locator(this.ObjectsPage.ButtonRemoveProductCart).click();
    }

    async checkoutCart(){
        await page.locator(this.ObjectsPage.ButtonCheckout).click();
    }

    async getQtdProductCart(){
        return await page.locator(this.ObjectsPage.ProductCartItem).count();
    }

    async checkoutFillFirstName(value){
        await page.locator(this.ObjectsPage.CheckoutFirstNameInput).fill(value);
    }

    async checkoutFillLastName(value){
        await page.locator(this.ObjectsPage.CheckoutLastNameInput).fill(value);
    }

    async checkoutFillZipCode(value){
        await page.locator(this.ObjectsPage.CheckoutZipCodeInput).fill(value);
    }

    async continueCheckout(){
        await page.locator(this.ObjectsPage.CheckoutContiueButton).click();
    }

    async finishCheckout(){
        await page.locator(this.ObjectsPage.CheckoutFinishButton).click();
    }

}

module.exports = { CartPage: CartPage }