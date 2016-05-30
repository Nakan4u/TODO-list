var HomePage = function() {
//   var nameInput = element(by.model('yourName'));
//   var greeting = element(by.binding('yourName'));
  
  this.addForm = {
      nameField: element(by.model('name')),
      phoneField: element(by.model('phone')),
      timeField: element(by.model('time')),
      submitButton: element(by.css('#add-button')),
      contactsList: element.all(by.repeater('item in callList').column('item.name'))
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