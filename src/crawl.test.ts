import { describe, expect, test } from "vitest";
import * as crawl from "./crawl.js";

// describe('links scrapping', () => {
//     test("getURLsFromHTML absolute", () => {
//         const inputURL = "https://crawler-test.com";
//         const inputBody = `<html><body><a href="/path/one"><span>Boot.dev</span></a></body></html>`;

//         const actual = crawl.getURLsFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/path/one"];

//         expect(actual).toEqual(expected);
//     });

//     test("getURLsFromHTML absolute multiple", () => {
//         const inputURL = "https://crawler-test.com";
//         const inputBody = `<html><body><a href="/path/one"><span>Boot.dev<a href="/path/two"></span></a></body></html>`;

//         const actual = crawl.getURLsFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/path/one", "https://crawler-test.com/path/two"];

//         expect(actual).toEqual(expected);
//     });

//     test("getURLsFromHTML relative", () => {
//         const inputURL = "https://crawler-test.com";
//         const inputBody = `<html><body><a href="https://crawler-test.com"><span>Boot.dev</span></a></body></html>`;

//         const actual = crawl.getURLsFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/"];

//         expect(actual).toEqual(expected);
//     });

//     test("getURLsFromHTML relative sub", () => {
//         const inputURL = "https://crawler-test.com/index.html";
//         const inputBody = `<html><body><a href="img.png"><span>Boot.dev</span></a></body></html>`;

//         const actual = crawl.getURLsFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/img.png"];

//         expect(actual).toEqual(expected);
//     });
//     test("getURLsFromHTML relative sub prime", () => {
//         const inputURL = "https://crawler-test.com/index.html/accounts";
//         const inputBody = `<html><body><a href="/img.png"><span>Boot.dev</span></a></body></html>`;

//         const actual = crawl.getURLsFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/img.png"];

//         expect(actual).toEqual(expected);
//     });
//     test("getURLsFromHTML extend", () => {
//         const inputURL = "https://crawler-test.com/index.html/accounts/";
//         const inputBody = `<html><body><a href="img.png"><span>Boot.dev</span></a></body></html>`;

//         const actual = crawl.getURLsFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/index.html/accounts/img.png"];

//         expect(actual).toEqual(expected);
//     });
// });

// describe('images scrapping', () => {
//     test("getImagesFromHTML relative root", () => {
//         const inputURL = "https://crawler-test.com";
//         const inputBody = `<html><body><img src="/logo.png" alt="Logo"></body></html>`;

//         const actual = crawl.getImagesFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/logo.png"];

//         expect(actual).toEqual(expected);
//     });

//     test("getImagesFromHTML  multiple", () => {
//         const inputURL = "https://crawler-test.com";
//         const inputBody = `<html><body><img src="/logo.png" alt="Logo"><img src="/cat.png" alt="Logo"><img src="/pfp.png" alt="Logo"></body></html>`;

//         const actual = crawl.getImagesFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/logo.png", "https://crawler-test.com/cat.png", "https://crawler-test.com/pfp.png"];

//         expect(actual).toEqual(expected);
//     });

//     test("getImagesFromHTML relative sub 1", () => {
//         const inputURL = "https://crawler-test.com/photos";
//         const inputBody = `<html><body><img src="logo.png" alt="Logo"></body></html>`;

//         const actual = crawl.getImagesFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/logo.png"];

//         expect(actual).toEqual(expected);
//     });
//     test("getImagesFromHTML relative sub 2", () => {
//         const inputURL = "https://crawler-test.com/photos";
//         const inputBody = `<html><body><img src="/logo.png" alt="Logo"></body></html>`;

//         const actual = crawl.getImagesFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/logo.png"];

//         expect(actual).toEqual(expected);
//     });

//     test("getImagesFromHTML relative no sub", () => {
//         const inputURL = "https://crawler-test.com/photos/";
//         const inputBody = `<html><body><img src="logo.png" alt="Logo"></body></html>`;

//         const actual = crawl.getImagesFromHTML(inputBody, inputURL);
//         const expected = ["https://crawler-test.com/photos/logo.png"];

//         expect(actual).toEqual(expected);
//     });

//     test("getImagesFromHTML different base", () => {
//         const inputURL = "https://crawler-test.com";
//         const inputBody = `<html><body><img src="https://www.boot.dev/_nuxt/rare_chest_large_closed.DAYmIs4o.png">
// </body></html>`;

//         const actual = crawl.getImagesFromHTML(inputBody, inputURL);
//         const expected = ["https://www.boot.dev/_nuxt/rare_chest_large_closed.DAYmIs4o.png"];

//         expect(actual).toEqual(expected);
//     });
// });

// describe('urltest', () => {
//     test('url1', () => {
//         const tests = [
//             "https://www.boot.dev/blog/path/",
//             "https://www.boot.dev/blog/path",
//             "http://www.boot.dev/blog/path/",
//             "http://www.boot.dev/blog/path",
//         ];
//         const normalized = tests.map((link: string) => crawl.normalizeURL(link));
//         normalized.forEach((result) => {
//             expect(result).toBe('www.boot.dev/blog/path')
//         })
//     });
// });

// describe('htmlgrab', () => {
//     test("getHeadingFromHTML basic", () => {
//         const inputBody = `<html><body><h1>Test Title</h1></body></html>`;
//         const actual = crawl.getHeadingFromHTML(inputBody);
//         const expected = "Test Title";
//         expect(actual).toEqual(expected);
//     });
//     test("getHeadingFromHTML empty", () => {
//         const inputBody = `<html><body><h1></h1></body></html>`;
//         const actual = crawl.getHeadingFromHTML(inputBody);
//         const expected = "";
//         expect(actual).toEqual(expected);
//     });
//     test("getHeadingFromHTML fallback", () => {
//         const inputBody = `<html><body><h1></h1><h2>hellomf</h2></body></html>`;
//         const actual = crawl.getHeadingFromHTML(inputBody);
//         const expected = "hellomf";
//         expect(actual).toEqual(expected);
//     });

//     test("getFirstParagraphFromHTML main priority", () => {
//         const inputBody = `
//     <html><body>
//       <p>Outside paragraph.</p>
//       <main>
//         <p>Main paragraph.</p>
//       </main>
//     </body></html>
//   `;
//         const actual = crawl.getFirstParagraphFromHTML(inputBody);
//         const expected = "Main paragraph.";
//         expect(actual).toEqual(expected);
//     });

//     test("getFirstParagraphFromHTML fallback with empty p in main tag", () => {
//         const inputBody = `
//     <html><body>
//       <p>Outside paragraph.</p>
//       <main>
//         <p></p>
//       </main>
//     </body></html>
//   `;
//         const actual = crawl.getFirstParagraphFromHTML(inputBody);
//         const expected = "Outside paragraph.";
//         expect(actual).toEqual(expected);
//     });

//     test("getFirstParagraphFromHTML fallback no p in main tag", () => {
//         const inputBody = `
//     <html><body>
//       <p>Outside paragraph.</p>
//       <main>
        
//       </main>
//     </body></html>
//   `;
//         const actual = crawl.getFirstParagraphFromHTML(inputBody);
//         const expected = "Outside paragraph.";
//         expect(actual).toEqual(expected);
//     });
//     test("getFirstParagraphFromHTML no main", () => {
//         const inputBody = `
//     <html><body>
//       <p>Outside paragraph.</p>
//     </body></html>
//   `;
//         const actual = crawl.getFirstParagraphFromHTML(inputBody);
//         const expected = "Outside paragraph.";
//         expect(actual).toEqual(expected);
//     });

//     test("getFirstParagraphFromHTML the nothingness", () => {
//         const inputBody = `
//     <html><body>
     
//     </body></html>
//   `;
//         const actual = crawl.getFirstParagraphFromHTML(inputBody);
//         const expected = "";
//         expect(actual).toEqual(expected);
//     });
// });

describe('extract page data', () => {
    test("extractPageData basic", () => {
        const inputURL = "https://crawler-test.com";
        const inputBody = `
    <html><body>
      <h1>Test Title</h1>
      <p>This is the first paragraph.</p>
      <a href="/link1">Link 1</a>
      <img src="/image1.jpg" alt="Image 1">
    </body></html>
  `;

        const actual = crawl.extractPageData(inputBody, inputURL);
        const expected = {
            url: "https://crawler-test.com",
            heading: "Test Title",
            first_paragraph: "This is the first paragraph.",
            outgoing_links: ["https://crawler-test.com/link1"],
            image_urls: ["https://crawler-test.com/image1.jpg"],
        };

        expect(actual).toEqual(expected);
    });
});