export type Categories = "sveltekit" | "svelte";

export type Article = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author: string;
  published: boolean;
};
