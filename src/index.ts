import {Parser} from "./parser/Parser.js";
import puppeteer from "puppeteer";
import * as fs from "node:fs";
import path from "node:path";


const site1 = {
    name: "brickset.com",
    site: "https://brickset.com/inventories/31197-1",
    selectors: {
        element: "td:nth-child(1) > a",
        qty: "td:nth-child(3)",
        colour: "td:nth-child(4) > a",
        category: "td:nth-child(5) > a",
        design: "td:nth-child(6) > a",
        element_name: "td:nth-child(7)",
        element_in_sets: "td:nth-child(8) > a",
        element_introduced_in: "td:nth-child(9)",
        design_in_sets: "td:nth-child(10) > a",
        design_introduced_in: "td:nth-child(11)",
        row: "div.content div[role='main'] table.neattable tbody > tr",
    },
}
const chromeOptions = {
  // headless:false,
  // defaultViewport: null,
  //   slowMo:10,
};
const browser = await puppeteer.launch(chromeOptions)

const page = await browser.newPage()

const parserBrickset = new Parser(site1.site, site1.selectors, {
    browser,
    page,
    viewPort: {
        width: 1920,
        height: 1080
    },
    waitContent: "div.content div[role='main'] table.neattable tbody"
})

const result = JSON.stringify((await parserBrickset.parser()), null, 4)
const filePath = path.resolve('src/json/data.json');
fs.writeFileSync(filePath, result, 'utf8');

await browser.close()