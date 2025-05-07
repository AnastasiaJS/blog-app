const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

async function generate () {
  const feed = new RSS({
    title: "Anastasia",
    site_url: "https://yoursite.com",
    feed_url: "https://yoursite.com/feed.xml",
  });

  const posts = await fs.readdir(path.join(__dirname, "..", "pages", "posts"));

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith("index.")) return;

      const content = await fs.readFile(
        path.join(__dirname, "..", "pages", "posts", name),
      );
      const frontmatter = matter(content);
      const date = frontmatter.data.date
        ? new Date(frontmatter.data.date)
        : new Date();
      // console.log('-----',frontmatter.data.tag)
      feed.item({
        title: frontmatter.data.title,
        url: "/posts/" + name.replace(/\.mdx?/, ""),
        date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        description: frontmatter.data.description,
        categories: frontmatter.data.tag.split(", "),
        author: frontmatter.data.author,
      });
    }),
  );

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
