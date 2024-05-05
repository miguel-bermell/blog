import fm from 'front-matter';
import * as fs from 'fs';
import { defineEventHandler } from 'h3';
import * as path from 'path';
import RSS from 'rss'
import PostAttributes from 'src/app/post-attributes';

const posts = fs.readdirSync('./src/content/en');

function getFileContentsByLang(postFile: string, lang: string) {
  return fs.readFileSync(
    path.resolve(`src/content/${lang}/${postFile}`),
    'utf8',
  )
}

async function generateRssFeed() {
  const site_url = 'https://bermell.dev';

  const feedOptions = {
    title: `Miguel Bermell Blog | RSS Feed`,
    description: 'Notes',
    site_url: site_url,
    feed_url: `${site_url}/api/rss.xml`,
    image_url: `${site_url}/images/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  posts
    .flatMap((postFile) => {
      const fileContents = {
        en: getFileContentsByLang(postFile, 'en'),
        es: getFileContentsByLang(postFile, 'es')
      };

      return [
        {attributes: fm(fileContents.en).attributes as PostAttributes, slug: postFile},
        {attributes: fm(fileContents.es).attributes as PostAttributes, slug: postFile}
      ];
    })
    .sort((a1, a2) => ((a1.attributes as any).date > (a2.attributes as any).date ? -1 : 1))
    .forEach(({attributes, slug}) => {
      feed.item({
        title: attributes.title,
        description: attributes.description,
        url: `${site_url}/blog/${slug}`,
        date: attributes.date,
        categories: attributes.tags
      });
    });

  return feed.xml({indent: true});
}

export default defineEventHandler(async (event) => {
  const feedString = await generateRssFeed();
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);
});
