describe('rencarform insurance contract hybrid photo and signature flow', () => {
  const WEBVIEW_NAME = 'WEBVIEW_com.rencarform';

  async function switchToWebview() {
    const contexts = await driver.getContexts();
    const webview = contexts.find((name) => name === WEBVIEW_NAME || name.startsWith('WEBVIEW'));
    if (!webview) {
      throw new Error(`WEBVIEW context not found. contexts=${JSON.stringify(contexts)}`);
    }
    await driver.switchContext(webview);
  }

  async function switchToNative() {
    await driver.switchContext('NATIVE_APP');
  }

  async function isWebVisible(selector, timeout = 1500) {
    try {
      const element = await $(selector);
      await element.waitForExist({ timeout });
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  async function waitAndClickWeb(selector, timeout = 15000) {
    const element = await $(selector);
    await element.waitForExist({ timeout });
    await element.scrollIntoView({ block: 'center' });
    await element.waitForDisplayed({ timeout });
    await element.click();
    await browser.pause(1000);
    return element;
  }

  async function waitForWeb(selector, timeout = 15000) {
    const element = await $(selector);
    await element.waitForExist({ timeout });
    await element.scrollIntoView({ block: 'center' });
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async function setWebValue(selector, value) {
    const element = await waitForWeb(selector);
    await element.setValue(value);
    await browser.pause(500);
    return element;
  }

  async function clickWebIfVisible(selector, timeout = 1000) {
    if (await isWebVisible(selector, timeout)) {
      await waitAndClickWeb(selector, timeout);
      return true;
    }
    return false;
  }

  async function jsClick(selector) {
    const element = await waitForWeb(selector);
    await browser.execute((el) => el.click(), element);
    await browser.pause(1000);
  }

  async function switchToDefaultContent() {
    await browser.execute(() => {
      window.top.focus();
    });
  }

  async function allowCameraPermissionIfPresent() {
    await switchToNative();

    const allowSelectors = [
      '//*[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]',
      '//*[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]',
      "//android.widget.Button[@text='허용']",
      "//android.widget.Button[@text='Allow']",
      "//android.widget.Button[@text='While using the app']",
      "//android.widget.Button[@text='앱 사용 중에만 허용']",
    ];

    for (const selector of allowSelectors) {
      const button = await $(selector);
      if (await button.isExisting()) {
        await button.click();
        await browser.pause(1000);
        return true;
      }
    }

    return false;
  }

  async function tapCameraCapturePath() {
    await switchToNative();

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: 2173, y: 508 },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
    await browser.pause(1000);

    await driver.performActions([
      {
        type: 'pointer',
        id: 'finger2',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: 2173, y: 64 },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 100 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ]);
    await browser.pause(3000);
  }

  async function selectCapturedPhotoAndChooseNormalQuality() {
    await switchToWebview();
    await waitAndClickWeb('#PhotoPickerBottomSheetContent-IMSFormButton-0');

    const confirmButton = await $('#PhotoPickerBottomSheetContent-IMSFormButton-4');
    await confirmButton.waitForExist({ timeout: 15000 });
    await confirmButton.waitForDisplayed({ timeout: 15000 });
    await confirmButton.click();
    await browser.pause(1000);

    await waitAndClickWeb('#SelectImageQualityModalContent-IMSFormButton-1');
  }

  async function ensureOnHome() {
    await switchToWebview();

    if (await isWebVisible('#HomePage_Tabs_item_dispatchStatus_0', 2000)) {
      return;
    }

    if (await isWebVisible('#IntroPage_button_start_0', 2000)) {
      await waitAndClickWeb('#IntroPage_button_start_0');
    }

    if (await isWebVisible('#LoginForm_button_login_0', 2000)) {
      await setWebValue('#LoginForm_input_id_0', 'bosswon');
      await setWebValue('#LoginForm_input_password_0', 'qwer1234');
      await waitAndClickWeb('#LoginForm_button_login_0');
    }

    await waitForWeb('#HomePage_Tabs_item_dispatchStatus_0', 20000);
  }

  async function selectFirstDriverSearchResult() {
    const driverItem = await $('[id^="searchDriverBottomSheetContent_driverItem_"]');
    await driverItem.waitForExist({ timeout: 15000 });
    await driverItem.waitForDisplayed({ timeout: 15000 });
    await driverItem.click();
    await browser.pause(1000);
    await waitAndClickWeb('#searchDriverBottomSheetContent_selectDriverButton');
  }

  async function fillAddressViaDaumIframe() {
    await waitAndClickWeb('#RegisterInsuranceContract_FirstDriverDirect_button_address_search_0');
    await browser.pause(2000);

    await switchToDefaultContent();
    const outerFrame = await $('iframe[title="우편번호서비스 레이어 프레임"]');
    await outerFrame.waitForExist({ timeout: 15000 });
    await browser.switchToFrame(outerFrame);

    const innerFrame = await $('#__kakao__viewerFrame_1');
    await innerFrame.waitForExist({ timeout: 15000 });
    await browser.switchToFrame(innerFrame);

    await setWebValue('#region_name', '아차산로 355');
    await waitAndClickWeb('.btn_search');

    const firstResult = await $('.list_post li a');
    await firstResult.waitForExist({ timeout: 15000 });
    await firstResult.waitForDisplayed({ timeout: 15000 });
    await firstResult.click();
    await browser.pause(2000);

    await browser.switchToParentFrame();
    await browser.switchToParentFrame();

    await waitForWeb('#DaumFindAddressBottomSheetContent_IMSFormInput__1', 15000);
    await setWebValue('#DaumFindAddressBottomSheetContent_IMSFormInput__1', '2층 201호');
    await waitAndClickWeb('#DaumFindAddressBottomSheetContent-IMSFormButton-1');
  }

  async function handleCustomerCarModalsIfPresent() {
    await clickWebIfVisible('#IMSFormAlert-button-2', 1500);
    await clickWebIfVisible('#IMSFormModal-button-modal-root', 1500);
    await clickWebIfVisible('#CarAutoUpResultModalContent-IMSFormButton-2', 1500);
  }

  async function selectInsuranceCompanySamsung() {
    await jsClick('#RegisterInsuranceContract_CustomerCar_insurance_fields_0_select_insurance_company_0');
    await handleCustomerCarModalsIfPresent();

    const samsungOption = await $('#bottom-sheet [datatype^="type_"]');
    await samsungOption.waitForExist({ timeout: 15000 });
    await samsungOption.waitForDisplayed({ timeout: 15000 });
    await samsungOption.click();
    await browser.pause(1000);
  }

  async function goToEtcFromHome() {
    await waitAndClickWeb('#bottomTabNavViewItem_계약서');
    await waitAndClickWeb('#ContractIntroPage_button_insurance_0');
    await waitAndClickWeb('#RegisterInsuranceContract_FirstDriverCamera_button_direct_0');

    await setWebValue('#RegisterInsuranceContract_FirstDriverDirect_input_name_0', '김테스트');
    await waitAndClickWeb('#RegisterInsuranceContract_FirstDriverDirect_button_search_0');
    await selectFirstDriverSearchResult();
    await fillAddressViaDaumIframe();

    await handleCustomerCarModalsIfPresent();
    await setWebValue('#RegisterInsuranceContract_CustomerCar_input_car_number_0', '12가1234');
    await clickWebIfVisible('#RegisterInsuranceContract_CustomerCar_button_car_info_search_0', 2000);
    await handleCustomerCarModalsIfPresent();
    await setWebValue('#RegisterInsuranceContract_CustomerCar_input_accident_car_model_0', 'K5');
    await setWebValue('#RegisterInsuranceContract_CustomerCar_input_accident_car_engine_0', '1999');
    await setWebValue('#RegisterInsuranceContract_CustomerCar_input_accident_car_age_0', '2023');
    await setWebValue('#RegisterInsuranceContract_CustomerCar_insurance_fields_0_registration_id_input_0_input_registration_id_0', '1234567890');
    await setWebValue('#RegisterInsuranceContract_CustomerCar_input_industrial_company_0', '테스트정비');
    await setWebValue('#RegisterInsuranceContract_CustomerCar_input_industrial_company_tel_0', '0212345678');
    await selectInsuranceCompanySamsung();
    await waitAndClickWeb('#RegisterInsuranceContract_Pagination_button_next_0');

    await waitForWeb('#RegisterInsuranceContract_RentInfo_input_rent_car_name_0', 20000);
    await setWebValue('#RegisterInsuranceContract_RentInfo_input_rent_car_gas_charge_0', '80');
    await setWebValue('#RegisterInsuranceContract_RentInfo_input_rent_car_driven_distance_0', '1000');
    await setWebValue('#RegisterInsuranceContract_RentInfo_input_rent_car_dropoff_address_0', '테스트 회차장소');
    await waitAndClickWeb('#RegisterInsuranceContract_Pagination_button_next_0');

    await waitForWeb('#RegisterInsuranceContract_Insurance_header_0', 20000);
    await waitAndClickWeb('#RegisterInsuranceContract_Insurance_section_self_car_0_radio_age_26_0');
    await waitAndClickWeb('#RegisterInsuranceContract_Insurance_section_self_car_0_radio_insured_0');
    await waitAndClickWeb('#RegisterInsuranceContract_Insurance_section_self_car_0_direct_indemnification_fee_0_button_option_1');
    await waitAndClickWeb('#RegisterInsuranceContract_Insurance_section_self_car_0_direct_limit_amount_0_button_option_1');
    await waitAndClickWeb('#RegisterInsuranceContract_Pagination_button_next_0');

    await waitForWeb('#RegisterInsuranceContract_Etc_header_0', 20000);
  }

  async function runPhotoFlow(addButtonSelector) {
    await waitAndClickWeb(addButtonSelector);
    await waitAndClickWeb('#IMSFormAlert-button-1');
    await allowCameraPermissionIfPresent();
    await tapCameraCapturePath();
    await selectCapturedPhotoAndChooseNormalQuality();
    await switchToWebview();
    await waitForWeb('#RegisterInsuranceContract_Etc_header_0', 20000);
  }

  it('starts from /home, navigates to etc, and checks the hybrid photo-signature flow', async () => {
    await ensureOnHome();
    await goToEtcFromHome();

    await runPhotoFlow('#RegisterInsuranceContract_Etc_section_rent_car_photo_0_button_add_photo_0');
    await runPhotoFlow('#RegisterInsuranceContract_Etc_section_customer_car_photo_0_button_add_photo_0');

    await waitAndClickWeb('#RegisterInsuranceContract_Pagination_button_next_0');
    await waitForWeb('#RegisterInsuranceContract_Signature_header_0', 20000);
    await waitForWeb('#RegisterInsuranceContract_Signature_input_customer_memo_0', 20000);
    await waitForWeb('#RegisterInsuranceContract_Signature_button_send_link_0', 20000);
    await waitAndClickWeb('#RegisterInsuranceContract_Signature_button_sign_0');
    await waitForWeb('#IMSFormAlert-button-2', 20000);
  });
});
