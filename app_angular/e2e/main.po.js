var HomePage = function () {

    this.addForm = {
        nameField: element(by.model('name')),
        phoneField: element(by.model('phone')),
        timeField: element(by.model('time')),
        submitButton: element(by.css('#add-button')),
        errors: {
            nameRequired: element(by.css('span[ng-show="addCallForm.userName.$error.required"]')),
            phoneRequired: element(by.css('span[ng-show="addCallForm.userPhone.$error.required"]')),
            phonePattern: element(by.css('span[ng-show="addCallForm.userPhone.$error.pattern"]')),
            timeRequired: element(by.css('span[ng-show="addCallForm.userTime.$error.required"]')),
            timePattern: element(by.css('span[ng-show="addCallForm.userTime.$error.datetime"]'))
        }
    }

    this.getAppUrl = function () {
        browser.get('http://localhost:8000/app');
    };

};

module.exports = HomePage;