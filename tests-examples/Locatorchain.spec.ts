import {Browser, BrowserContext, chromium, Locator, Page, test} from '@playwright/test'
import { log } from 'console';
 test('LocatorChain', async() =>{

 const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});
// const context:BrowserContext = await browser.newContext();
 const page:Page = await browser.newPage();

 await page.goto('https://www.orangehrm.com/en/30-day-free-trial');

 /* chaining
 await page.locator('form#Form_getForm >> #Form_getForm_Name').fill('adda');
 await page.locator('form#Form_getForm >> #Form_getForm_action_submitForm').click();
 */

/* another option
 const form = page.locator('form#Form_getForm');
 const getyourfreetrial = page.getByRole('button', {name:'Get Your Free Trial'});

await form.locator(getyourfreetrial).click();
*/

 await page.locator('form#Form_getForm').locator('#Form_getForm_Name').fill('adda');
 await page.locator('form#Form_getForm').getByRole('button', {name:'Get Your Free Trial'}).click();

await page.waitForTimeout(3000);

 })