import type { ExtractedPageData } from "./crawl.js";
import path from "node:path";
import * as fs from 'node:fs';

export function writeJSONReport(
    pageData: Record<string, ExtractedPageData>,
    filename = "report.json",
): void {
    const sorted = Object.values(pageData).sort((a, b) => a.url.localeCompare(b.url));
    const jsonString = JSON.stringify(sorted, null, 2);
    const resolvedPath = path.resolve(process.cwd(), filename);
    fs.writeFileSync(resolvedPath, jsonString);
};