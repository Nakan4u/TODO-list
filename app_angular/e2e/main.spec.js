// spec.js
describe('ToDoCalls App', function () {

    var HomePageClass = require('./main.po.js'),
        HomePage,
        dv = browser.driver;

    beforeAll(function () {
        dv.manage().deleteAllCookies();
        HomePage = new HomePageClass();
    });

    beforeEach(function () {
        HomePage.getAppUrl();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('should have a title: ToDoCalls angular app', function () {
        expect(browser.getTitle()).toEqual('ToDoCalls angular app');
    });

    describe('Add call form', function () {

        it('should show error when attempt submit with empty name field', function () {
            HomePage.addForm.nameField.sendKeys('');
            HomePage.addForm.submitButton.click();

            expect(HomePage.addForm.errors.nameRequired.isDisplayed()).toBeTruthy();
        });

        it('should show error when attempt submit with empty phone field', function () {
            HomePage.addForm.phoneField.sendKeys('');
            HomePage.addForm.submitButton.click();

            expect(HomePage.addForm.errors.phoneRequired.isDisplayed()).toBeTruthy();
        });

        it('should show error when attempt submit with invalid phone number', function () {
            HomePage.addForm.phoneField.sendKeys(browser.params.contactInvalid.phone);
            HomePage.addForm.submitButton.click();

            expect(HomePage.addForm.errors.phonePattern.isDisplayed()).toBeTruthy();
        });
    });

});