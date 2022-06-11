type Product = {
  objectID: string;
  code: string;
  image: string;
  name: string;
  description: string;
  archived: boolean;
  price: {
    sale: {
      deferred: string;
      cash: string;
    };
    provider: string;
  };
};
