import {Browser, BrowserContext, chromium, Locator, Page, test, expect} from '@playwright/test'
import { log } from 'console';
 
  

  test('Check Expanded and Collapsed state of the dropdown', async () => {
    const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});//isolated session

    const context:BrowserContext = await browser.newContext();
    //In recent versions of Playwright, the setViewportSize method is no longer 
    //available directly on BrowserContext. Instead, you can specify the viewport size when you create the
    // context by passing the viewport option to browser.newContext().
    //await context.setViewportSize({ width: 1550, height: 1223 });
   
    const page:Page = await context.newPage();
    
   
   const originalUrl =  'https://dripagency.de/';
   await page.goto('https://dripagency.de/');

   await page.locator("(//button[@class='cky-btn cky-btn-accept'])[1]").click();//cookies accepted
    const dd = await page.locator("(//div[@class='accordion_right'])[1]");

    await dd.click();
    const buttonText = await page.textContent("//p[@class='details_text display_none']/following-sibling::p[1]");
    console.log('Button Text after click:', buttonText);
    await page.waitForTimeout(3000);
    
    await page.click('text=Details ausblenden'); // Click to collapse
  
  
    // Verify that the button text has reverted to "Details anzeigen"
    const revertedButtonText = await page.textContent("(//div[@class='accordion_right']//p)[1]");
    console.log('Button Text after second click:', revertedButtonText); // Expect "Details anzeigen"
    await page.waitForTimeout(3000);
    // Close browser
    await browser.close();

});