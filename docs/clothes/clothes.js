// clothes.js — fixed

let clothes = [];
let filteredClothes = [];
let currentFilters = {
  search: '',
  minPrice: null,
  maxPrice: null,
  category: '',
  size: '',
  brand: ''
};

const form = document.getElementById('clothing-form');
const container = document.getElementById('products-container');

// ---- helpers ----
const toStr = (v) => (v == null ? '' : String(v));
const norm = (v) => toStr(v).trim().toLowerCase();

// map various incoming categories to your filter values
const CATEGORY_MAP = {
  tshirt: 'tshirts',
  tshirts: 'tshirts',
  shirt: 'tshirts',
  shirts: 'tshirts',
  tee: 'tshirts',
  tees: 'tshirts',
  pant: 'pants',
  pants: 'pants',
  jean: 'pants',
  jeans: 'pants',
  hoodie: 'hoodie',
  hoodies: 'hoodie',
  jacket: 'jackets',
  jackets: 'jackets',
  accessory: 'accessories',
  accessories: 'accessories',
  dress: 'other',     // not present in your filter list — send to "other"
  dresses: 'other',
  other: 'other'
};

function normalizeCategory(raw) {
  const k = norm(raw);
  return CATEGORY_MAP[k] || 'other';
}

function firstImage(img) {
  if (Array.isArray(img)) return img[0] || '';
  return toStr(img);
}

// ---- persistence (no localStorage in snippet) ----
function saveClothes() {
  try {
    // localStorage.setItem('clothes', JSON.stringify(clothes));
    console.log('Clothes would be saved to localStorage:', clothes);
  } catch (e) {
    console.error('Could not save clothes:', e);
  }
}

function loadClothes() {
  try {
    // const saved = localStorage.getItem('clothes');
    // if (saved) { clothes = JSON.parse(saved); }
    console.log('Would load clothes from localStorage');
  } catch (e) {
    console.error('Could not load clothes:', e);
  }

  if (clothes.length === 0) {
    clothes = [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        category: "shirts",            // will be normalized to "tshirts"
        image: "",
        sizes: ["S", "M", "L", "XL"],
        color: "Navy Blue",
        description: "Comfortable 100% cotton t-shirt with modern fit",
        brand: "essentials"
      },
      {
        id: 2,
        name: "Classic Denim Jeans",
        price: 79.99,
        category: "pants",
        image: "",
        sizes: ["28", "30", "32", "34", "36"],
        color: "Dark Blue",
        description: "Premium denim jeans with classic straight fit",
        brand: "levis"
      },
      {
        id: 3,
        name: "Elegant Summer Dress",
        price: 89.99,
        category: "dresses",          // will be normalized to "other"
        image: "",
        sizes: ["XS", "S", "M", "L"],
        color: "Floral Print",
        description: "Light and airy summer dress perfect for any occasion",
        brand: "zara"
      },
      {
        id: "e-h-b-f",
        name: "Essentials Hoodie Black",
        price: 249.99,
        category: "Hoodie",           // will be normalized to "hoodie"
        image: [
          "https://res.cloudinary.com/duomi60pe/image/upload/v1753277416/e-h-b-f_dgemc1.avif"
        ],
        sizes: ["XS","S","M","L","XL","XXL"],
        color: "Black",
        description: "mare smeker mo facut mama",
        brand: "essentials"
      },{
    "id": "e-h-w-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277431/e-h-w-f_dcqwql.avif"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-g-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277421/e-h-g-f_klktco.avif"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-m-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277424/e-h-m-f_coox3n.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Matcha-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-k-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277423/e-h-k-f_bl4hh9.avif"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Khaki",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-a-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277415/e-h-a-f_oefams.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-b-f-1977",
    "name": "Essentials-1977",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277416/e-h-b-1977_abmysu.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-o-1977",
    "name": "Essentials-1977",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277428/e-h-o-1977_gufkcv.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Oats-Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-m-1977",
    "name": "Essentials-1977",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277423/e-h-m-1977_ucpo3w.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Matcha-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-w-1977",
    "name": "Essentials-1977",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277414/e-h-a-1977_xvtqqd.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-c-k-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Crewneck",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277413/e-c-k-f_waqmoy.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Khaki",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-c-m-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Crewneck",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277413/e-c-g-f_w4f56o.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-c-w-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Crewneck",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277413/e-c-w-f_bdxkqp.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-c-a-f",
    "name": "Essentials",
    "price": 249.99,
    "category": "Crewneck",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277413/e-c-a-f_infrb4.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-w-foge",
    "name": "Essentials-FOG",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277432/e-h-w-foge_hdrhjj.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-mg-foge",
    "name": "Essentials-FOG",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277425/e-h-mg-foge_aqnsam.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-G-foge",
    "name": "Essentials-FOG",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277421/e-h-g-foge_gsdd1o.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-dg-foge",
    "name": "Essentials-FOG",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277420/e-h-dg-foge_rgtf3c.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Dark-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-b-foge",
    "name": "Essentials-FOG",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277417/e-h-b-foge_l9kops.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-mg-fogstate",
    "name": "Essentials-State",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277426/e-h-mg-fogstate_y4chdo.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-w-fogstate",
    "name": "Essentials-State",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277434/e-h-w-fogstate_yzejbx.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-dg-fogstate",
    "name": "Essentials-State",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277421/e-h-dg-fogstate_lntcm3.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Dark-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-b-fogstate",
    "name": "Essentials-State",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277418/e-h-b-fogstate_rpdzwp.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-g-fogstate",
    "name": "Essentials-State",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277428/e-h-o-fogstate_bkeygo.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-dg-fogfra",
    "name": "Essentials-Fraternity",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277431/e-h-r-fogfra_boeej2.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Red",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-b-fogfra",
    "name": "Essentials-Fraternity",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277418/e-h-b-fogfra_ddmudv.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-p-fogfra",
    "name": "Essentials-Fraternity",
    "price": 249.99,
    "category": "Hoodie",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753277428/e-h-p-fogfra_w4bnuz.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Purple",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354196/e-p-b-f_xjovkh.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-w-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354190/e-p-w-f_z4jbbi.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-g-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354193/e-p-g-f_ohodyq.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-m-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354189/e-p-m-f_bsht7b.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Matcha-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-k-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354192/e--p-k-f_usm9xm.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Khaki",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-a-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354193/e-p-a-f_zjxodj.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-f-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354189/e-p-b-1977_j3srzp.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-o-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354186/e-p-o-1977_r2b9nt.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Oats-Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-m-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354185/e-p-m-1977_tlmvov.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Matcha-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-p-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354187/e-p-a-1977_rey4jx.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-mg-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354182/e-p-mg-fogstate_k1ffl4.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-w-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354182/e-p-w-fogstate_oyfdtm.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-dg-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354181/e-p-dg-fogstate_ogwqqw.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Dark-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354184/e-p-b-fogstate_of8sns.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-g-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354183/e-p-g-fogstate_idgagz.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-r-fogfra",
    "name": "Essentials-Fraternity",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354176/e-p-r-fra_lsar5d.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Red",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-fogfra",
    "name": "Essentials-Fraternity",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354177/e-p-b-fra_frf7da.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-p-fogfra",
    "name": "Essentials-Fraternity",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354176/e-p-p-fra_dxvqsn.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Purple",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-mg-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354179/e-p-mg-foge_iex6ab.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-w-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354178/e-p-w-foge_h4blmg.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-dg-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354177/e-p-dg-foge_hjgxci.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Dark-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-g-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": [
      "https://res.cloudinary.com/duomi60pe/image/upload/v1753354180/e-p-g-foge_sybqal.jpg"
    ],
    "sizes": ["XS","S", "M", "L", "XL","XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  
  {
    "id": "e-p-b-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": [
        "https://res.cloudinary.com/duomi60pe/image/upload/v1753354196/e-p-b-f_xjovkh.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-w-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354190/e-p-w-f_z4jbbi.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-g-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354193/e-p-g-f_ohodyq.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-m-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354189/e-p-m-f_bsht7b.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Matcha-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-k-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354192/e--p-k-f_usm9xm.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Khaki",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-a-f",
    "name": "Essentials",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354193/e-p-a-f_zjxodj.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-f-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354189/e-p-b-1977_j3srzp.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-o-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354186/e-p-o-1977_r2b9nt.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Oats-Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-m-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354185/e-p-m-1977_tlmvov.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Matcha-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-h-p-1977",
    "name": "Essentials-1977",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354187/e-p-a-1977_rey4jx.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Apricot",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-mg-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354182/e-p-mg-fogstate_k1ffl4.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-w-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354182/e-p-w-fogstate_oyfdtm.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-dg-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354181/e-p-dg-fogstate_ogwqqw.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Dark-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354184/e-p-b-fogstate_of8sns.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-g-fogstate",
    "name": "Essentials-State",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354183/e-p-g-fogstate_idgagz.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-r-fogfra",
    "name": "Essentials-Fraternity",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354176/e-p-r-fra_lsar5d.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Red",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-b-fogfra",
    "name": "Essentials-Fraternity",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354177/e-p-b-fra_frf7da.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Black",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-p-fogfra",
    "name": "Essentials-Fraternity",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354176/e-p-p-fra_dxvqsn.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Purple",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-mg-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354179/e-p-mg-foge_iex6ab.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Military-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-w-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354178/e-p-w-foge_h4blmg.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "White",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-dg-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354177/e-p-dg-foge_hjgxci.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Dark-Green",
    "description": "mare smeker mo facut mama"
  },
  {
    "id": "e-p-g-fog",
    "name": "Essentials-FOG",
    "price": 149.99,
    "category": "Pants",
    "image": ["https://res.cloudinary.com/duomi60pe/image/upload/v1753354180/e-p-g-foge_sybqal.jpg"],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "color": "Gray",
    "description": "mare smeker mo facut mama"
  }


    ];
  }

  // normalize existing data
  clothes = clothes.map(it => ({
    ...it,
    category: normalizeCategory(it.category),
    brand: norm(it.brand)
  }));
}

// ---- form submit ----
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const fd = new FormData(form);

  const item = {
    id: Date.now(),
    name: toStr(fd.get('name')),
    price: parseFloat(fd.get('price')),
    category: normalizeCategory(fd.get('category')),
    image: firstImage(fd.get('image')),
    sizes: toStr(fd.get('sizes'))
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
    color: toStr(fd.get('color')),
    description: toStr(fd.get('description')),
    brand: norm(fd.get('brand'))          // <-- save brand
  };

  clothes.push(item);
  saveClothes();
  renderClothes();
  form.reset();
});

// ---- filter listeners ----
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('min-price').addEventListener('input', applyFilters);
document.getElementById('max-price').addEventListener('input', applyFilters);
document.getElementById('filter-size').addEventListener('input', applyFilters);
document.getElementById('filter-category').addEventListener('change', applyFilters);
document.getElementById('filter-brand').addEventListener('change', applyFilters);

// ⚠️ removed: document.getElementById('category-filter')... (did not exist)

function applyFilters() {
  const search   = norm(document.getElementById('search').value);
  const minPrice = parseFloat(document.getElementById('min-price').value);
  const maxPrice = parseFloat(document.getElementById('max-price').value);
  const size     = norm(document.getElementById('filter-size').value);
  const category = norm(document.getElementById('filter-category').value);
  const brand    = norm(document.getElementById('filter-brand').value);

  currentFilters = {
    search,
    minPrice: isNaN(minPrice) ? 0 : minPrice,
    maxPrice: isNaN(maxPrice) ? Infinity : maxPrice,
    category,
    size,
    brand
  };

  filteredClothes = clothes.filter(item => {
    const nameLC = norm(item.name);
    const descLC = norm(item.description);
    const itemBrand = norm(item.brand);
    const itemCat = norm(item.category);

    const matchesSearch   = !search || nameLC.includes(search) || descLC.includes(search);
    const matchesPrice    = item.price >= currentFilters.minPrice && item.price <= currentFilters.maxPrice;
    const matchesSize     = !size || (Array.isArray(item.sizes) && item.sizes.some(s => norm(s).includes(size)));
    const matchesCategory = !category || itemCat === category;
    const matchesBrand    = !brand || itemBrand === brand || nameLC.includes(brand);

    return matchesSearch && matchesPrice && matchesSize && matchesCategory && matchesBrand;
  });

  renderFilteredClothes();
  updateResultsCount();
}

function renderFilteredClothes() {
  const container = document.getElementById('products-container');

  if (filteredClothes.length === 0) {
    container.innerHTML = '<div class="no-products"><p>No clothing items match your filters. Try adjusting your search criteria.</p></div>';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'products-grid';

  filteredClothes.forEach(item => {
    const card = createProductCard(item, true);
    grid.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(grid);
}

function updateResultsCount() {
  const countElement = document.getElementById('results-count');
  countElement.textContent = `Showing ${filteredClothes.length} of ${clothes.length} clothing items`;
}

function clearFilters() {
  document.getElementById('search').value = '';
  document.getElementById('min-price').value = '';
  document.getElementById('max-price').value = '';
  document.getElementById('filter-size').value = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-brand').value = '';

  currentFilters = { search: '', minPrice: null, maxPrice: null, category: '', size: '', brand: '' };

  filteredClothes = [...clothes];
  renderFilteredClothes();
  updateResultsCount();
}

function initializeClothesFilters() {
  filteredClothes = [...clothes];
  updateResultsCount();
}

function renderClothes() {
  if (clothes.length === 0) {
    document.getElementById('products-container').innerHTML = '<div class="no-products"><p>No clothing items added yet. Use the form above to add your first item!</p></div>';
    return;
  }
  filteredClothes = [...clothes];
  renderFilteredClothes();
  updateResultsCount();
}

function deleteClothing(id) {
  if (confirm('Are you sure you want to delete this item?')) {
    clothes = clothes.filter(item => item.id !== id);
    saveClothes();
    applyFilters();
  }
}

// ---- modal ----
function openProductModal(product) {
  const modal = document.getElementById('productModal');
  const imageContainer = document.getElementById('modal-image-container');

  document.getElementById('modal-name').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description || 'No description available';
  document.getElementById('modal-price').textContent = `${product.price.toFixed(2)} RON`;

  const categoryElement = document.getElementById('modal-category');
  if (product.category) {
    const nice = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    categoryElement.textContent = nice;
    categoryElement.style.display = 'inline-block';
  } else {
    categoryElement.style.display = 'none';
  }

  const colorElement = document.getElementById('modal-color');
  if (product.color) {
    colorElement.textContent = `Color: ${product.color}`;
    colorElement.style.display = 'block';
  } else {
    colorElement.style.display = 'none';
  }

  const imgSrc = firstImage(product.image);
  if (imgSrc) {
    imageContainer.innerHTML = `<img src="${imgSrc}" alt="${product.name}" class="modal-image" onerror="showFallbackIcon(this, '${getFallbackIcon(product)}')">`;
  } else {
    imageContainer.innerHTML = `<div class="modal-fallback-icon">${getFallbackIcon(product)}</div>`;
  }

  const sizesContainer = document.getElementById('modal-sizes');
  sizesContainer.innerHTML = (product.sizes || []).map(size =>
    `<span class="modal-size-tag">${size}</span>`
  ).join('');

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function getFallbackIcon(product) {
  const categoryEmoji = {
    'tshirts': '👔',
    'pants': '👖',
    'jackets': '🧥',
    'accessories': '👜',
    'hoodie': '🧥',
    'other': '👕'
  };
  return categoryEmoji[normalizeCategory(product.category)] || '👕';
}

function showFallbackIcon(img, icon) {
  img.style.display = 'none';
  img.parentElement.innerHTML = `<div class="modal-fallback-icon">${icon}</div>`;
}

function createProductCard(product, isClothes = false) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.onclick = () => openProductModal(product);

  if (isClothes) {
    const categoryEmoji = {
      'tshirts': '👔',
      'pants': '👖',
      'jackets': '🧥',
      'accessories': '👜',
      'hoodie': '🧥',
      'other': '👕'
    };

    const imgSrc = firstImage(product.image);
    const niceCat = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    const brandView = product.brand ? `<div style="opacity:.8;margin-bottom:.25rem;">Brand: ${product.brand}</div>` : '';

    card.innerHTML = `
      <button class="delete-btn" onclick="event.stopPropagation(); deleteClothing(${JSON.stringify(product.id)})">×</button>
      <div class="product-image">
        ${imgSrc ? `<img src="${imgSrc}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">${categoryEmoji[product.category] || '👕'}</div>` 
        : (categoryEmoji[product.category] || '👕')}
      </div>
      <div class="product-info">
        <div class="product-category">${niceCat}</div>
        <div class="product-name">${product.name}</div>
        ${brandView}
        ${product.color ? `<div style="opacity:.8;margin-bottom:.5rem;">Color: ${product.color}</div>` : ''}
        <div class="product-description">${product.description || 'No description available'}</div>
        <div class="product-price">${product.price.toFixed(2)} RON</div>
        <div class="product-sizes">
          ${(product.sizes || []).map(size => `<span class="size-tag">${size}</span>`).join('')}
        </div>
      </div>
    `;
  } else {
    // shoes branch kept for compatibility
    const imgSrc = firstImage(product.image);
    card.innerHTML = `
      <button class="delete-btn" onclick="event.stopPropagation(); deleteShoe(${JSON.stringify(product.id)})">×</button>
      <div class="product-image">
        ${imgSrc ? `<img src="${imgSrc}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">👟</div>` : '👟'}
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description || 'No description available'}</div>
        <div class="product-price">${product.price.toFixed(2)} RON</div>
        <div class="product-sizes">
          ${(product.sizes || []).map(size => `<span class="size-tag">${size}</span>`).join('')}
        </div>
      </div>
    `;
  }

  return card;
}

// close modal when clicking outside content
document.getElementById('productModal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Esc to close
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

// init
loadClothes();
renderClothes();
