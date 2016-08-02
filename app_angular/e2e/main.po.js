var HomePage = function() {
//   var nameInput = element(by.model('yourName'));
//   var greeting = element(by.binding('yourName'));
  
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
      },
      contactsList: {
        all: element.all(by.repeater('item in callList')),
        names: element.all(by.repeater('item in callList').column('item.name')),
        phones: element.all(by.repeater('item in callList').column('item.phone')),
        times: element.all(by.repeater('item in callList').column('item.time'))
      }
  }

//   this.get = function() {
//     browser.get('http://www.angularjs.org');
//   };

//   this.setName = function(name) {
//     nameInput.sendKeys(name);
//   };

//   this.getGreeting = function() {
//     return greeting.getText();
//   };
};

module.exports = HomePage;