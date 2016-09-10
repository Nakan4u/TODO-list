// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8000/',
  specs: ['main.spec.js'], // to run single test : protractor e2e/protractor.conf.js --spec callList.spec.js
  suites: { // to run suite : protractor e2e/protractor.conf.js --suite callList
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
  },
  multiCapabilities: [
    // Desktop
    {
      'browserName': 'chrome',
      'logName': 'Desktop',
      'chromeOptions': {
        args: [
          '--lang=en',
          '--window-size=1024,800'
        ]
      }
    },

    // Tablet
    {
       'browserName': 'chrome',
       'logName': 'Tablet',
       'chromeOptions' : {
            args: [
                '--lang=en',
                '--window-size=768,1024'
            ]
        }
    },

    // Mobile
    {
       'browserName': 'chrome',
       'logName': 'Mobile',
       'chromeOptions' : {
            args: [
                '--lang=en',
                '--window-size=320,480'
            ]
        }
    }
  ],
}