import { generatePDF } from './pdf-generator.js';
import { getSitemapUrls } from './sitemap-parser.js';
import { logStart, logSuccess, logError, logUsage } from './logger.js';

async function websiteToPDF(sitemapUrl, outputPath = 'output.pdf') {
  try {
    logStart(sitemapUrl);
    const urls = await getSitemapUrls(sitemapUrl);
    if (urls.length === 0) {
      throw new Error('No URLs found in sitemap');
    }
    console.log(`Found ${urls.length} pages to process...`);
    await generatePDF(urls, outputPath);
    logSuccess(outputPath);
  } catch (error) {
    logError(error);
  }
}

const url = process.argv[2];
const output = process.argv[3];

if (!url) {
  logUsage();
  process.exit(1);
}

websiteToPDF(url, output);