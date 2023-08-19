import { By } from 'selenium-webdriver';

class HomePage {
    constructor(driver){
        this.driver = driver;
        this.avatar = By.xpath('//*/img[@class="oxd-userdropdown-img"]');
        this.pIMMenu = By.xpath('//*/a[contains(@href,"viewPimModule")]');

    }

    async isAvatarDisplayed() {
        const avatar = await this.driver.findElement(this.avatar);
        return await avatar.isDisplayed();
    }

    async clickPIMMenu() {
        const pIMMenu = await this.driver.findElement(this.pIMMenu);
        await pIMMenu.click();

    }
}

export {HomePage}