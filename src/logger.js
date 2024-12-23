import chalk from 'chalk';

export function logStart(url) {
  console.log(chalk.blue(`📥 Processing sitemap: ${url}...`));
}

export function logSuccess(outputPath) {
  console.log(chalk.green(`✅ PDF saved successfully to ${outputPath}`));
}

export function logError(error) {
  console.error(chalk.red('❌ Error:'), error.message);
}

export function logUsage() {
  console.log(chalk.yellow('Usage: npm start -- <sitemap-url> [output-path]'));
  console.log(chalk.gray('Example: npm start -- https://example.com/sitemap.xml output.pdf'));
}