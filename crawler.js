const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.daangn.com/search/잠실/';

async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching HTML from ${url}: ${error}`);
    return null;
  }
}

function extractData(html) {
  const $ = cheerio.load(html);
  const list = [];
  $('.flea-market-article-link').each((index, element) => {
    const title = $(element).find('.article-title').text();
    console.log('title', title)
    if (title.includes('셔츠')) {
      list.push(title + ' https://www.daangn.com' + $(element).attr('href'));
    }
  });

  return { list };
}

async function main() {
  const html = await fetchHTML(url);

  if (html) {
    const data = extractData(html);
    console.log(data);
  }
}

main();
