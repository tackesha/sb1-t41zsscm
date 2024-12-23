import puppeteer from 'puppeteer';

export async function generatePDF(urls, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Create PDF with first page
  await page.goto(urls[0], { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  // Add remaining pages
  if (urls.length > 1) {
    for (let i = 1; i < urls.length; i++) {
      await page.goto(urls[i], { waitUntil: 'networkidle0' });
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        },
        pageRanges: '1',
        displayHeaderFooter: true,
        footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="pageNumber"></span></div>',
        headerTemplate: '<div></div>',
      });
    }
  }
  
  await browser.close();
}