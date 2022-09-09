const puppeteer = require('puppeteer');

export const getScore = async (url: string) => {
    let score: number;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // await page.screenshot({ path: 'example.png' });

        score = await page.evaluate(() => {
            return window.document.querySelector("body > div > main > div > div > div > div > div.card-body > div:nth-child(1) > table > tbody > tr.table-danger > td:nth-child(5)")?.textContent;
        }) as number;

        console.log(JSON.stringify(score));

        await browser.close();
        
        return score;
    } catch (error) {
        console.log("Crawler error");
    }

}