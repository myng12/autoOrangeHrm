import * as swd from 'selenium-webdriver';

class PIMPage {
    constructor(driver){
        this.driver = driver;
        this.title = swd.By.xpath('//*/h5[contains(@class,"oxd-table-filter-title")]');

        this.employeeNameTxb = swd.By.xpath('//*/label[text()="Employee Name"]/ancestor::div[contains(@class,"oxd-input-field-bottom-space")]//input');
        this.employeeIdtxb = swd.By.xpath('//*/label[text()="Employee Id"]/ancestor::div[contains(@class,"oxd-input-field-bottom-space")]//input');

        this.employmentStatusDropdown = swd.By.xpath('//*/label[text()="Employment Status"]/ancestor::div[contains(@class,"oxd-input-group__label-wrapper")]//following::div[contains(@class,"oxd-select-wrapper")][1]');
        this.fullTimeContractOption = swd.By.xpath('//*/span[text()="Full-Time Contract"]');
        this.freelanceOption = swd.By.xpath('//*/span[text()="Freelance"]');

        this.includeDropdown = swd.By.xpath('//*/label[text()="Include"]/ancestor::div[contains(@class,"oxd-input-group__label-wrapper")]//following::div[contains(@class,"oxd-select-wrapper")][1]');
        this.currentAndPastEmployeesOption = swd.By.xpath('//*/span[text()="Current and Past Employees"]');

        this.jobTitleDropdown = swd.By.xpath('//*/label[text()="Job Title"]/ancestor::div[contains(@class,"oxd-input-field-bottom-space")]//following::div[contains(@class,"oxd-select-wrapper")]');
        this.qaEngineerOption = swd.By.xpath('//*/span[text()="QA Engineer"]');

        this.subUnitDropdown = swd.By.xpath('//*/label[text()="Sub Unit"]/ancestor::div[contains(@class,"oxd-input-field-bottom-space")]//following::div[contains(@class,"oxd-select-wrapper")]');
        this.engineeringOption = swd.By.xpath('//*/span[text()="Engineering"]');

        this.searchButton = swd.By.xpath('//*/button[@type="submit"]');
        this.resultOfTable = swd.By.xpath('//*/div[contains(@class,"orangehrm-horizontal-padding orangehrm-vertical-padding")]/span');

        this.toastMessage = swd.By.xpath('//*[@id="oxd-toaster_1"]//p[contains(@class,"oxd-text--toast-message")]');

        this.sortIconOfIdColumn = swd.By.xpath('//*/div[text()="Id"]/div/i[contains(@class,"oxd-table-header-sort-icon")]');
        this.sortIconOfJobTitleColumn = swd.By.xpath('//*/div[text()="Job Title"]/div/i[contains(@class,"oxd-table-header-sort-icon")]');

        driver.manage().setTimeouts({ implicit: 10000 });

    }

    async isTitleDisplayed() {
        const title = await this.driver.findElement(this.title);
        return await title.isDisplayed();
    }

    async setFullTimeContractToEmploymentStatus() {
        await this.driver.findElement(this.employmentStatusDropdown).click();
        await this.driver.findElement(this.fullTimeContractOption).click()
    }
    async setFreelanceToEmploymentStatus() {
        await this.driver.findElement(this.employmentStatusDropdown).click();
        await this.driver.findElement(this.freelanceOption).click()
    }

    async setCurrentAndPastEmployeesToInclude() {
        await this.driver.findElement(this.includeDropdown).click();
        await this.driver.findElement(this.currentAndPastEmployeesOption).click()
    }

    async setQAEngineerToJobTitleOption() {
        await this.driver.findElement(this.jobTitleDropdown).click();
        await this.driver.findElement(this.qaEngineerOption).click()
    }

    async setEngineeringToSubUnitOption() {
        await this.driver.findElement(this.subUnitDropdown).click();
        await this.driver.findElement(this.engineeringOption).click()
    }

    async clickSearchButton() {
        const searchButton = await this.driver.findElement(this.searchButton);
        await searchButton.click();
    } 

    async getRecordCount() {
        const tableResultText = this.driver.findElement(this.resultOfTable);
        const text = await driver.executeScript('return arguments[0].textContent', tableResultText);

        console.log(text);
    }

    async SortID() {
        const sortIconOfIdColumn = await this.driver.findElement(this.sortIconOfIdColumn);
        await sortIconOfIdColumn.click();
    }

    async SortJobTitle() {
        const sortIconOfJobTitleColumn = await this.driver.findElement(this.sortIconOfJobTitleColumn);
        await sortIconOfJobTitleColumn.click();
    }

    async setEmployeeName(employeeName) {
        const employeeNameField = await this.driver.findElement(this.employeeNameTxb);
        await employeeNameField.sendKeys(employeeName);
    }

    async setEmployeeId(employeeId) {
        const employeeIdField = await this.driver.findElement(this.employeeIdtxb);
        await employeeIdField.sendKeys(employeeId);
    }

    async isNotificationDisplayed() {
        const notification = await this.driver.findElement(this.toastMessage);
        return await notification.isDisplayed();
    }

    async getNotificationContent() {
        const notificationMessage = await this.driver.findElement(this.toastMessage);
        await notificationMessage.getText();
    }
}

export {PIMPage}