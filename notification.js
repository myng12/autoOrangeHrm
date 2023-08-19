import { assert } from 'chai';
import {LoginPage} from './pages/LoginPage.js';
import {HomePage} from './pages/HomePage.js';
import {PIMPage} from './pages/PIMPage.js';
import { Builder, Capabilities } from 'selenium-webdriver';

(async () => {
    const driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    const loginPage = new LoginPage(driver);
    const homePage = new HomePage(driver);
    const pIMPage = new PIMPage(driver);

    try {

        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();

        // Navigate to https://opensource-demo.orangehrmlive.com
        await loginPage.navigate();
        

        // Login with username is Admin and password is adnin123
        await loginPage.performLogin('Admin', 'admin123');


        // Verify user's avatar is displayed
        assert.equal(await homePage.isAvatarDisplayed(), true);

        // Click on PIM menu to navigate to PIM page
        await homePage.clickPIMMenu();

        assert.equal(await pIMPage.isTitleDisplayed(), true);

        // Set Employee Name is Dryan
        await pIMPage.setEmployeeName('Dryan');

        // Set Employee Id is 12345
        await pIMPage.setEmployeeId('12345');

        // Select Employment Status: Freelance
        await pIMPage.setFreelanceToEmploymentStatus();

        // Select Include: Current and Past Employees
        await pIMPage.setCurrentAndPastEmployeesToInclude();

        // Set Job Title is QA Engineer
        await pIMPage.setQAEngineerToJobTitleOption();

        // Set Sub Unit is Engineering
        await pIMPage.setEngineeringToSubUnitOption();

        // Click Search button
        await pIMPage.clickSearchButton();

        // Verify that A notification is displayed as 'No Records Found'
        console.log(pIMPage.isNotificationDisplayed());

        // Verify that the result of the search table is displayed as 'No Records Found'
        // await pIMPage.getRecordCount();




    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await driver.quit();
    }
})();