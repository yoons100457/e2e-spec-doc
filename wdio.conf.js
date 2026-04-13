exports.config = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  specs: ['./specs/*.e2e.spec.js'],
  maxInstances: 1,

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'emulator-5554',
    'appium:udid': 'emulator-5554',
    'appium:appPackage': 'com.rencarform',
    'appium:appActivity': 'com.rencarform.MainActivity',
    'appium:noReset': true,
    'appium:newCommandTimeout': 600,
    'appium:autoGrantPermissions': true,
    'appium:chromedriverExecutable': './tools/chromedriver113/chromedriver'
  }],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000
  },

  reporters: ['spec'],

  before: async function () {
    const contexts = await driver.getContexts();
    const webview = contexts.find((name) => name.startsWith('WEBVIEW'));
    if (webview) {
      await driver.switchContext(webview);
    }
  }
};
