const puppeteer = require('puppeteer');
const $ = require('cheerio');
const watch = process.argv[2]
const config = require('./config.json');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com/ap/signin?accountStatusPolicy=P1&clientContext=257-0245058-5967205&language=en_US&openid.assoc_handle=amzn_prime_video_desktop_us&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.primevideo.com%2Fauth%2Freturn%2Fref%3Dav_auth_ap%3F_encoding%3DUTF8%26location%3D%252Fref%253Dav_nav_sign_in');

  await page.type('#ap_email', config.username)
  await page.type('#ap_password',config.password)

  await Promise.all([
       page.waitForNavigation(), 
       page.click('#signInSubmit') 
  ]);

const Input = await page.$('#pv-search-nav')
await Input.type(watch)
await Promise.all([
    page.waitForNavigation(),
    Input.type(String.fromCharCode(13))
  ]);
const playpage = await page.click('#av-search > div.av-grid-wrapper > div.X8aBJ_.av-search-grid.av-s-g-clear > div:nth-child(1) > div > div._3JL40y.tst-hover-container > div._1y15Fl.dvui-beardContainer.D0Lu_p.av-grid-beard > div._1Opa2_.dvui-packshot.av-grid-packshot > a > img');  

await Promise.all([
    page.waitForNavigation(),
])
const play = await page.waitForSelector('#dv-action-box > div > div > div > div.abwJ5F.tFxybk._2LF_6p > span > div > a', {timeout: 60000});
await play.click('#dv-action-box > div > div > div > div.abwJ5F.tFxybk._2LF_6p > span > div > a')
})();
