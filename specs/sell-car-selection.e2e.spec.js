describe('rencarform sell car selection flow', () => {
  it('goes from home to sell-my-car vehicle selection and selects 5 vehicles', async () => {
    const homeTab = await $('#HomePage_Tabs_item_dispatchStatus_0');
    await homeTab.waitForExist();
    await homeTab.scrollIntoView({ block: 'center' });
    await homeTab.waitForDisplayed();

    const moreTab = await $('#bottomTabNavViewItem_더보기');
    await moreTab.waitForExist();
    await moreTab.scrollIntoView({ block: 'center' });
    await moreTab.waitForDisplayed();
    await moreTab.click();
    await browser.pause(1000);

    const sellServiceMenu = await $('#MenuList_MenuItem_내차팔기_서비스');
    await sellServiceMenu.waitForExist();
    await sellServiceMenu.scrollIntoView({ block: 'center' });
    await sellServiceMenu.waitForDisplayed();
    await sellServiceMenu.click();
    await browser.pause(1000);

    const requestButton = await $('#CarAuctionIntro_button_request');
    await requestButton.waitForExist();
    await requestButton.scrollIntoView({ block: 'center' });
    await requestButton.waitForDisplayed();
    await requestButton.click();
    await browser.pause(1000);

    const selectCarButton = await $('#CarSaleContent_button_selectCar');
    await selectCarButton.waitForExist();
    await selectCarButton.scrollIntoView({ block: 'center' });
    await selectCarButton.waitForDisplayed();
    await selectCarButton.click();
    await browser.pause(1000);

    const vehicleSelectTitle = await $('//h3[text()="차량 선택"]');
    await vehicleSelectTitle.waitForExist();
    await vehicleSelectTitle.waitForDisplayed();

    const completeButton = await $('#차량 선택 완료');
    await completeButton.waitForExist();
    await completeButton.scrollIntoView({ block: 'center' });
    await completeButton.waitForDisplayed();

    const vehicleItems = await $$('#bottom-sheet li');
    if (vehicleItems.length < 5) {
      throw new Error(`Expected at least 5 vehicles, found ${vehicleItems.length}`);
    }

    for (let i = 0; i < 5; i += 1) {
      const item = vehicleItems[i];
      await item.waitForExist();
      await item.scrollIntoView({ block: 'center' });
      await item.waitForDisplayed();
      await item.click();
      await browser.pause(500);
    }

    await completeButton.waitForDisplayed();
    await completeButton.click();
    await browser.pause(1000);

    await selectCarButton.waitForExist();
    await selectCarButton.scrollIntoView({ block: 'center' });
    await selectCarButton.waitForDisplayed();
  });
});
