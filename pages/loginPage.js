const { expect } = require('@playwright/test');

class LoginPage {
    constructor() {
        this.ObjectsPage = {
            "Url": "https://www.saucedemo.com/",
            "LoginField": '[data-test="username"]',
            "PasswordField": '[data-test="password"]',
            "LoginButton": '[data-test="login-button"]',
            "ErrorField": '[data-test="error"]',
            "ValidUser": "standard_user",
            "InvalidUser": "teste_standard",
            "ValidPassword": "secret_sauce",
            "InvalidPassword": "teste",
            "MessageUserRequired": "Epic sadface: Username is required",
            "MessagePasswordRequired": "Epic sadface: Password is required",
            "MessageUserOrPasswordNotMatch": "Epic sadface: Username and password do not match any user in this service",
        }
    }

    async navegatTo() {
        await page.goto(this.ObjectsPage.Url);
    }

    async fillLoginField(value) {
        await page.locator(this.ObjectsPage.LoginField).fill(value);
    }

    async fillPasswordField(value) {
        await page.locator(this.ObjectsPage.PasswordField).fill(value);
    }
    
    async clickLoginButton() {
        await page.locator(this.ObjectsPage.LoginButton).click();
    }

    async getErrorMessage() {
        let error = await page.locator(this.ObjectsPage.ErrorField);
        return error.textContent();
    }

}

module.exports = { LoginPage: LoginPage }