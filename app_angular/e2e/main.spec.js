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
    });

});