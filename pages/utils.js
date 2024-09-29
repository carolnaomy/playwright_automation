const { expect } = require('@playwright/test');

class Utils {
    async validatePage(valuePage){
        const currentUrl = page.url();
        expect(currentUrl).toBe(valuePage);
    }
}

module.exports = { Utils: Utils }