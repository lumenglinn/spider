'use strict';

const Controller = require('egg').Controller;
const puppeteer = require('puppeteer');

class LoginController extends Controller {
    async index() {
        const { ctx } = this;
        const browser = await puppeteer.launch({
            defaultViewport: {
                width: 1920,
                height: 1200
            }
        });
        const page = await browser.newPage();

        // 跳转首页
        await page.goto('https://example.com/')

        try {

            // 点击登录
            var loginBtn = await page.$('.btn-customer')
            await loginBtn.click()

            await page.waitFor(2 * 1000)
            await page.type('#Phone', '账号', { delay: 20 })
            await page.type('#Password', '密码', { delay: 20 })
            var authLogin = await page.$('#sendLogin')
            await authLogin.click();    // 登录成功

            // 去我的账户页
            await page.goto('https://example.com/customer')
            // 查看余额
            await page.waitForSelector('.amount');
            const result = await page.evaluate(() => {
                let target = document.querySelector('.amount');
                return Promise.resolve(target.innerText);
            });

            console.log(result, 'success')

        } catch (e) {
            console.log(e)
        }


        await browser.close();
        ctx.body = 'hi, egg';
    }
}

module.exports = LoginController;
