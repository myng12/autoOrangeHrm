import { By } from 'selenium-webdriver';

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://opensource-demo.orangehrmlive.com/';
        this.usernameInput = By.name("username");
        this.passwordInput = By.name("password");
        this.loginButton = By.xpath('//*/button[contains(@class,"orangehrm-login-button")]');
    }

    async navigate() {
        await this.driver.get(this.url);
    }

    async setUsername(username) {
        const usernameField = await this.driver.findElement(this.usernameInput);
        await usernameField.sendKeys(username);
    }

    async setPassword(password) {
        const passwordField = await this.driver.findElement(this.passwordInput);
        await passwordField.sendKeys(password);
    }

    async clickLoginButton() {
        const loginButton = await this.driver.findElement(this.loginButton);
        await loginButton.click();
    }

    async performLogin(username, password) {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.driver.sleep(6000);
        await this.clickLoginButton();
    }

}

export {LoginPage}