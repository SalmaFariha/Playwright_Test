import {Browser, BrowserContext, chromium, Locator, Page, test} from '@playwright/test'
import { log } from 'console';
 test('Mousehover', async() =>{

 const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});
// const context:BrowserContext = await browser.newContext();
 const page:Page = await browser.newPage();

 await page.goto('https://www.luamaya.com/');
 const cross = "(//button[contains(@class,'needsclick klaviyo-close-form')])[2]"
 await page.click(cross);
 const cross2 = "//button[contains(@class,'needsclick klaviyo-close-form')]"
 await page.click(cross2);

const menu = "//span[normalize-space(text())='KATEGORIEN']"
 await page.click(menu);
 //await page.locator("(//a[@role='none'])[4]").hover();\


 const submenu = await page.$$("#HeaderMenu-MenuList-2 li");

 for (let j = 0; j < submenu.length; j++) {
  await submenu[j].hover();
  const subMenuItemText = await submenu[j].innerText();
  console.log(`Submenu Item ${j + 1}: ${subMenuItemText}`);// must use backtick`
   
   await page.waitForTimeout(300);
 }

 /*for(let sub of submenu){
    await sub.hover();
    
    await page.waitForTimeout(300);
 }*/


//await page.waitForTimeout(3000);






 })