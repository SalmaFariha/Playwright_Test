import {test} from '@playwright/test'

 test('first test', async({page}) =>{
 await page.goto('https://practice.expandtesting.com/')
 await page.click('a:text("Demos")');
 await page.click(':text("Apps")');
}

)