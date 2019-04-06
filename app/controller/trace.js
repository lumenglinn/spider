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
    await page.tracing.start({ path: './data/trace.json' })
    await page.goto('https://www.ppmoney.com')
    await page.tracing.stop()

    await browser.close();
    ctx.body = 'hi, egg';
  }
}

module.exports = ScreenShotController;
