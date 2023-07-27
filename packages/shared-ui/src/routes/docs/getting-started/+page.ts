import { extractHeadingFromMarkdown } from "$lib/utils.js";
import type { PageLoad } from "./$types.js";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async () => {
  try {
    // @ts-ignore
    const article = await import(`../../../articles/GettingStarted.md`);

    const raw = await import(`../../../articles/GettingStarted.md?raw`);

    const headings = extractHeadingFromMarkdown(raw.default);

    return {
      content: article.default,
      meta: article.metadata,
      headings,
    };
  } catch (err) {
    console.log(err);
    throw error(404, `Could not find getting started`);
  }
};
