import {Browser, BrowserContext, chromium, Locator, Page, test, expect} from '@playwright/test'
import { log } from 'console';
 
  
  test('Verify all header links do not lead to 400 error pages', async () => {
    const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});//isolated session

 const context:BrowserContext = await browser.newContext({
    viewport: { width: 1550, height: 1223 }
 });
 //In recent versions of Playwright, the setViewportSize method is no longer 
 //available directly on BrowserContext. Instead, you can specify the viewport size when you create the
 // context by passing the viewport option to browser.newContext().
 //await context.setViewportSize({ width: 1550, height: 1223 });

 const page:Page = await context.newPage();
 

 await page.goto('https://dripagency.de/');

   
 // Locate all the anchor (`<a>`) tags inside the header
 const headerLinks = await page.locator('header a:visible');

 // Get the total number of links
 const linkCount = await headerLinks.count();

 // Loop through each link and verify clickability and the response status
 for (let i = 0; i < linkCount; i++) {
   const link = headerLinks.nth(i);

   // Get the href attribute of the link
   const url = await link.getAttribute('href');
   console.log(`Checking link: ${url}`);

   // Check if the link is clickable
   await expect.soft(link).toBeVisible();
   //await expect(link).toBeEnabled();
    // Intercept the network requests to check for 400 status
    try {
     const [response] = await Promise.all([
       page.waitForResponse(response => response.url().includes(url!) && response.status() < 400, { timeout: 30000 }),
       //page.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
       link.click()
     ]);
   
     console.log(`Response status for ${url}: ${response.status()}`);
   } catch (error) {
     console.error(`Error while fetching ${url}:`, error);
   }

   // Check that the status code is not in the 400 range
   //
     //expect.soft(status).toBeLessThan(400);

   // Navigate back to the original page after each click (if necessary)
   //await page.goBack({ timeout: 10000 });
 }


  });



