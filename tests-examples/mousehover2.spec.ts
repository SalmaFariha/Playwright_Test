import {Browser, BrowserContext, chromium, Locator, Page, test} from '@playwright/test'
import { log } from 'console';
 test('Mousehover2', async() =>{

 const browser:Browser = await chromium.launch({headless:false , channel: 'chrome'});//isolated session

 const context:BrowserContext = await browser.newContext({
    viewport: { width: 1550, height: 1223 }
 });
 //In recent versions of Playwright, the setViewportSize method is no longer 
 //available directly on BrowserContext. Instead, you can specify the viewport size when you create the
 // context by passing the viewport option to browser.newContext().
 //await context.setViewportSize({ width: 1550, height: 1223 });

 const page:Page = await context.newPage();
 

 await page.goto('https://www.bigbasket.com/');

const menu = "button[id='headlessui-menu-button-:R5bab6:']"
 await page.click(menu);

 const submenu = await page.$$("ul[role='none']:first-of-type li");
 for(let sub of submenu){
   await sub.hover();
   const subMenuItemText = await sub.innerText();
   console.log(`${subMenuItemText}`);
   
   await page.waitForTimeout(300);

 /*for (let j = 0; j < submenu.length; j++) {
  await submenu[j].hover();
  const subMenuItemText = await submenu[j].innerText();
  console.log(`Submenu Item ${j + 1}: ${subMenuItemText}`);
   
   await page.waitForTimeout(300);*/
 }


 })