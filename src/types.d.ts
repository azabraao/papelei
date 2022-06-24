type Product = {
  objectID: string;
  code: string;
  image: string;
  name: string;
  description: string;
  archived: boolean;
  price: {
    sale: {
      // for now, only deferred prices are shown to users
      deferred: number;
      cash: number;
    };
    provider: number;
  };
};
