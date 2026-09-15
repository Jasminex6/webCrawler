import { crawlSiteAsync } from "./crawl.js";
import { writeJSONReport } from "./report.js";

async function main() {
    const argCount = process.argv.length - 2;
    if (argCount < 1 || argCount > 3) {
        console.log("Too many / Too few args, Enter 3 args. \n");
        process.exit(1);
    } else {
        const baseURL = process.argv[2];
        const maxConcurrency = Number(process.argv[3]);
        const maxPages = Number(process.argv[4]);
        console.log(`Let's get this shit DONE \n`);
        const pages = await crawlSiteAsync(baseURL, maxConcurrency, maxPages);
        const json = writeJSONReport(pages , "report.json");
        console.log("Finished crawling.");

        process.exit(0);
    }
}

main();


