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
        

        // Login with username is Admin and password is admin123
        await loginPage.performLogin('Admin', 'admin123');


        // Verify user's avatar is displayed
        assert.equal(await homePage.isAvatarDisplayed(), true);

        // Click on PIM menu to navigate to PIM page
        await homePage.clickPIMMenu();

        assert.equal(await pIMPage.isTitleDisplayed(), true);

        // Select Employment Status: Full-Time Contract
        await pIMPage.setFullTimeContractToEmploymentStatus();

        // Select Include: Current and Past Employees
        await pIMPage.setCurrentAndPastEmployeesToInclude();

        // Click Search button
        await pIMPage.clickSearchButton();

        // Verify that the result of the table is displayed as  '(*) Records Found' and * is more than 1
        // await pIMPage.getRecordCount();

        // Sort 'ID' in ascending
        await pIMPage.SortID();

        // Verify that the list of IDs is sorted in ascending order

        // Sort 'Job Title' in descending
        await pIMPage.SortJobTitle();

        // Verify that the list of ‘Job Title’ is sorted in descending order

    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await driver.quit();
    }
})();