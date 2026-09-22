export type Route = {
  page: string;
  sub?: string;
  product?: string;
  productPage?: string;
};

export interface ProductNavPage {
  id: string;
  label: string;
}

export interface ProductDef {
  id: string;
  label: string;
  tagline: string;
  description: string;
  accent: string;
  pages: ProductNavPage[];
}
