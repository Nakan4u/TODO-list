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
        browser.get('http://localhost:8000');
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

        it('should show error when attempt submit with empty time field', function () {
            HomePage.addForm.timeField.sendKeys('');
            HomePage.addForm.submitButton.click();

            expect(HomePage.addForm.errors.timeRequired.isDisplayed()).toBeTruthy();
        });

        it('should show error when attempt submit with invalid time', function () {
            HomePage.addForm.timeField.sendKeys(browser.params.contactInvalid.time);
            HomePage.addForm.submitButton.click();

            expect(HomePage.addForm.errors.timePattern.isDisplayed()).toBeTruthy();
        });

    });

    describe('Call list', function () {
        it('should add new contact', function () {
            HomePage.addForm.nameField.sendKeys(browser.params.contactValid.name);
            HomePage.addForm.phoneField.sendKeys(browser.params.contactValid.phone);
            HomePage.addForm.timeField.sendKeys(browser.params.contactValid.time);
            HomePage.addForm.submitButton.click();

            HomePage.addForm.contactsList.all.then(function (contacts) {
                expect(contacts.length).toEqual(3);
            });

            HomePage.addForm.contactsList.names.then(function (contacts) {
                expect(contacts[0].getText()).toEqual(browser.params.contactValid.name);
            });

            HomePage.addForm.contactsList.phones.then(function (contacts) {
                expect(contacts[0].getText()).toEqual(browser.params.contactValid.convertedPhone);
            });

            HomePage.addForm.contactsList.times.then(function (contacts) {
                expect(contacts[0].getText()).toEqual(browser.params.contactValid.time);
            });
        });
        // TODO:
        // should sort time asc/desc
        // should sort names asc/desc
        // should remove contact
        // past contact should be checked
        // future contact should be checked

    });

});