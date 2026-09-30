export const cafe = {
  name: "Danial's Cafe & Bistro",
  tagline: "Your Everyday Hangout Spot",
  address: "Opposite Gaushala, near MGM School, Faridkot, Punjab 151203",
  phone: "078145 00305",
  phoneHref: "tel:+917814500305",
  email: "danialscafeandbistro@gmail.com",
  emailHref: "mailto:danialscafeandbistro@gmail.com?subject=Inquiry%20-%20Danial's%20Cafe%20%26%20Bistro",
  whatsappHref: "https://wa.me/917814500305",
  rating: "4.6",
  reviews: "122",
  priceRange: "₹1–200 per person",
  mapsQuery: "Danial's Cafe and Bistro, Faridkot, Punjab 151203",
  get mapsEmbed() {
    return `https://www.google.com/maps?q=${encodeURIComponent(this.mapsQuery)}&output=embed`;
  },
  get mapsLink() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.mapsQuery)}`;
  },
  orderHref: "https://wa.me/917814500305?text=Hi%20Danial's%20Cafe%2C%20I%27d%20like%20to%20place%20an%20order",
  instagramHandle: "danials_cafeandbistro",
  instagramHref: "https://www.instagram.com/danials_cafeandbistro/",
  facebookHandle: "Danial's Cafe & Bistro",
  facebookHref: "https://www.facebook.com/danialscafeandbistro",
  hours: "Mon – Sun: 10:00 AM – 10:30 PM (Open 7 Days)",
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  isPopular?: boolean;
};

export type MenuCategory = { id: string; label: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    id: "burgers",
    label: "Burgers & Fries",
    items: [
      { id: "b1", name: "Classic Veg Burger", description: "Crisp patty, fresh lettuce, tomato, onion and house sauce.", price: "₹79", priceNumber: 79 },
      { id: "b2", name: "Cheese Burst Burger", description: "Double cheese layer with roasted bun and herb mayo.", price: "₹119", priceNumber: 119, isPopular: true },
      { id: "b3", name: "Paneer Tikka Burger", description: "Tandoori spiced grilled paneer with tangy mint chutney.", price: "₹129", priceNumber: 129, isPopular: true },
      { id: "b4", name: "Salted Fries", description: "Hot, golden crisp and lightly salted.", price: "₹69", priceNumber: 69 },
      { id: "b5", name: "Peri Peri Fries", description: "Tossed in fiery and tangy African peri peri seasoning.", price: "₹89", priceNumber: 89, isPopular: true },
    ],
  },
  {
    id: "pizza",
    label: "Artisan Pizza",
    items: [
      { id: "p1", name: "Margherita Pizza", description: "Classic tomato sauce, fresh mozzarella and basil leaves.", price: "₹149", priceNumber: 149 },
      { id: "p2", name: "Farmhouse Veg Pizza", description: "Crisp capsicum, onion, golden corn and mushroom.", price: "₹189", priceNumber: 189, isPopular: true },
      { id: "p3", name: "Paneer Tikka Pizza", description: "Marinated tandoori paneer, red paprika and onion.", price: "₹199", priceNumber: 199, isPopular: true },
      { id: "p4", name: "Cheese Garlic Bread", description: "Buttery toasted baguette under melted mozzarella.", price: "₹99", priceNumber: 99 },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches & Wraps",
    items: [
      { id: "s1", name: "Grilled Cheese Sandwich", description: "Golden toasted bread with a molten melted cheese core.", price: "₹89", priceNumber: 89 },
      { id: "s2", name: "Veg Club Sandwich", description: "Triple decker loaded with fresh cucumber, tomato & cheese.", price: "₹119", priceNumber: 119, isPopular: true },
      { id: "s3", name: "Paneer Tikka Wrap", description: "Flaky tortilla rolled with grilled paneer and mint sauce.", price: "₹109", priceNumber: 109 },
      { id: "s4", name: "Spicy Veg Roll", description: "Crunchy veggies, schezwan sauce in a soft roll.", price: "₹79", priceNumber: 79 },
    ],
  },
  {
    id: "snacks",
    label: "Punjabi Snacks",
    items: [
      { id: "sn1", name: "Chole Bhature", description: "Spiced Punjabi chickpeas with two fluffy golden bhature.", price: "₹99", priceNumber: 99, isPopular: true },
      { id: "sn2", name: "Amritsari Kulcha", description: "Tandoori stuffed potato kulcha served with butter & chole.", price: "₹119", priceNumber: 119, isPopular: true },
      { id: "sn3", name: "Crispy Paneer Pakora", description: "Golden batter-fried paneer fritters with mint dip.", price: "₹99", priceNumber: 99 },
      { id: "sn4", name: "Aloo Tikki Chaat", description: "Crispy aloo tikki topped with sweet curd and tangy chutneys.", price: "₹69", priceNumber: 69 },
    ],
  },
  {
    id: "cold",
    label: "Shakes & Coolers",
    items: [
      { id: "sh1", name: "Thick Chocolate Shake", description: "Belgian chocolate blended with ice cream and whipped cream.", price: "₹129", priceNumber: 129, isPopular: true },
      { id: "sh2", name: "Oreo Crunch Shake", description: "Crushed Oreo cookies blended with chilled creamy milk.", price: "₹139", priceNumber: 139, isPopular: true },
      { id: "sh3", name: "Frothy Cold Coffee", description: "Classic blended iced coffee topped with chocolate dust.", price: "₹99", priceNumber: 99, isPopular: true },
      { id: "sh4", name: "Fresh Mint Mojito", description: "Muddled fresh mint, lime juice and sparkling soda over ice.", price: "₹89", priceNumber: 89 },
      { id: "sh5", name: "Fresh Lime Soda", description: "Sweet, salted or mixed freshly squeezed lime soda.", price: "₹59", priceNumber: 59 },
    ],
  },
  {
    id: "coffee",
    label: "Coffee & Hot Drinks",
    items: [
      { id: "c1", name: "Cappuccino", description: "Rich double espresso with velvety steamed milk and thick foam.", price: "₹89", priceNumber: 89, isPopular: true },
      { id: "c2", name: "Cafe Latte", description: "Smooth espresso shot with generous silky steamed milk.", price: "₹99", priceNumber: 99 },
      { id: "c3", name: "Rich Hot Chocolate", description: "Decadent melted cocoa topped with cream & marshmallows.", price: "₹119", priceNumber: 119 },
      { id: "c4", name: "Desi Masala Chai", description: "Brewed strong with crushed ginger, cardamom and cloves.", price: "₹49", priceNumber: 49, isPopular: true },
      { id: "c5", name: "Classic Espresso", description: "A bold, intense single shot with rich hazel crema.", price: "₹69", priceNumber: 69 },
    ],
  },
  {
    id: "south",
    label: "South Indian",
    items: [
      { id: "si1", name: "Butter Masala Dosa", description: "Golden crispy crepe with spiced mashed potato filling.", price: "₹99", priceNumber: 99, isPopular: true },
      { id: "si2", name: "Plain Paper Dosa", description: "Thin crunchy dosa served with piping hot sambar & chutney.", price: "₹79", priceNumber: 79 },
      { id: "si3", name: "Steamed Idli Sambar", description: "Two soft steamed rice cakes immersed in hot tangy sambar.", price: "₹69", priceNumber: 69 },
      { id: "si4", name: "Onion Tomato Uttapam", description: "Thick savory pancake topped with onion and fresh tomatoes.", price: "₹89", priceNumber: 89 },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { id: "d1", name: "Sizzling Chocolate Brownie", description: "Warm fudge brownie served with vanilla ice cream.", price: "₹139", priceNumber: 139, isPopular: true },
      { id: "d2", name: "Classic Fudge Brownie", description: "Gooey chocolate brownie with walnuts.", price: "₹99", priceNumber: 99 },
      { id: "d3", name: "Danial's Special Sundae", description: "Three scoops layered with chocolate fudge, nuts & wafers.", price: "₹129", priceNumber: 129 },
    ],
  },
];

