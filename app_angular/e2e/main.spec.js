// spec.js
describe('ToDoCalls App', function () {

    var HomePageClass = require('./main.po.js'),
        HomePage,
        dv = browser.driver;

    beforeAll(function () {
        dv.manage().deleteAllCookies();
        HomePage = new HomePageClass();

        // add delay before each test queue 100ms wait
        var origFn = browser.driver.controlFlow().execute;
        
        browser.driver.controlFlow().execute = function () {
            var args = arguments;

            origFn.call(browser.driver.controlFlow(), function () {
                return protractor.promise.delayed(100);
            });

            return origFn.apply(browser.driver.controlFlow(), args);
        };
        // end delay logik
    });

    beforeEach(function () {
        browser.get('http://localhost:8000/app');
        // browser.get('http://nakan4u.github.io/TODO-list/app_angular/dist/');
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

        it('should add new contact', function () {
            HomePage.addForm.nameField.sendKeys(browser.params.contactValid.name);
            HomePage.addForm.phoneField.sendKeys(browser.params.contactValid.phone);
            HomePage.addForm.timeField.sendKeys(browser.params.contactValid.time);
            HomePage.addForm.submitButton.click();

            HomePage.contactsList.all.then(function (contacts) {
                expect(contacts.length).toEqual(4);
            });

            HomePage.contactsList.names.then(function (contacts) {
                expect(contacts[3].getText()).toEqual(browser.params.contactValid.name);
            });

            HomePage.contactsList.phones.then(function (contacts) {
                expect(contacts[3].getText()).toEqual(browser.params.contactValid.convertedPhone);
            });

            HomePage.contactsList.times.then(function (contacts) {
                expect(contacts[3].getText()).toEqual(browser.params.contactValid.time);
            });
        });
    });

    describe('Call list', function () {
        it('should sort items by time ASC by default', function () {
            HomePage.contactsList.times.then(function (contacts) {
                expect(contacts[0].getText()).toEqual('07:33');
            });
        });
        it('should sort items by time DESC', function () {
            HomePage.contactsList.timeFilter.click();

            HomePage.contactsList.times.then(function (contacts) {
                expect(contacts[0].getText()).toEqual('09:13');
            });
        });
        it('should sort names by name ASC', function () {
            HomePage.contactsList.nameFilter.click();

            HomePage.contactsList.names.then(function (contacts) {
                expect(contacts[0].getText()).toEqual('Adam Smith');
            });
        });
        it('should sort names by name DESC', function () {
            HomePage.contactsList.nameFilter.click();
            HomePage.contactsList.nameFilter.click();

            HomePage.contactsList.names.then(function (contacts) {
                expect(contacts[2].getText()).toEqual('Adam Smith');
            });
        });
        it('all items should be checked', function () {
            HomePage.contactsList.checkboxes.then(function (items) {
                expect(items[0].isSelected()).toBe(true);
                expect(items[1].isSelected()).toBe(true);
                expect(items[2].isSelected()).toBe(true);
            });
        });
        it('should be filter items by next button filter', function () {
            HomePage.contactsList.nextFilter.click();

            HomePage.contactsList.all.then(function (contacts) {
                expect(contacts[0].isPresent()).toBe(true);
                expect(contacts[1].isPresent()).toBe(true);
                expect(contacts[2].isPresent()).toBe(true);
            });
        });
        it('should remove item from the list', function () {
            HomePage.contactsList.removeLinks.get(0).click();

            HomePage.contactsList.all.then(function (contacts) {
                expect(contacts.length).toEqual(2);
            });
        });
    });

    describe('Next call form', function () {
        it('should add contact in future to the next form', function () {
            HomePage.addForm.nameField.sendKeys(browser.params.contactValid.name);
            HomePage.addForm.phoneField.sendKeys(browser.params.contactValid.phone);
            HomePage.addForm.timeField.sendKeys(browser.params.contactValid.time);
            HomePage.addForm.submitButton.click();

            expect(HomePage.nextCall.nameField.getAttribute("value")).toEqual(browser.params.contactValid.name);

            expect(HomePage.nextCall.phoneField.getAttribute("value")).toEqual(browser.params.contactValid.convertedPhone);

            expect(HomePage.nextCall.timeField.getAttribute("value")).toEqual(browser.params.contactValid.time);

            HomePage.contactsList.checkboxes.then(function (items) {
                expect(items[3].isSelected()).toBe(false);
            });
        });
    });

});