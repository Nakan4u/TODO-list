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
            
        xit('should show error when attempt submit with emty fields', function () {
            expect(browser.getTitle()).toEqual('ToDoCalls angular app');
        });
        
        xit('should add new contact', function () {
            HomePage.addForm.nameField.sendKeys('Jim2');
            HomePage.addForm.phoneField.sendKeys('+(420) 111 222 333');
            HomePage.addForm.timeField.sendKeys(new Date());
            HomePage.addForm.submitButton.click();
            
            expect(HomePage.addForm.contactsList.column("item.name")).toBe(3);
        });
    });

});