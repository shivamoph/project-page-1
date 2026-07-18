export const productImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85"
];

export const products = [
  "Auralux Runner Pro",
  "Auralux Studio Knit",
  "SlateForm Trainer",
  "Emerald Aero Sole",
  "Indigo Motion 2",
  "Cloudstep Utility"
].map((name, index) => ({
  id: name,
  name,
  price: 129 + index * 18,
  image: productImages[index % productImages.length],
  tag: index % 2 ? "New" : "Top rated"
}));

export const specs = [
  ["Upper", "Engineered recycled knit with soft nubuck overlays"],
  ["Midsole", "Dual-density responsive foam with emerald energy plate"],
  ["Outsole", "Zoned rubber grip for city, studio, and travel"],
  ["Weight", "268 g per shoe"],
  ["Care", "Spot clean with mild soap, air dry"],
  ["Warranty", "12 months manufacturing warranty"]
];

export const faqs = [
  ["Is this true to size?", "Yes, most customers choose their regular sneaker size. Size up for wider feet."],
  ["Can I use it for running?", "It is tuned for light runs, walking, travel, and training rather than marathon race days."],
  ["What is the return window?", "You get a 30-day return window on unworn pairs with original packaging."],
  ["Does it include extra laces?", "Yes. The box includes slate and emerald lace sets."]
];
