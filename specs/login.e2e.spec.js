describe('rencarform login flow', () => {
  it('logs in and reaches the home screen', async () => {
    const startButton = await $('#IntroPage_button_start_0');
    await startButton.waitForExist();
    await startButton.scrollIntoView({ block: 'center' });
    await startButton.waitForDisplayed();
    await startButton.click();
    await browser.pause(1000);

    const idInput = await $('#LoginForm_input_id_0');
    await idInput.waitForExist();
    await idInput.scrollIntoView({ block: 'center' });
    await idInput.waitForDisplayed();
    await idInput.setValue('bosswon');

    const passwordInput = await $('#LoginForm_input_password_0');
    await passwordInput.waitForExist();
    await passwordInput.scrollIntoView({ block: 'center' });
    await passwordInput.waitForDisplayed();
    await passwordInput.setValue('qwer1234');

    const loginButton = await $('#LoginForm_button_login_0');
    await loginButton.waitForExist();
    await loginButton.scrollIntoView({ block: 'center' });
    await loginButton.waitForDisplayed();
    await loginButton.click();
    await browser.pause(1000);

    const homeTab = await $('#HomePage_Tabs_item_dispatchStatus_0');
    await homeTab.waitForExist();
    await homeTab.scrollIntoView({ block: 'center' });
    await homeTab.waitForDisplayed();
  });
});
