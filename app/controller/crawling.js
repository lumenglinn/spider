'use strict';

const Controller = require('egg').Controller;
const puppeteer = require('puppeteer');

class CrawController extends Controller {
  async index() {
    const { ctx } = this;
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1200
      }
    });
    const page = await browser.newPage();

    await page.goto('https://juejin.im/timeline', {
      waitUntil: 'networkidle2' 
    });

    await page.waitFor(2 * 1000)

    await page.waitForSelector('.entry-list');

    const result = await page.evaluate(() => {
      let targetItem = [...document.querySelectorAll('.entry-list li .title')]
      const articles = []
      targetItem.map(el => {
        articles.push({
          title: el.innerText,
          href: el.href.trim()
        })
        return articles
      })

      return Promise.resolve(articles);
    }); 

    await browser.close();
    ctx.body = result;
  }
}

module.exports = CrawController;
