// Initialize shoes array and form elements
// Note: In a real application, you would use localStorage, sessionStorage, or a database
// For demonstration purposes, we'll show how to implement localStorage (though it won't work in this snippet)

let shoes = [];
let filteredShoes = [];
let currentFilters = {
    search: '',
    minPrice: null,
    maxPrice: null,
    size: '',
    brand: ''            // ← Added for brand filtering
};

const form = document.getElementById('shoe-form');
const container = document.getElementById('products-container');

// Data persistence functions
function saveShoes() {
    try {
        // In a real environment, uncomment this line:
        // localStorage.setItem('shoes', JSON.stringify(shoes));
        console.log('Shoes would be saved to localStorage:', shoes);
    } catch (error) {
        console.error('Could not save shoes:', error);
    }
}

function loadShoes() {
    try {
        // In a real environment, uncomment these lines:
        // const savedShoes = localStorage.getItem('shoes');
        // if (savedShoes) {
        //     shoes = JSON.parse(savedShoes);
        //     return;
        // }
        console.log('Would load shoes from localStorage');
    } catch (error) {
        console.error('Could not load shoes:', error);
    }
    
    // Fallback to sample data if nothing saved
    shoes = [
        {
            id: 351,
            name: "Yeezy 350 V2 Yeshaya",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/1_d8pbox.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive",
             // ← Added brand for filtering
        },
        {
            id: 352,
            name: "Yeezy 350 V2 Cloud White",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/2_gaw9rf.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 353,
            name: "Yeezy 350 V2 Flax",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/3_vg95ox.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 354,
            name: "Yeezy 350 V2 Cinder Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/4_dvjob5.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        

        {
            id: 355,
            name: "Yeezy 350 V2 Linen ",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/5_pzb2vx.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 356,
            name: "Yeezy 350 V2 Cloud White Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/6_tlvzaw.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 357,
            name: "Yeezy 350 V2 Synth",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/7_tztqra.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 358,
            name: "Yeezy 350 V2 Lundmark Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/8_h5ja7n.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 359,
            name: "Yeezy 350 V2 Ash Blue",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390791/9_nbmkra.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 360,
            name: "Yeezy 350 V2 Ash Stone",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390792/10_ijhfor.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 361,
            name: "Yeezy 350 V2 Ash Pearl",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390792/11_cjdfab.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 362,
            name: "Yeezy 350 V2 Beluga Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390792/12_z9n1tf.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 363,
            name: "Yeezy 350 V2 Bone",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390794/13_vw90x5.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 364,
            name: "Yeezy 350 V2 Black Blue",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390794/14_tq34rc.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 365,
            name: "Yeezy 350 V2 Dark Beluga",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390795/15_tgrqmp.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 366,
            name: "Yeezy 350 V2 Onyx",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390795/16_c6gzce.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 367,
            name: "Yeezy 350 V2 Brown Orange",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390797/17_f4u0ck.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 368,
            name: "Yeezy 350 V2 Static Black Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390797/18_t9qluj.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 369,
            name: "Yeezy 350 V2 Black FU9006",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390798/19_srqaya.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 370,
            name: "Yeezy 350 V2 Static Reflective EF2367",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390800/20_neurbl.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 371,
            name: "Yeezy 350 V2 Static EF2905",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390800/21_uoabgb.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 372,
            name: "Yeezy 350 V2 Sesame",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390801/22_pybbrp.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 373,
            name: "Yeezy 350 V2 Cinder",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390802/23_ve3cw6.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 374,
            name: "Yeezy 350 V2 Synth Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390804/24_l4t2mk.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 375,
            name: "Yeezy 350 V2 True From",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390804/25_akixie.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 376,
            name: "Yeezy 350 V2 Clay",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390805/26_kymjev.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 377,
            name: "Yeezy 350 V2 Hyperspace",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390805/27_nqbctq.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 378,
            name: "Yeezy 350 V2 Abez",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390807/28_ulxmbf.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 379,
            name: "Yeezy 350 V2 Zyon",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390808/29_tpdfsi.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 380,
            name: "Yeezy 350 V2 Bold Orange Real Boost",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390808/30_zxzof8.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 381,
            name: "Yeezy 350 V2 Core Black Red",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390809/31_uakno4.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },


        {
            id: 382,
            name: "Yeezy 350 V2 Black White",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390830/32_zn9wwt.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 383,
            name: "Yeezy 350 V2 Slate",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391072/33_hvzw5b.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 384,
            name: "Yeezy 350 V2 Blue Tint",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391100/34_arrbn7.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 385,
            name: "Yeezy 350 V2 Cream White",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391101/35_emeom2.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        
        {
            id: 386,
            name: "Yeezy 350 V2 Beluga",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391101/36_qcdjzb.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },

        {
            id: 388,
            name: "Yeezy 350 V2 Earth",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391101/38_z1j739.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 389,
            name: "Yeezy 350 V2 Desert Sage",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391104/39_fyux5x.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 390,
            name: "Yeezy 350 V2 YECHER",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391105/40_hsx8sk.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 391,
            name: "Yeezy 350 V2 Bred",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391105/41_psleip.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 392,
            name: "Yeezy 350 V2 Zebra",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391105/42_owkag5.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 393,
            name: "Yeezy 350 V2 Tail Light",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391108/43_g2dyf4.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 394,
            name: "Yeezy 350 V2 Israfil",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391108/44_whgnpd.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 395,
            name: "Yeezy 350 V2 Yecheil Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391109/45_ifmpfl.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 396,
            name: "Yeezy 350 V2 Butter",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391110/46_p2luqn.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 397,
            name: "Yeezy 350 V2 Citrin Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391112/47_twnr09.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 398,
            name: "Yeezy 350 V2 Lundmark",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391112/48_cdisck.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 399,
            name: "Yeezy 350 V2 Yeshaya",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391113/49_hxu7fw.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 401,
            name: "Yeezy Slides Glow 2Green",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/1_nkifkh.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 402,
            name: "Yeezy Slides Ochre",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/2_pybsys.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 403,
            name: "Yeezy Slides Onyx",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/3_zj1n5h.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 404,
            name: "Yeezy Slides Azzure",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/4_dmnpke.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 405,
            name: "Yeezy Slides Flax",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/5_w5opka.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 406,
            name: "Yeezy Slides Enflame Orange",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/6_aiplru.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 407,
            name: "Yeezy Slides Pure",
            price: 190,
            image: "",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 408,
            name: "Yeezy Slides Flax2",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/8_hwwc4t.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 409,
            name: "Yeezy Slides Resin",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/9_emi6de.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 410,
            name: "Yeezy Slides Flax3",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/10_vsawxj.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 411,
            name: "Yeezy Slides Flax4",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/11_tz2yuc.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 412,
            name: "Yeezy Slides Flax5",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425413/12_abpois.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 413,
            name: "Yeezy Foam Runner Sulfur",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/13_tqhzop.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 414,
            name: "Yeezy Foam Runner Onyx",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/14_htv8f3.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 415,
            name: "Yeezy Foam Runner MX Cinder",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/15_ebjsxf.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 416,
            name: "Yeezy Foam Runner Ararat",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/16_oz5w6j.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 417,
            name: "Yeezy Foam Runner Vermilion",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425416/17_yufbtl.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 418,
            name: "Yeezy Foam Runner MX Carbon",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425416/18_tr7flq.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 419,
            name: "Yeezy Foam Runner MX Sand Grey",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425441/19_ow8zpy.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 420,
            name: "Yeezy Foam Runner Ochre",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425469/20_tgujaa.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 421,
            name: "Yeezy Foam Runner Flax",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425514/21_c9fc8l.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 422,
            name: "Yeezy Foam Runner Sulfur",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425515/22_mbsjzf.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 423,
            name: "Yeezy Foam Runner Brown bruv",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425515/23_vfpalc.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 424,
            name: "Yeezy Foam Runner Cream White",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425515/24_bnalqu.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 425,
            name: "Yeezy Foam Runner MX Granite",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425516/25_ttwbnt.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        }
        ,
        {
            id: 426,
            name: "Yeezy Foam Runner Brown Leaves",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425519/26_pny4bw.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 427,
            name: "Yeezy Foam Runner MX Cream Clay",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425519/27_jpszmm.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 429,
            name: "Yeezy Foam Runner Mist ",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425520/29_ketyvg.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 5001,
            name: "Adidas Samba White",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754488121/1_yatlsy.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5002,
            name: "Adidas Samba Black",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487957/2_rxtpea.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5003,
            name: "Adidas Samba Gray",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487957/3_kb6raj.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5004,
            name: "Adidas Samba Linen Cream",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487957/4_gryyvo.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5005,
            name: "Adidas Samba Wales Bonner Leopard",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487957/5_prlsz3.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        
        ,
        {
            id: 5008,
            name: "Adidas Samba Wales Bonner Silver",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487957/8_uxsny5.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
       
        ,
        {
            id: 5006,
            name: "Adidas Samba Wales Bonner Black",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487957/6_d8pssp.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        
        ,
        {
            id: 5007,
            name: "Adidas Samba Wales Bonner White Brown",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487958/7_xgxexd.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5009,
            name: "Adidas Samba JJJJOUND White",
            price: 399,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487958/9_druez1.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5010,
            name: "Adidas Samba JJJJOUND Blacks",
            price: 399,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487958/10_aoe0hr.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
       
        ,
        {
            id: 5011,
            name: "Adidas Samba Brown",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487958/11_irsmhy.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5012,
            name: "Adidas Samba Green Leopard",
            price: 399,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487958/12_me7osc.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5013,
            name: "Adidas Samba Red Leopard",
            price: 399,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487958/12_me7osc.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5014,
            name: "Adidas Samba Silver",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487959/14_imllm6.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5015,
            name: "Adidas Samba White Blue",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487959/15_ou4pvq.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5016,
            name: "Adidas Samba Brown2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487959/16_ozcxzg.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
         ,
        {
            id: 5017,
            name: "Adidas Samba Cream White",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487959/16_ozcxzg.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
         ,
        {
            id: 5018,
            name: "Adidas Samba Green",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754487961/18_qgx8qo.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5101,
            name: "Adidas Spezial Blue1",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512636/1_rmbcsw.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5102,
            name: "Adidas Spezial Pink",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512636/2_mzb9nn.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5103,
            name: "Adidas Spezial Piano Black",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512637/3_vltk5h.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5104,
            name: "Adidas Spezial Black",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512636/4_ijeany.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5105,
            name: "Adidas Spezial Blue2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512637/5_gidcln.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5106,
            name: "Adidas Spezial Red",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512637/6_u33egn.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5107,
            name: "Adidas Spezial Pink2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512637/7_zcdjz4.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5108,
            name: "Adidas Spezial Gray",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512637/8_vg14yx.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5109,
            name: "Adidas Spezial Green",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512637/9_qmsopf.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5110,
            name: "Adidas Spezial Blue3",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512652/10_jzyrrv.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5111,
            name: "Adidas Spezial Purple",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754512682/11_omrv6k.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5201,
            name: "Adidas Campus Black",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514042/1_reyxtq.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5202,
            name: "Adidas Campus Gray",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514042/2_jqcv0k.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5203,
            name: "Adidas Campus Black Gray",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514043/3_agh5l2.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5204,
            name: "Adidas Campus Green",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514042/4_k8fjas.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5205,
            name: "Adidas Campus Burgundy",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514043/5_q4qulx.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5206,
            name: "Adidas Campus Black2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514044/6_gluacm.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5207,
            name: "Adidas Campus Orange",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514046/7_nm4ozx.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5208,
            name: "Adidas Campus Violet ",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514047/8_z2jzel.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5209,
            name: "Adidas Campus Green2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514048/9_kolgtm.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5210,
            name: "Adidas Campus Pink",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514049/10_ddanbo.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5211,
            name: "Adidas Campus Yellow Brown",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514051/11_ctzsmn.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5212,
            name: "Adidas Campus Black3",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514051/12_zbr758.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5213,
            name: "Adidas Campus Blue",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514053/13_rk0xml.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5214,
            name: "Adidas Campus Blue2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514054/14_qvfxbg.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5215,
            name: "Adidas Campus White Leopard",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514055/15_pyxala.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5216,
            name: "Adidas Campus Black Leopard",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514057/16_fuhopl.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5217,
            name: "Adidas Campus Gray Green",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514058/17_opcai3.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5218,
            name: "Adidas Campus Black4",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514060/18_wchcjy.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5219,
            name: "Adidas Campus Brown Green",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514062/19_pgqup0.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5220,
            name: "Adidas Campus Brown",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514063/20_jrnmdv.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5221,
            name: "Adidas Campus Military Green",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514065/21_qvessy.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5222,
            name: "Adidas Campus Pink2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514066/22_n9tvgo.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5223,
            name: "Adidas Campus Blue4",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514068/23_rl1soi.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5224,
            name: "Adidas Campus Orange2",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514069/24_clwgyp.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 5225,
            name: "Adidas Campus Pink3",
            price: 349,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754514071/25_svhrfx.jpg",
            sizes: ["36", "36.5", "37", "38", "38.5", "39", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45"],
            description: "Pantofi de Nuntă cu Buget Mic"
        }
        ,
        {
            id: 4001,
            name: "Air Jordan 4 Black Cat",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569595/1_q4zmic.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4002,
            name: "Air Jordan 4 Midnight Navy",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569595/2_ax7ljm.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"

        }
        ,
        {
            id: 400,
            name: "Air Jordan 4 Military Black",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569595/3_jcvrub.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4004,
            name: "Air Jordan 4 Bred",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569595/4_iqurzr.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4005,
            name: "Air Jordan 4 White Oreo",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569595/5_ufbdyz.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4006,
            name: "Air Jordan 4 Fire Red",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569594/6_hl6zxz.webp",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4007,
            name: "Air Jordan 4 Red Thunder",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569596/7_uazkzr.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4008,
            name: "Air Jordan 4 Lightning",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569596/8_sghxug.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4009,
            name: "Air Jordan 4 Military Blue",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569596/9_eppdd2.webp",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4010,
            name: "Air Jordan 4 Travis Scott Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569596/11_yv8lwh.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4012,
            name: "Air Jordan 4 UNC Blue Premium",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569596/12_tpb2pj.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4013,
            name: "Air Jordan 4 Off White",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569596/13_y0plfg.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4014,
            name: "Air Jordan 4 Taupe Haze",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569597/14_ylr7t7.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4015,
            name: "Air Jordan 4 Military Blue",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569597/15_ct3nyt.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4016,
            name: "Air Jordan 4 Black Canvas",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569597/16_o0l4xc.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4017,
            name: "Air Jordan 4 SB Pine Green",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569597/17_wje8mw.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4018,
            name: "Air Jordan 4 Union Guava Ice",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569598/18_tl2y94.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4019,
            name: "Air Jordan 4 Union Off Noir",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569598/19_edj9at.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4020,
            name: "Air Jordan 4 Forget Me Not",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569602/20_rysxdz.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        
        ,
        {
            id: 4021,
            name: "Air Jordan 4 Yellow Thunder",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569604/21_hiq136.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4022,
            name: "Air Jordan 4 Bred Reimagined",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569604/22_bmgwpl.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4023,
            name: "Air Jordan 4 Frozen Moments",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569605/23_fpwpfm.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4024,
            name: "Air Jordan 4 White Thunder",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569605/24_h03v4h.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4025,
            name: "Air Jordan 4 Wet Cement",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569605/25_svgudj.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4026,
            name: "Air Jordan 4 Fear",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569605/26_astphn.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4027,
            name: "Air Jordan 4 Orchid",
            price: 499,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569606/27_cbp3el.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4028,
            name: "Air Jordan 4 A Ma Maniere Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569606/28_ipwkqp.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4029,
            name: "Air Jordan 4 Travis Scott Purple Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569608/29_azvmy2.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4030,
            name: "Air Jordan 4 SB Varsity Red Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569611/30_ippccv.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4031,
            name: "Air Jordan 4 Nigel Sylvester x Brick By Brick Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569611/31_u4ukfd.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4032,
            name: "Air Jordan 4 UNC Basketball Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569611/32_qxqxca.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }
        ,
        {
            id: 4033,
            name: "Air Jordan 4 Kaws Premium",
            price: 699,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754569611/33_q367jw.jpg",
            sizes: [ "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "47.5", "48.5"],
            description: "Papuci de Trotuar cu Demnitate"
        }



    ];
}

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const shoe = {
        id: Date.now(),
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image'),
        sizes: formData.get('sizes').split(',').map(s => s.trim()),
        description: formData.get('description')
    };

    shoes.push(shoe);
    saveShoes(); // Save to persistence after adding
    renderShoes();
    form.reset();
});

// Event listeners for filter inputs
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('min-price').addEventListener('input', applyFilters);
document.getElementById('max-price').addEventListener('input', applyFilters);
document.getElementById('filter-size').addEventListener('input', applyFilters);
// ← New listener for the brand dropdown
document.getElementById('filter-brand').addEventListener('change', applyFilters);

function applyFilters() {
    const search   = document.getElementById('search').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const size     = document.getElementById('filter-size').value.toLowerCase();
    const brand    = document.getElementById('filter-brand').value.toLowerCase();  // ← Grab brand

    currentFilters = { search, minPrice, maxPrice, size, brand };

    filteredShoes = shoes.filter(shoe => {
        const nameLC = shoe.name.toLowerCase();
        const descLC = (shoe.description || '').toLowerCase();

        const matchesSearch = nameLC.includes(search) || descLC.includes(search);
        const matchesPrice  = shoe.price >= minPrice && shoe.price <= maxPrice;
        const matchesSize   = !size || shoe.sizes.some(s => s.toLowerCase().includes(size));
        const matchesBrand  = !brand || nameLC.includes(brand);  // ← Brand matching

        return matchesSearch && matchesPrice && matchesSize && matchesBrand;
    });

    renderFilteredShoes();
    updateResultsCount();
}

function renderFilteredShoes() {
    const container = document.getElementById('products-container');
    
    if (filteredShoes.length === 0) {
        container.innerHTML = '<div class="no-products"><p>No shoes match your filters. Try adjusting your search criteria.</p></div>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'products-grid';
    
    filteredShoes.forEach(shoe => {
        const card = createProductCard(shoe, false); // false = isClothes
        grid.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    countElement.textContent = `Showing ${filteredShoes.length} of ${shoes.length} shoes`;
}

function clearFilters() {
    document.getElementById('search').value       = '';
    document.getElementById('min-price').value   = '';
    document.getElementById('max-price').value   = '';
    document.getElementById('filter-size').value = '';
    document.getElementById('filter-brand').value= '';  // ← Reset brand

    currentFilters = { search: '', minPrice: null, maxPrice: null, size: '', brand: '' };
    filteredShoes = [...shoes];
    renderFilteredShoes();
    updateResultsCount();
}

function initializeShoesFilters() {
    filteredShoes = [...shoes];
    updateResultsCount();
}

// Main render function that initializes filters
function renderShoes() {
    if (shoes.length === 0) {
        document.getElementById('products-container').innerHTML =
            '<div class="no-products"><p>No shoes added yet. Use the form above to add your first shoe!</p></div>';
        return;
    }
    
    filteredShoes = [...shoes];
    renderFilteredShoes();
    updateResultsCount();
}

// Delete function that maintains filters
function deleteShoe(id) {
    if (confirm('Are you sure you want to delete this shoe?')) {
        shoes = shoes.filter(shoe => shoe.id !== id);
        saveShoes(); // Save to persistence after deleting
        applyFilters(); // Reapply current filters
    }
}

// Modal functionality
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const imageContainer = document.getElementById('modal-image-container');
    
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description || 'No description available';
    document.getElementById('modal-price').textContent = `${product.price.toFixed(2)} RON`;
    
    // Hide category/color for shoes
    document.getElementById('modal-category').style.display = 'none';
    document.getElementById('modal-color').style.display    = 'none';
    
    if (product.image) {
        imageContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="modal-image"
                 onerror="showFallbackIcon(this, '${getFallbackIcon(product)}')">`;
    } else {
        imageContainer.innerHTML = `<div class="modal-fallback-icon">${getFallbackIcon(product)}</div>`;
    }
    
    const sizesContainer = document.getElementById('modal-sizes');
    sizesContainer.innerHTML = product.sizes
        .map(size => `<span class="modal-size-tag">${size}</span>`)
        .join('');
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function getFallbackIcon(product) {
    return '👟';
}

function showFallbackIcon(img, icon) {
    img.style.display = 'none';
    img.parentElement.innerHTML = `<div class="modal-fallback-icon">${icon}</div>`;
}

function createProductCard(product, isClothes = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductModal(product);
    
    card.innerHTML = `
        <button class="delete-btn" onclick="event.stopPropagation(); deleteShoe(${product.id})">×</button>
        <div class="product-image">
            ${product.image
                ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">👟</div>`
                : '👟'}
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description || 'No description available'}</div>
            <div class="product-price">${product.price.toFixed(2)} RON</div>
            <div class="product-sizes">
                ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Close modal when clicking outside content
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

// Initialize the page
loadShoes();
renderShoes();
