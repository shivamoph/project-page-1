export type Category = {
  id: string;
  name: string;
};

export type CatalogProduct = {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  discount: number;
  image: string;
};

export const catalogCategories: Category[] = [
  { id: "office", name: "Office Supplies" },
  { id: "electrical", name: "Electrical" },
  { id: "power-tools", name: "Power Tools" },
  { id: "safety", name: "Safety" },
  { id: "pumps", name: "Pumps" },
  { id: "packaging", name: "Packaging" },
  { id: "hand-tools", name: "Hand Tools" },
  { id: "lab", name: "Lab Supplies" }
];

export const catalogProducts: CatalogProduct[] = [
  {
    id: "office-toner",
    categoryId: "office",
    name: "Compatible Black Toner Cartridge",
    brand: "Generic",
    price: 412,
    rating: 4.4,
    discount: 18,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "office-files",
    categoryId: "office",
    name: "450 GSM Cobra File Clip Folder",
    brand: "Solo",
    price: 109,
    rating: 4.2,
    discount: 12,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "electrical-tape",
    categoryId: "electrical",
    name: "Black PVC Insulation Tape",
    brand: "Gripwell",
    price: 152,
    rating: 4.6,
    discount: 22,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "electrical-ties",
    categoryId: "electrical",
    name: "Self Locking Nylon Cable Ties",
    brand: "IBCab",
    price: 150,
    rating: 4.5,
    discount: 30,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "power-drill",
    categoryId: "power-tools",
    name: "Cordless Impact Drill Machine",
    brand: "Bosch",
    price: 2899,
    rating: 4.7,
    discount: 16,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "power-grinder",
    categoryId: "power-tools",
    name: "Angle Grinder with Guard",
    brand: "Dewalt",
    price: 3499,
    rating: 4.8,
    discount: 11,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "safety-gloves",
    categoryId: "safety",
    name: "Cotton Knitted Safety Gloves",
    brand: "Karam",
    price: 156,
    rating: 4.3,
    discount: 25,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "safety-coverall",
    categoryId: "safety",
    name: "Blended Polyester Protective Coverall",
    brand: "Venus",
    price: 314,
    rating: 4.1,
    discount: 20,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pump-motor",
    categoryId: "pumps",
    name: "Domestic Water Pump 0.5 HP",
    brand: "Kirloskar",
    price: 3299,
    rating: 4.5,
    discount: 14,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "packaging-box",
    categoryId: "packaging",
    name: "Corrugated Shipping Box",
    brand: "Ace",
    price: 988,
    rating: 4.4,
    discount: 19,
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "hand-spanner",
    categoryId: "hand-tools",
    name: "Chrome Vanadium Spanner Set",
    brand: "Taparia",
    price: 749,
    rating: 4.6,
    discount: 17,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=500&q=80"
  }
];
