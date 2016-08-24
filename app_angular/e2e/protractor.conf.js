// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['main.spec.js'],
  
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },

  params: {
        contactValid: {
            name: 'Ben',
            phone: '+(420) 111 222 333',
            convertedPhone: '00420 111 222 333',
            time: '23:59'
        },
        contactInvalid: {
            name: 'Jim',
            phone: '911',
            time: 'abc'
        },
  }
}