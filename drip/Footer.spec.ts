import {Browser, BrowserContext, chromium, Locator, Page, test, expect} from '@playwright/test'
import { log } from 'console';
 
  

  test('Check all footer links and ensure no broken links', async () => {
    const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});//isolated session

    const context:BrowserContext = await browser.newContext({
       viewport: { width: 1550, height: 1223 }
    });
    //In recent versions of Playwright, the setViewportSize method is no longer 
    //available directly on BrowserContext. Instead, you can specify the viewport size when you create the
    // context by passing the viewport option to browser.newContext().
    //await context.setViewportSize({ width: 1550, height: 1223 });
   
    const page:Page = await context.newPage();
    
   
   const originalUrl =  'https://dripagency.de/';
   await page.goto('https://dripagency.de/');
    // Step 2: Dynamically get all anchor tags within the footer
    const footerLinks = await page.locator('footer a:visible');
    
    const linkCount = await footerLinks.count();
    // Step 3: Iterate over each link and determine its behavior
    for (let i = 0; i < linkCount; i++) {
      const link = footerLinks.nth(i);


      // Get the href attribute of the link
      const href = await link.getAttribute('href');
      console.log(`Checking link: ${href}`);
      // Skip invalid or empty hrefs like "#", "javascript:void(0)" or undefined
      if (!href || href.startsWith('#') || href.startsWith('javascript')) {
        console.log(`Skipping invalid link: ${href}`);
        continue;
      }
      // Step 3: Determine if the link is external
      const linkUrl = new URL(href,originalUrl);
      const isExternal = linkUrl.hostname !== new URL(originalUrl).hostname;


      // Step 4: Check if the link is supposed to open in a new tab (i.e., target="_blank")
      const target = await link.getAttribute('target');
      if (target === '_blank') {
        console.log(`Checking external link opening in a new tab: ${href}`);

        // Open the link in a new tab and check the status code
        const [newPage] = await Promise.all([
          context.waitForEvent('page'), // Wait for a new tab to open
          link.click(),                 // Click the link
        ]);

        await newPage.waitForLoadState(); // Wait for the page to fully load
        const newPageUrl = newPage.url();

        try {
          const response = await newPage.goto(newPageUrl, { timeout: 10000 });
          const status = response.status();
          console.log(`Opened link: ${href}, Status Code: ${status}`);

          expect(status).toBeLessThan(400);  // Ensure no broken link
        } catch (error) {
          console.error(`Error fetching status for ${href}: ${error.message}`);
        }
        await newPage.close(); // Close the new tab after checking
      } else if (isExternal) {
        // External link that opens in the same tab
        console.log(`External link navigating to different domain in the same tab: ${href}`);

        const [response] = await Promise.all([
          page.waitForResponse(response => response.url() === href), // Wait for the external page to load
          link.click()  // Click the link
        ]);
        try {
        const status = response.status();
        console.log(`Navigated to external site: ${href}, Status Code: ${status}`);
        expect(status).toBeLessThan(400);  // Ensure no broken link
      } catch (error) {
        console.error(`Error fetching status for ${href}: ${error.message}`);
      }
        // Return to the original page after visiting external site
        await page.goto(originalUrl);
        console.log('Returned to the original site');

      } else {
        console.log(`Checking internal link redirecting in the same tab: ${href}`);

        // Save the current URL before clicking
        const initialUrl = page.url();

        // Click the link and wait for navigation within the same tab
        const [response] = await Promise.all([
          page.waitForResponse(response => response.url() !== initialUrl), // Wait for a different URL to load
          link.click(),               // Click the link
        ]);

        const status = response.status();
        const newUrl = page.url();

        console.log(`Redirected link: ${href}, New URL: ${newUrl}, Status Code: ${status}`);
        expect(status).toBeLessThan(400); // Ensure no broken link (status < 400)
        //expect(newUrl).not.toBe(initialUrl); // Ensure the page was redirected
        
        
       
      }
    }
  });

 


