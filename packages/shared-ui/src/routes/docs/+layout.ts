import type { Article } from "$lib/types.js";
import type { LayoutLoad } from "./$types.js";

export const load: LayoutLoad = async ({ fetch }) => {
  const fetchComponents = async () => {
    const response = await fetch("/api/articles/components");
    const components: Article[] = await response.json();
    return components;
  };

  const fetchStores = async () => {
    const response = await fetch("/api/articles/stores");
    const stores: Article[] = await response.json();
    return stores;
  };

  return {
    components: fetchComponents(),
    stores: fetchStores(),
  };
};
