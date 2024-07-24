import {Parser} from "./parser/Parser.js";
import puppeteer from "puppeteer";
import * as fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import {DetailT, ElementT, SetT} from "./parser/types.js";

const prisma = new PrismaClient()
const id_set = "31197-1"
const site1 = {
    name: "brickset.com",
    site: `https://brickset.com/inventories/${id_set}`,
    selectors: {
        name_set: "header h1",
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

async function main() {
    const result = await parserBrickset.parser()
    const sets = result[0] as SetT
    const elements = result[1] as ElementT[]

    for (const set of sets.sets.details) {
        const ix = sets.sets.details.indexOf(set);
        const [checkElement] = await Promise.all([prisma.element.findUnique({
            where: {
                element_id: elements[ix].element_id
            }
        })]);
        if (checkElement) continue;
         const [checkSet] = await Promise.all([prisma.set.findFirst({
            where: {
                element: elements[ix].element_id
            }
        })]);
         if(checkSet) return
        await prisma.element.create({
            data: elements[ix]
        });
        await prisma.set.create({
            data: set
        });
    }


    const resJson = JSON.stringify(result, null, 4)

    const filePath = path.resolve('src/json/data.json');
    fs.writeFileSync(filePath, resJson, 'utf8');

    await browser.close()

}
main()