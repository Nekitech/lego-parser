import {Browser, Page} from "puppeteer";

export interface Selector {
  row: string;
  element: string;
  qty: string;
  colour: string
  category: string
  design: string
  element_name: string
  element_in_sets: string
  element_introduced_in: string
  design_in_sets: string
  design_introduced_in: string
}

export interface puppeteerSettings {
    browser:  Browser
    page: Page
    viewPort: {
        width: number
        height: number
    }
    waitContent: string

}

export type SetT = {
    sets: {
        name: string,
        details: DetailT[]
    }
}

export type DetailT = {
    element: number
    qty: number

}

export type ElementT = {
    element_id: number
    colour: string
    category: string
    design: number
    element_name: string
    element_in_sets: number
    element_introduced_in: number
    design_in_sets: number
    design_introduced_in: number
}