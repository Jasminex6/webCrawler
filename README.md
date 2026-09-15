# Web Crawler

A small TypeScript crawler built while working through Boot.dev's Web Crawler project. It crawls pages on one hostname, extracts each page's heading, first paragraph, links, and images, then writes the results to `report.json`.

## Requirements

- Node.js 22 (see `.nvmrc`)

## Run

```sh
npm install
npm start -- <url> <max-concurrency> <max-pages>
```

Example:

```sh
npm start -- https://example.com 5 20
```

The generated `report.json` is ignored by Git.

## Test

```sh
npm test
```

Only crawl sites you have permission to access, and use conservative concurrency and page limits.
