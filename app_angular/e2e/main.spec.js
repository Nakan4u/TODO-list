// spec.js
describe('ToDoCalls App', function () {

    var dv = browser.driver;

    beforeAll(function () {
        dv.manage().deleteAllCookies();
    });

    beforeEach(function () {
        browser.get('http://localhost:8000/app');
    });

    it('should have a title: ToDoCalls angular app', function () {
        expect(browser.getTitle()).toEqual('ToDoCalls angular app');
    });

    describe('Add call form', function () {

        it('should show error when attempt submit with empty name field', function () {
            var nameField = element(by.model('name')),
                submitButton = element(by.css('#add-button')),
                nameRequired = element(by.css('span[ng-show="addCallForm.userName.$error.required"]'));

            nameField.sendKeys('');
            submitButton.click();

            expect(nameRequired.isDisplayed()).toBeTruthy();
        });

        it('should show error when attempt submit with empty phone field', function () {
            var phoneField = element(by.model('phone')),
                submitButton = element(by.css('#add-button')),
                phoneRequired = element(by.css('span[ng-show="addCallForm.userPhone.$error.required"]'));

            phoneField.sendKeys('');
            submitButton.click();

            expect(phoneRequired.isDisplayed()).toBeTruthy();
        });

        it('should show error when attempt submit with invalid phone number', function () {
            var phoneField = element(by.model('phone')),
                submitButton = element(by.css('#add-button')),
                phonePattern = element(by.css('span[ng-show="addCallForm.userPhone.$error.pattern"]'));

            phoneField.sendKeys('911');
            submitButton.click();

            expect(phonePattern.isDisplayed()).toBeTruthy();
        });
    });

});