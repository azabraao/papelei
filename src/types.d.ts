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

type Client = {
  name: string;
  address: string;
};

interface CartProduct extends Product {
  quantity: number;
  isValid: boolean;
}

type User = {
  id?: string;
  name: string;
  email: string;
  picture?: string;
  googleId?: string;
  facebookId?: string;
};
