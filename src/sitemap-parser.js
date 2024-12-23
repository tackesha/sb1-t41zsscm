import { XMLParser } from 'fast-xml-parser';
import https from 'https';

export async function getSitemapUrls(sitemapUrl) {
  const xml = await fetchXml(sitemapUrl);
  const parser = new XMLParser();
  const result = parser.parse(xml);
  
  // Handle standard sitemap format
  if (result.urlset?.url) {
    return result.urlset.url.map(entry => entry.loc);
  }
  
  return [];
}

function fetchXml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}