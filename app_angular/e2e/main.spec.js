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

});