"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = void 0;
const puppeteer = require('puppeteer');
const getScore = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let score;
    try {
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        yield page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });
        // await page.screenshot({ path: 'example.png' });
        score = (yield page.evaluate(() => {
            var _a;
            return (_a = window.document.querySelector("body > div > main > div > div > div > div > div.card-body > div:nth-child(1) > table > tbody > tr.table-danger > td:nth-child(5)")) === null || _a === void 0 ? void 0 : _a.textContent;
        }));
        console.log(JSON.stringify(score));
        yield browser.close();
        return score;
    }
    catch (error) {
        console.log("Crawler error", error);
    }
});
exports.getScore = getScore;
