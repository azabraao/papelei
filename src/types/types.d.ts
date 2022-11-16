type Product = {
  code?: string;
  objectID: string;
  image: string;
  name: string;
  description: string;
  price: number;
  business: Business;
  deleteRequested: boolean;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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

type theme =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "danger";
