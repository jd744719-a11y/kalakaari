/* ==========================================================================
   Kalakari Designs — products.js
   The single source of truth for categories and products.
   Add / edit / remove items here and every page updates.

   IMAGES: drop a file named  assets/images/<id>.jpg  (e.g. secret-candle.jpg)
   and it automatically replaces the emoji placeholder.

   PRICES: use  price + was  for a sale item, or  min + max  for a range.
   url: where "View product" goes. Currently points to your live store.
   ========================================================================== */

const STORE = "https://kalakaridesigns.com";

const CATEGORIES = [
  { id: "candles",      name: "Candles",            emoji: "🕯️", tint: "tint-3", blurb: "Light up your home with positivity", url: STORE + "/product-category/candles/" },
  { id: "planters",     name: "Planters",           emoji: "🪴", tint: "tint-1", blurb: "Indoor greens in a cooler pot.",       url: STORE + "/product-category/planters/" },
  { id: "key-chains",   name: "Key Chains",         emoji: "🔑", tint: "tint-2", blurb: "Small things that carry a big smile.", url: STORE + "/product-category/key-chains/" },
  { id: "coasters",     name: "Coasters",           emoji: "🍵", tint: "tint-0", blurb: "Protect the table, show off the design.", url: STORE + "/product-category/coasters/" },
  { id: "fridge-magnets", name: "Fridge Magnets",   emoji: "🧲", tint: "tint-4", blurb: "Give the fridge door some personality.", url: STORE + "/product-category/fridge-magnets/" },
  { id: "toys",         name: "Toys",               emoji: "🧸", tint: "tint-3", blurb: "Cute toys and desk toys for all ages.", url: STORE + "/product-category/cute-toys/" },
  { id: "desk-gadgets", name: "Office Desk Decorators", emoji: "🖊️", tint: "tint-2", blurb: "Phone holders, watch stands, pen stands and more.", url: STORE + "/product-category/desk-gadgets/" },
  { id: "jewelry-box",  name: "Jewelry Box",        emoji: "💍", tint: "tint-0", blurb: "A pretty home for your favourites.",    url: STORE + "/product-category/jewelry-box/" },
  { id: "wall-decor",   name: "Wall Decor",         emoji: "🖼️", tint: "tint-1", blurb: "Make a blank wall say something.",      url: STORE + "/product-category/wall-decor/" },
  { id: "bathroom",     name: "Sophisticated Bathroom Solutions", emoji: "🛁", tint: "tint-4", blurb: "Organisers and makeup storage that look good.", url: STORE + "/product-category/sophisticated-bathroom-solutions/" },
  { id: "kitchen",      name: "Kitchen",            emoji: "🍟", tint: "tint-3", blurb: "Handy kitchen finds with a fun twist.", url: STORE + "/product-category/kitchen/" },
  { id: "gaming",       name: "Gaming",             emoji: "🎮", tint: "tint-2", blurb: "Stands and accessories for your setup.", url: STORE + "/product-category/gaming/" }
];

const PRODUCTS = [
  { id: "secret-candle",  name: "Secret Message Candle",                 cat: "candles",      emoji: "🕯️", price: 399,  was: 1100, url: STORE + "/product/secret-message-candle/" },
  { id: "sorting-hat-candle", name: "Sorting Hat Candle",                cat: "candles",      emoji: "🧙", price: 800,  was: 2500, url: STORE + "/product/sorting-hat-candle/" },
  { id: "cat-jewellery-box", name: "Cute Cat Shaped Jewellery Box (3 Compartments)", cat: "jewelry-box", emoji: "🐱", price: 950, was: 2100, url: STORE + "/product/cute-cat-shaped-jewellery-box-3-compartments/" },
  { id: "desk-organizer", name: "Multi-Purpose Desk Organizer – Pen Stand, Plant Pot & Makeup Holder", cat: "desk-gadgets", emoji: "🗂️", price: 1190, was: 1499, url: STORE + "/product/multi-purpose-desk-organizer/" },
  { id: "toothbrush-holder", name: "Elegant Modern Toothbrush Holder (3 pc set)", cat: "bathroom", emoji: "🪥", price: 650, was: 1100, url: STORE + "/product/elegant-modern-toothbrush-holder/" },
  { id: "bathroom-organizer", name: "Modern Bathroom Organizer, Eco-Friendly PLA (Black)", cat: "bathroom", emoji: "🧴", price: 999, was: 1200, url: STORE + "/product/modern-bathroom-organizer/" },
  { id: "makeup-organizer", name: "Spinning Makeup Organizer – Black, White, Beige & Marble", cat: "bathroom", emoji: "💄", price: 950, url: STORE + "/product/makeup-organizer/" },
  { id: "crochet-flowers", name: "Elegant Crochet Flower Gift – Sunflower, Cactus, Tulip & Jasmine", cat: "planters", emoji: "🌻", min: 550, max: 650, url: STORE + "/product/elegant-crochet-flower-gifts-sunflower-cactus-tulip-jasmine/" },
  { id: "crumpled-pot",   name: "Crumpled Look Flower Pot – Indoor Planter for Desk or Shelf", cat: "planters", emoji: "🪴", min: 380, max: 390, url: STORE + "/product/crumpled-look-flower-pot-stylish-indoor-planter-for-desk-or-shelf/" },
  { id: "plant-stand",    name: "Decorative Desk Plant Stands – Modern Style", cat: "desk-gadgets", emoji: "🌿", price: 499, was: 1400, url: STORE + "/product/decorative-desk-plant-stands-modern-style/" },
  { id: "mario-stand",    name: "Mario PS5 Controller Stand",           cat: "gaming",       emoji: "🎮", min: 660, max: 1990, url: STORE + "/product/mario-ps5-controller-stand/" },
  { id: "fries-clips",    name: "French Fries Shaped Bag Sealing Clips (Set of 10)", cat: "kitchen", emoji: "🍟", price: 410, was: 560, url: STORE + "/product/bag-sealing-clips/" },
  { id: "one-wish-willow", name: "One Wish Willow Collectible Toy",     cat: "toys",         emoji: "🪄", price: 250, was: 499, url: STORE + "/product/one-wish-willow-vintage-novelty-toy-breakable-wooden-wish-stick-gag-gift-retro-party-trick-for-kids-and-adults/" },
  { id: "motivation-sign", name: "Motivation Sign – “Stop Being POOR”", cat: "wall-decor",   emoji: "💪", min: 399, max: 499, url: STORE + "/product/motivation-sign-stop-being-poor/" }
];

/* Which products appear in each homepage section (by id) */
const HOME_RECOMMENDED = ["one-wish-willow", "mario-stand", "fries-clips", "desk-organizer", "toothbrush-holder", "bathroom-organizer", "crochet-flowers", "cat-jewellery-box", "motivation-sign", "secret-candle"];
const HOME_NEW = ["toothbrush-holder", "desk-organizer", "crumpled-pot", "cat-jewellery-box", "sorting-hat-candle", "secret-candle", "crochet-flowers", "makeup-organizer", "fries-clips", "plant-stand"];
