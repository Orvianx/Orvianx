import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const prerender = true;

function parseDate(dateStr) {
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function GET(context) {
  const posts = await getCollection("post");

  const sortedPosts = posts.sort(
    (a, b) =>
      parseDate(b.data.dateFormatted).getTime() -
      parseDate(a.data.dateFormatted).getTime(),
  );

  return rss({
    title: "Hamza Madani — Orvianx",
    description:
      "Writing by Hamza Madani on software engineering, system design, security, and technology.",
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: parseDate(post.data.dateFormatted),
      description: post.data.description,
      link: `/post/${post.slug}/`,
    })),
    customData: "<language>en</language>",
  });
}
