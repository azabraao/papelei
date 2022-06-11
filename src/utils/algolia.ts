import algoliasearch from "algoliasearch";
const client = algoliasearch("EF78ST11CD", "651bf625e87ed270a58e0b591ecba397");
export const algolia = client.initIndex("products");
