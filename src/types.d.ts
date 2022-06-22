type Product = {
  objectID: string;
  code: string;
  image: string;
  name: string;
  description: string;
  archived: boolean;
  price: {
    sale: {
      deferred: number;
      cash: number;
    };
    provider: number;
  };
};
