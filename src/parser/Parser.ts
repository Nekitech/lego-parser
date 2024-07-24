import {ElementT, puppeteerSettings, Selector, SetT} from "./types.js";

export class Parser {
    constructor(protected url: string, private selectors: Selector, private puppeteerSettings: puppeteerSettings) {

    }

    public async parser() {
        let _url = this.url;
        const {page} = this.puppeteerSettings
        await page.goto(_url, );
        await page.waitForSelector(this.puppeteerSettings.waitContent, {
            timeout: 60000
        });

        const sets : SetT = {
            sets: {
                details: []
            }
        }
        const elements: ElementT[] = []
        const innerParamsEvaluate = {
            selectors: this.selectors,
        }


        const result =  await page.evaluate(({selectors}) => {
            const getTextElementBySelector = (el: Element, selector: string): string => {
                return el.querySelector(selector)?.textContent || ''
            }
            const rows = Array.from(document.querySelectorAll(selectors.row))
            const details =  rows.map((el) => {
                const element = Number(getTextElementBySelector(el, selectors?.element))
                const qty = Number(getTextElementBySelector(el, selectors?.qty))
                const name_set = getTextElementBySelector(document.querySelector('body') as Element, selectors.name_set)
                return {
                    element,
                    qty,
                    name_set
                }
            });

            const elements = rows.map((el, ix) => {
                const colour = getTextElementBySelector(el, selectors?.colour)
                const category = getTextElementBySelector(el, selectors?.category)
                const design = Number(getTextElementBySelector(el, selectors?.design));
                const element_name = getTextElementBySelector(el, selectors?.element_name);
                const element_in_sets = Number(getTextElementBySelector(el, selectors?.element_in_sets));
                const element_introduced_in = Number(getTextElementBySelector(el, selectors?.element_introduced_in));
                const design_in_sets = Number(getTextElementBySelector(el, selectors?.design_in_sets));
                const design_introduced_in = Number(getTextElementBySelector(el, selectors?.design_introduced_in));
                const element_id = Number(details[ix].element)

                return {
                    element_id,
                    colour,
                    category,
                    design,
                    element_name,
                    element_in_sets,
                    element_introduced_in,
                    design_in_sets,
                    design_introduced_in
                }
            })

            return {
                details,
                elements
            }

        }, innerParamsEvaluate)

        result.details.forEach((item) => {
            return sets.sets.details.push(item);
        });

        result.elements.forEach((item) => {
            elements.push(item)
        })
        return [sets, elements]

    }
}