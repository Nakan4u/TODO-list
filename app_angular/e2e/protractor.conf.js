// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8000/',
  specs: ['main.spec.js'],
  suites: { // to run suite : protractor --suite callList e2e/protractor.conf.js
    main: 'main.spec.js',
    callList: 'callList.spec.js'
  },
  capabilities: {
    'browserName': 'chrome'
  },
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
    }
  }
}