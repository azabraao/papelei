import algoliasearch from "algoliasearch";
const client = algoliasearch("KXZF45TBGV", "9d0057c54cfa9e13ad0049cc3b845c91");
export const algolia = client.initIndex("products");
