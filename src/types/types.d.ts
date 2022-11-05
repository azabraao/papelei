type Product = {
  code?: string;
  objectID: string;
  image: string;
  name: string;
  description: string;
  price: number;
  business: Business;
};

type Client = {
  name: string;
  address: string;
};

interface CartProduct extends Product {
  quantity: number;
  isValid: boolean;
}

type Business = {
  id: string;
  name: string;
  picture?: string;
  User?: User;
  userId?: string;
};

type User = {
  id?: string;
  name: string;
  email: string;
  picture?: string;
  googleId?: string;
  facebookId?: string;
  business?: Business[];
  businessIDs?: string[];
};

declare global {
  interface Window {
    FB: {
      login: VoidFunction;
      api: VoidFunction;
    };
  }
}

window.FB = window.FB || {};
