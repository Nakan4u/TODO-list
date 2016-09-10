// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:8000/',
  specs: ['main.spec.js'],
  capabilities: {
    'browserName': 'chrome'
  },
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
}