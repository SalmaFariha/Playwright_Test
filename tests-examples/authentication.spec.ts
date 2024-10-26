import {Browser, BrowserContext, chromium, Locator, Page, test} from '@playwright/test'

 test('first test', async() =>{

 const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});
 const context:BrowserContext = await browser.newContext();
 const page:Page = await context.newPage();

 const username = 'coopextern';
 const password = 'CoopTest+TakeCare2023';
 const authheader = 'Basic ' + btoa(username+':'+password);//btoa method; if bearer or an othe token is used just replace basic with that one
 page.setExtraHTTPHeaders({Authorization : authheader});

 await page.goto('https://qual.jumbo.ch/de');//more dynamic appraoch

 //await page.goto('https://coopextern:CoopTest+TakeCare2023@qual.jumbo.ch/de/register');//static approach


 /*const firstName:Locator = page.locator('id=input-firstName-id');
 const lastName:Locator = page.locator('id=input-name-id');
 await firstName.fill("salma");
 await lastName.fill("fariha");*/
 });
 