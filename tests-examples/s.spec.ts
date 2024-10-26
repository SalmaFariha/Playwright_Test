import {Browser, BrowserContext, chromium, Locator, Page, test, expect} from '@playwright/test'
import { log } from 'console';
 test('header', async() =>{

 const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});//isolated session

 const context:BrowserContext = await browser.newContext({
    viewport: { width: 1550, height: 1223 }
 });
 const page:Page = await context.newPage();
 

 await page.goto('https://dripagency.de/');
 const header = await page.locator('header');
    await expect(header).toBeVisible();
 });
