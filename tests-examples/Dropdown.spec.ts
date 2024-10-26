import {Browser, BrowserContext, chromium, Locator, Page, test} from '@playwright/test'
import { log } from 'console';
 test('LocatorChain', async() =>{

 const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});
// const context:BrowserContext = await browser.newContext();
 const page:Page = await browser.newPage();

 await page.goto('https://www.magupdate.co.uk/magazine-subscription/phrr');


const dropdown = 'select#Contact_CountryCode';
/*
await page.selectOption(dropdown, {value: 'DZ'});//by value
await page.selectOption(dropdown, {label: 'Albania'});//by text
await page.selectOption(dropdown, {index: 9});// by index
*/

//select#Contact_CountryCode>option

const alloptions = await page.$$(dropdown+'>option');
console.log(alloptions.length);

for(const e of alloptions){
    const text = await e.textContent();
    console.log(text);
    if(text === 'India'){
        await page.selectOption(dropdown, {label: text});
        break;
    }
}
await page.waitForTimeout(3000);

 })
 