describe('rencarform insurance contract photo and signature flow', () => {
  it('verifies etc-page photo attachment steps and reaches the signature prerequisite modal', async () => {
    const etcHeader = await $('#RegisterInsuranceContract_Etc_header_0');
    await etcHeader.waitForExist();
    await etcHeader.scrollIntoView({ block: 'center' });
    await etcHeader.waitForDisplayed();

    const rentPhotoAddButton = await $('#RegisterInsuranceContract_Etc_section_rent_car_photo_0_button_add_photo_0');
    await rentPhotoAddButton.waitForExist();
    await rentPhotoAddButton.scrollIntoView({ block: 'center' });
    await rentPhotoAddButton.waitForDisplayed();

    const customerPhotoAddButton = await $('#RegisterInsuranceContract_Etc_section_customer_car_photo_0_button_add_photo_0');
    await customerPhotoAddButton.waitForExist();
    await customerPhotoAddButton.scrollIntoView({ block: 'center' });
    await customerPhotoAddButton.waitForDisplayed();

    const nextButton = await $('#RegisterInsuranceContract_Pagination_button_next_0');
    await nextButton.waitForExist();
    await nextButton.scrollIntoView({ block: 'center' });
    await nextButton.waitForDisplayed();
    await nextButton.click();
    await browser.pause(1000);

    const signatureHeader = await $('#RegisterInsuranceContract_Signature_header_0');
    await signatureHeader.waitForExist();
    await signatureHeader.scrollIntoView({ block: 'center' });
    await signatureHeader.waitForDisplayed();

    const memoInput = await $('#RegisterInsuranceContract_Signature_input_customer_memo_0');
    await memoInput.waitForExist();
    await memoInput.scrollIntoView({ block: 'center' });
    await memoInput.waitForDisplayed();

    const sendLinkButton = await $('#RegisterInsuranceContract_Signature_button_send_link_0');
    await sendLinkButton.waitForExist();
    await sendLinkButton.scrollIntoView({ block: 'center' });
    await sendLinkButton.waitForDisplayed();

    const driverSignButton = await $('#RegisterInsuranceContract_Signature_button_sign_0');
    await driverSignButton.waitForExist();
    await driverSignButton.scrollIntoView({ block: 'center' });
    await driverSignButton.waitForDisplayed();
    await driverSignButton.click();
    await browser.pause(1000);

    const licenseCaptureConfirmButton = await $('#IMSFormAlert-button-2');
    await licenseCaptureConfirmButton.waitForExist();
    await licenseCaptureConfirmButton.scrollIntoView({ block: 'center' });
    await licenseCaptureConfirmButton.waitForDisplayed();
  });
});
