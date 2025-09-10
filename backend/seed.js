//
// seed.js - seed initial products
//
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const products = [
  // Dresses
  {
    name: "Red Anarkali",
    description: "Elegant festive anarkali dress.",
    price: 1799,
    image: "https://labeladitihundia.com/cdn/shop/products/Lavanya_Anarkali_Set-1_360x.png?v=1680547009",
    category: "dress",
  },
  {
    name: "Floral Maxi Dress",
    description: "Flowy floral maxi for outings.",
    price: 2099,
    image: "https://n.nordstrommedia.com/id/sr3/1e5ead33-a6eb-4865-a295-46df5d3a2dee.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=4",
    category: "dress",
  },
  {
    name: "Pastel Ruffle Dress",
    description: "Cute ruffle pastel dress.",
    price: 1299,
    image: "https://i.etsystatic.com/25925166/r/il/60ebd6/3550811445/il_fullxfull.3550811445_l22a.jpg",
    category: "dress",
  },
  {
    name: "Boho Style Dress",
    description: "Boho vibes everyday.",
    price: 1599,
    image: "https://th.bing.com/th/id/OIP.I7HxlTh9p1Gg-x4fzArxeQHaJ_?w=1024&h=1381&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    category: "dress",
  },
  // Crop tops
  {
    name: "White Ribbed Crop Top",
    description: "Comfy ribbed cotton.",
    price: 899,
    image: "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/20736378/2022/11/14/3efcec18-24f6-48a9-ab0e-988539cb239d1668396262857BlinkinWhiteCropTop1.jpg",
    category: "crop",
  },
  {
    name: "Black Slogan Crop",
    description: "Street-style cool.",
    price: 749,
    image: "https://images.riverisland.com/is/image/RiverIsland/black-soho-street-shoulder-pad-t-shirt_787941_main?$productImageLarge$",
    category: "crop",
  },
  {
    name: "Peach Puff Sleeve Top",
    description: "Soft and chic.",
    price: 1099,
    image: "https://th.bing.com/th/id/OIP.Fqvu2tZLxKHfbLNt1B-_0gHaJc?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    category: "crop",
  },
  {
    name: "Denim Crop Top",
    description: "Classic denim look.",
    price: 1299,
    image: "https://th.bing.com/th/id/OIP.U28eAMnJrePQhTSFSKSSDAHaJQ?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    category: "crop",
  },
  // Kurtas
  {
    name: "Floral Cotton Kurti",
    description: "Breathable cotton kurti.",
    price: 1199,
    image: "https://5.imimg.com/data5/SELLER/Default/2022/8/NI/DR/AJ/14267355/-84a5927-500x500.jpg",
    category: "kurta",
  },
  {
    name: "Rayon Printed Kurti",
    description: "Everyday rayon comfort.",
    price: 999,
    image: "https://5.imimg.com/data5/SELLER/Default/2022/11/VS/IM/AB/16229426/whatsapp-image-2022-11-06-at-13-12-06-1000x1000.jpeg",
    category: "kurta",
  },
  {
    name: "Plain Casual Kurti",
    description: "Minimal peach kurti.",
    price: 849,
    image: "https://cdn.sareeka.com/image/data2019/plain-cotton-casual-kurti-in-peach-103263.jpg",
    category: "kurta",
  },
  {
    name: "Indigo Blue Kurti",
    description: "Indigo shade elegance.",
    price: 1499,
    image: "https://th.bing.com/th/id/OIP.zVzVBJYD_ovdxnHC4MUbjwHaI0?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    category: "kurta",
  },
  // Sarees
  {
    name: "Banarasi Silk Saree",
    description: "Traditional banarasi silk.",
    price: 2499,
    image: "https://assets0.mirraw.com/images/9929651/image_zoom.jpeg?1643897978",
    category: "saree",
  },
  {
    name: "Cotton Printed Saree",
    description: "Lightweight cotton print.",
    price: 1299,
    image: "https://th.bing.com/th/id/OIP.CCnrk9t-yTsnI4nakXIWpwHaLH?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    category: "saree",
  },
  {
    name: "Georgette Saree",
    description: "Flowy georgette saree.",
    price: 1999,
    image: "https://www.koskii.com/cdn/shop/files/koskii-grey-swarovski-chiffon-designer-saree-saus0034163_grey_1_3.jpg?v=1707384197&width=720",
    category: "saree",
  },
  {
    name: "Kanchipuram Saree",
    description: "Premium kanchipuram silk.",
    price: 3199,
    image: "https://images.drapemall.com/images/items/Saundaryam-Pink-Kanjivaram-Silk-Saree-With-Amazing-Weaving-All-Over-02_8637617.webp",
    category: "saree",
  },
];

(async () => {
  try {
    if (!MONGO_URI) {
      console.error("❌ Set MONGO_URI in .env first.");
      process.exit(1);
    }
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products.`);
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed error:", e);
    process.exit(1);
  }
})();
