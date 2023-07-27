import { extractHeadingFromMarkdown } from "$lib/utils.js";
import type { PageLoad } from "./$types.js";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  try {
    const component = await import(
      `../../../../articles/components/${params.slug}.md`
    );

    const raw = await import(
      `../../../../articles/components/${params.slug}.md?raw`
    );

    const headings = extractHeadingFromMarkdown(raw.default);

    return {
      content: component.default,
      meta: component.metadata,
      headings,
    };
  } catch (err) {
    throw error(404, `Could not find ${params.slug}`);
  }
};
