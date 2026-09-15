import pLimit, { LimitFunction } from 'p-limit';
import { JSDOM } from "jsdom";

export function normalizeURL(url: string) {
    const goodurl = new URL(url);
    const hostname = goodurl.hostname;
    let pathname = goodurl.pathname;
    if (pathname.at(-1) === '/') {
        pathname = pathname.slice(0, -1);
    }
    const normalizedURL = hostname + pathname;

    return normalizedURL;
}

export function getBaseURL(url: string) {
    const goodurl = new URL(url);
    const protocol = goodurl.protocol;
    const hostname = goodurl.hostname;
    let pathname = goodurl.pathname;
    if (pathname.at(-1) === '/') {
        pathname = pathname.slice(0, -1);
    }
    const baseURL = protocol + hostname + pathname;

    return baseURL;
}

// export async function getHTML(url: string) {

export function getHeadingFromHTML(html: string): string {
    const dom = new JSDOM(html);
    const h1 = dom.window.document.querySelector('h1')?.textContent;
    const h2 = dom.window.document.querySelector('h2')?.textContent;

    if (h1) {
        return h1;
    } else if (h2) {
        return h2;
    } else return "";

};
export function getFirstParagraphFromHTML(html: string): string {
    const dom = new JSDOM(html);
    const mainp = dom.window.document.querySelector('main p')?.textContent;
    const p = dom.window.document.querySelector('p')?.textContent;
    if (mainp) {
        return mainp;
    } else if (p) {
        return p;
    } else return "";

};

export function getURLsFromHTML(html: string, baseURL: string): string[] {
    const finalizedLinks: string[] = [];
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll('body a');
    for (const link of links) {
        const flink = link.getAttribute("href");
        if (flink !== null && flink) {
            const url = new URL(flink, baseURL);
            finalizedLinks.push(url.toJSON());
        }
    }
    return finalizedLinks;
};

export function getImagesFromHTML(html: string, baseURL: string): string[] {
    const finalizedImages: string[] = [];
    const dom = new JSDOM(html);
    const images = dom.window.document.querySelectorAll('body img');
    for (const image of images) {
        const fimg = image.getAttribute("src");
        if (fimg !== null && fimg) {
            const url = new URL(fimg, baseURL);
            finalizedImages.push(url.toJSON());
        }
    }
    return finalizedImages;
}

export function extractPageData(html: string, pageURL: string): ExtractedPageData {
    return {
        url: pageURL,
        heading: getHeadingFromHTML(html),
        first_paragraph: getFirstParagraphFromHTML(html),
        outgoing_links: getURLsFromHTML(html, pageURL),
        image_urls: getImagesFromHTML(html, pageURL),
    }
};

export type ExtractedPageData = {
    url: string;
    heading: string;
    first_paragraph: string;
    outgoing_links: string[];
    image_urls: string[];
}

//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "User-Agent": "BootCrawler/1.0",
//             }
//         });
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         if (!response.headers.get("content-type")?.includes("text/html")) {
//             throw new Error("Content type mismatch!");
//         }
//         const result = await response.text();
//         return result;
//     } catch (error) {
//         if (error instanceof Error) {
//             console.log(error.message);
//         }
//     }

// };

// export async function crawlPage(
//     baseURL: string,
//     currentURL: string = baseURL,
//     pages: Record<string, number> = {},
// ) {
//     const currenturl = new URL(currentURL, baseURL);
//     const baseurl = new URL(baseURL);
//     if (baseurl.hostname !== currenturl.hostname) {
//         return pages;
//     }
//     const normalizedurl = normalizeURL(currentURL);

//     if (pages[normalizedurl] && pages[normalizedurl] !== 0) {
//         pages[normalizedurl] += 1;
//         return pages;
//     } else if (pages[normalizedurl] === undefined) {
//         pages[normalizedurl] = 1;
//     }
//     const htmlContent = await getHTML(currentURL);

//     let allurls: string[] = [];
//     if (htmlContent !== undefined) {
//         allurls = getURLsFromHTML(htmlContent, currentURL);
//         for (const url of allurls) {
//             await crawlPage(baseURL, url, pages);
//         }
//     }
//     console.log(pages);
//     console.log("CRAWLING:", currentURL);
//     console.log("SEEN COUNT:", pages[normalizedurl]);
//     console.log("FOUND LINKS:", allurls.length);
//     return pages;

// };

export class ConcurrentCrawler {
    limit: LimitFunction;
    baseURL: string;
    pages: Record<string, ExtractedPageData>;
    maxConcurrency: number;
    maxPages: number;
    shouldStop: boolean;
    allTasks: Set<Promise<void>>;
    visited: Set<string>;

    constructor(baseURL: string, maxConcurrency: number, maxPages: number) {
        this.maxConcurrency = maxConcurrency;
        this.limit = pLimit(this.maxConcurrency);
        this.baseURL = baseURL;
        this.pages = {};
        this.maxPages = maxPages;
        this.shouldStop = false;
        this.allTasks = new Set();
        this.visited = new Set();
    }

    private addPageVisit(normalizedURL: string): boolean {
        if (this.shouldStop === true || this.visited.has(normalizedURL)) {
            return false;
        }
        if (this.visited.size >= this.maxPages) {
            this.shouldStop = true;
            console.log("Reached maximum number of pages to crawl.");
            return false;
        }
        
        this.visited.add(normalizedURL);
        return true
    }

    private async getHTML(currentURL: string): Promise<string> {
        return await this.limit(async () => {
            const response = await fetch(currentURL, {
                method: "GET",
                headers: {
                    "User-Agent": "BootCrawler/1.0",
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            if (!response.headers.get("content-type")?.includes("text/html")) {
                throw new Error("Content type mismatch!");
            }
            const result = await response.text();
            return result;
        });

    }

    private async crawlPage(currentURL: string): Promise<void> {
        if (this.shouldStop === true) {
            return;
        }
        const currenturl = new URL(currentURL, this.baseURL);
        const baseurl = new URL(this.baseURL);
        if (baseurl.hostname !== currenturl.hostname) {
            return;
        }
        const normalizedurl = normalizeURL(currentURL);

        if (this.addPageVisit(normalizedurl)) {
            const htmlContent = await this.getHTML(currentURL);
            if (htmlContent !== undefined) {
                // Current Change
                const data = extractPageData(htmlContent, currentURL);
                this.pages[normalizedurl] = data;

                for (const url of data.outgoing_links) {
                    const task = this.crawlPage(url);
                    this.allTasks.add(task);
                    task.finally(() => {
                        this.allTasks.delete(task);
                    });
                }
                console.log(this.pages);
                console.log("CRAWLING:", currentURL);
                console.log("SEEN COUNT:", this.pages[normalizedurl]);
                console.log("FOUND LINKS:", data.outgoing_links.length);
            }
            return;

        }
    }

    async crawl() {
        const firstTask = this.crawlPage(this.baseURL);
        this.allTasks.add(firstTask);
        firstTask.finally(() => {
            this.allTasks.delete(firstTask);
        });
        while (this.allTasks.size > 0) {
            await Promise.all(this.allTasks);
        }
        return this.pages;
    }
}

export async function crawlSiteAsync(baseURL: string, maxConcurrency: number, maxPages: number) {
    const crawlerInstance = new ConcurrentCrawler(baseURL, maxConcurrency, maxPages);
    return await crawlerInstance.crawl();
}