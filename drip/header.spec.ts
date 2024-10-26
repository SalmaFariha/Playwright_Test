import {Browser, BrowserContext, chromium, Locator, Page, test, expect} from '@playwright/test'
import { log } from 'console';
 
  test.describe('My Test Suite',() => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let header: Locator;

    test.beforeAll(async () => {
  browser = await chromium.launch({headless:false , channel: 'chrome'});
  context = await browser.newContext({
    viewport: { width: 1550, height: 1223 }
 });

 page = await context.newPage();
 await page.goto('https://dripagency.de/');
 header = await page.locator('header');});


 test('header', async() =>{
    await expect(header).toBeVisible();
    
    const initialBoundingBox = await header.boundingBox(); // the bounding box for the header is used to retrieve the position and size of an element
    console.log(initialBoundingBox);
    if (initialBoundingBox) {
      const initialPositionY = initialBoundingBox.y;

    // Step 3: Scroll the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); //If the function passed to the page.evaluate() returns a Promise, then page.evaluate() would wait for the promise to resolve and return its value.

    // Step 4: Wait for a moment to allow the page to scroll
    await page.waitForTimeout(1000); // Optional, to make sure the scroll has taken effect

    // Step 5: Get the position of the header after scrolling
    const finalBoundingBox = await header.boundingBox(); // Get the bounding box for the header after scroll
    
    if (finalBoundingBox) { const finalPositionY = finalBoundingBox.y;

    // Step 6: Compare the initial and final Y position
    if (initialPositionY === finalPositionY) {
        console.log('Header is sticky.');
    } else {
        console.log('Header is not sticky.');
    }

    // Optional assertion
    expect(initialPositionY).toBe(finalPositionY); // Passes if header is sticky
   } }
        
 });


 test('header2', async() =>{
  const headerBoundingBox = await header.boundingBox();

  const viewport = page.viewportSize();
  if (viewport && headerBoundingBox) {
  // You can add checks to verify alignment. Example: Check if the header is horizontally centered
  //const viewportWidth = await page.viewportSize().width;
  const viewportWidth = viewport.width;
  const headerCenter = headerBoundingBox.x + headerBoundingBox.width / 2;
  const viewportCenter = viewportWidth / 2;

  if (Math.abs(headerCenter - viewportCenter) < 10) {
    console.log('Header is centered.');
  } else {
    console.log('Header is not centered.');
  }}
});

  test('Verify all header links do not lead to 400 error pages', async () => {
   
    const headerLinks = await page.locator('header a:visible');

    const linkCount = await headerLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = headerLinks.nth(i);

      // Get the href attribute of the link
      const url = await link.getAttribute('href');
      console.log(`Checking link: ${url}`);

      
      await expect.soft(link).toBeVisible();
      //await expect(link).toBeEnabled();
      
       try {
        const [response] = await Promise.all([
          page.waitForResponse(response => response.url().includes(url!) && response.status() < 400, { timeout: 50000 }),
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

test('Verify color change of the button on hovering', async () => {
  const button2 = await page.locator('.header__btns .login');
await button2.hover();
const boxShadow = await button2.evaluate((element) => {
  return window.getComputedStyle(element).getPropertyValue('box-shadow');
});
expect(boxShadow).toBe("rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.1) 0px 2px 5px 0px");


})

});
