import type { Article } from "$lib/types.js";
import { json } from "@sveltejs/kit";

const getComponents = async () => {
  let components: Article[] = [];

  const paths = import.meta.glob("/src/articles/stores/*.md", {
    eager: true,
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as Omit<Article, "slug">;
      const article = { ...metadata, slug } satisfies Article;
      article.published && components.push(article);
    }
  }

  return components;
};

export const GET = async () => {
  const components = await getComponents();
  return json(components);
};
