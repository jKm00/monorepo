import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";
import { extractHeadingFromMarkdown } from "$lib/utils.js";

export const load: PageLoad = async ({ params }) => {
  try {
    const store = await import(`../../../../articles/stores/${params.slug}.md`);

    const raw = await import(
      `../../../../articles/stores/${params.slug}.md?raw`
    );

    const headings = extractHeadingFromMarkdown(raw.default);

    return {
      content: store.default,
      meta: store.metadata,
      headings,
    };
  } catch (err) {
    throw error(400, `Could not find store ${params.slug}`);
  }
};
