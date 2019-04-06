'use strict';

const Controller = require('egg').Controller;
const puppeteer = require('puppeteer');

class ScreenShotController extends Controller {
  async index() {
    const { ctx } = this;
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1200
      }
    });
    const page = await browser.newPage();
    await page.goto('https://segmentfault.com/');
    await page.pdf({path: './data/page.pdf'});
    await page.screenshot({path: './data/example.png'});

    await browser.close();
    ctx.body = 'hi, egg';
  }
}

module.exports = ScreenShotController;
