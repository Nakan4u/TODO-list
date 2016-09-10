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

});