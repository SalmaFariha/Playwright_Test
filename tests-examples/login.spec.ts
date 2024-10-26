import{Browser, Locator, Page, test} from '@playwright/test'
import{chromium} from 'playwright'

test('login test', async()=> {

const browser:Browser = await chromium.launch({headless :true});
const page:Page = await browser.newPage();
await page.goto("https://automationexercise.com/");

const login22:Locator = await page.locator("a[href='/login']");
login22.click();


})