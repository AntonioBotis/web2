// Initialize shoes array and form elements
// Note: In a real application, you would use localStorage, sessionStorage, or a database
// For demonstration purposes, we'll show how to implement localStorage (though it won't work in Claude artifacts)

let shoes = [];
let filteredShoes = [];
let currentFilters = {
    search: '',
    minPrice: null,
    maxPrice: null,
    size: ''
};

const form = document.getElementById('shoe-form');
const container = document.getElementById('products-container');

// Data persistence functions
function saveShoes() {
    try {
        // In a real environment, uncomment this line:
         localStorage.setItem('shoes', JSON.stringify(shoes));
        console.log('Shoes would be saved to localStorage:', shoes);
    } catch (error) {
        console.error('Could not save shoes:', error);
    }
}

function loadShoes() {
    try {
        // In a real environment, uncomment these lines:
        const savedShoes = localStorage.getItem('shoes');
         if (savedShoes) {
            shoes = JSON.parse(savedShoes);
             return;
         }
        console.log('Would load shoes from localStorage');
    } catch (error) {
        console.error('Could not load shoes:', error);
    }
    
    // Fallback to sample data if nothing saved
    shoes = [
        {
            id: 1,
            name: "Yeezy 350 V2 Yeshaya",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/1_d8pbox.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
                    id: 2,
                    name: "Yeezy 350 V2 Cloud White",
                    price: 390,
                    image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/2_gaw9rf.jpg",
                    sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
                    description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 3,
            name: "Yeezy 350 V2 Flax",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/3_vg95ox.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 4,
            name: "Yeezy 350 V2 Cinder Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390788/4_dvjob5.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        

        {
            id: 5,
            name: "Yeezy 350 V2 Linen ",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/5_pzb2vx.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 6,
            name: "Yeezy 350 V2 Cloud White Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/6_tlvzaw.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 7,
            name: "Yeezy 350 V2 Synth",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/7_tztqra.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 8,
            name: "Yeezy 350 V2 Lundmark Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390789/8_h5ja7n.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 9,
            name: "Yeezy 350 V2 Ash Blue",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390791/9_nbmkra.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 10,
            name: "Yeezy 350 V2 Ash Stone",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390792/10_ijhfor.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 11,
            name: "Yeezy 350 V2 Ash Pearl",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390792/11_cjdfab.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 12,
            name: "Yeezy 350 V2 Beluga Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390792/12_z9n1tf.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 13,
            name: "Yeezy 350 V2 Bone",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390794/13_vw90x5.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 14,
            name: "Yeezy 350 V2 Black Blue",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390794/14_tq34rc.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 15,
            name: "Yeezy 350 V2 Dark Beluga",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390795/15_tgrqmp.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 16,
            name: "Yeezy 350 V2 Onyx",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390795/16_c6gzce.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 17,
            name: "Yeezy 350 V2 Brown Orange",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390797/17_f4u0ck.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 18,
            name: "Yeezy 350 V2 Static Black Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390797/18_t9qluj.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 19,
            name: "Yeezy 350 V2 Black FU9006",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390798/19_srqaya.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 20,
            name: "Yeezy 350 V2 Static Reflective EF2367",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390800/20_neurbl.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 21,
            name: "Yeezy 350 V2 Static EF2905",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390800/21_uoabgb.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 22,
            name: "Yeezy 350 V2 Sesame",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390801/22_pybbrp.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 23,
            name: "Yeezy 350 V2 Cinder",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390802/23_ve3cw6.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 24,
            name: "Yeezy 350 V2 Synth Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390804/24_l4t2mk.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 25,
            name: "Yeezy 350 V2 True From",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390804/25_akixie.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 26,
            name: "Yeezy 350 V2 Clay",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390805/26_kymjev.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 27,
            name: "Yeezy 350 V2 Hyperspace",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390805/27_nqbctq.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 28,
            name: "Yeezy 350 V2 Abez",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390807/28_ulxmbf.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 29,
            name: "Yeezy 350 V2 Zyon",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390808/29_tpdfsi.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 30,
            name: "Yeezy 350 V2 Bold Orange Real Boost",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390808/30_zxzof8.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
         {
            id: 31,
            name: "Yeezy 350 V2 Core Black Red",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390809/31_uakno4.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },


        {
            id: 32,
            name: "Yeezy 350 V2 Black White",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754390830/32_zn9wwt.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 33,
            name: "Yeezy 350 V2 Slate",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391072/33_hvzw5b.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 34,
            name: "Yeezy 350 V2 Blue Tint",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391100/34_arrbn7.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 35,
            name: "Yeezy 350 V2 Cream White",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391101/35_emeom2.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        
        {
            id: 36,
            name: "Yeezy 350 V2 Beluga",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391101/36_qcdjzb.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },

        {
            id: 38,
            name: "Yeezy 350 V2 Earth",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391101/38_z1j739.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 39,
            name: "Yeezy 350 V2 Desert Sage",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391104/39_fyux5x.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 40,
            name: "Yeezy 350 V2 YECHER",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391105/40_hsx8sk.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 41,
            name: "Yeezy 350 V2 Bred",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391105/41_psleip.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 42,
            name: "Yeezy 350 V2 Zebra",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391105/42_owkag5.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 43,
            name: "Yeezy 350 V2 Tail Light",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391108/43_g2dyf4.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 44,
            name: "Yeezy 350 V2 Israfil",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391108/44_whgnpd.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 45,
            name: "Yeezy 350 V2 Yecheil Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391109/45_ifmpfl.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 46,
            name: "Yeezy 350 V2 Butter",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391110/46_p2luqn.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 47,
            name: "Yeezy 350 V2 Citrin Reflective",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391112/47_twnr09.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 48,
            name: "Yeezy 350 V2 Lundmark",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391112/48_cdisck.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 49,
            name: "Yeezy 350 V2 Yeshaya",
            price: 390,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754391113/49_hxu7fw.jpg",
            sizes: ["36", "36 2/3", "37 1/3", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3", "47 1/3", "48"],
            description: "Incaltari cu Arome de All-Inclusive"
        },
        {
            id: 101,
            name: "Yeezy Slides Glow 2Green",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/1_nkifkh.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 102,
            name: "Yeezy Slides Ochre",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/2_pybsys.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 103,
            name: "Yeezy Slides Onyx",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/3_zj1n5h.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 104,
            name: "Yeezy Slides Azzure",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/4_dmnpke.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 105,
            name: "Yeezy Slides Flax",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/5_w5opka.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 106,
            name: "Yeezy Slides Enflame Orange",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425411/6_aiplru.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 107,
            name: "Yeezy Slides Pure",
            price: 190,
            image: "",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 108,
            name: "Yeezy Slides Flax2",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/8_hwwc4t.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 109,
            name: "Yeezy Slides Resin",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/9_emi6de.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 110,
            name: "Yeezy Slides Flax3", 
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/10_vsawxj.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 111,
            name: "Yeezy Slides Flax4",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425412/11_tz2yuc.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 112,
            name: "Yeezy Slides Flax5",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425413/12_abpois.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        {
            id: 113,
            name: "Yeezy Foam Runner Sulfur",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/13_tqhzop.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 114,
            name: "Yeezy Foam Runner Onyx",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/14_htv8f3.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 115,
            name: "Yeezy Foam Runner MX Cinder",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/15_ebjsxf.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        
        {
            id: 116,
            name: "Yeezy Foam Runner Ararat",
            price: 190,
            image: "https://res.cloudinary.com/duomi60pe/image/upload/v1754425415/16_oz5w6j.jpg",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        ,
        {
            id: 101,
            name: "Yeezy Foam Runner ",
            price: 190,
            image: "",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },
        ,
        {
            id: 101,
            name: "Yeezy Foam Runner ",
            price: 190,
            image: "",
            sizes: ["36", "37", "38", "39", "40.5", "42", "43", "44.5", "46", "47", "48"],
            description: "Șlapi de Terasă și Aroganță"
        },




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

function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const size = document.getElementById('filter-size').value.toLowerCase();

    currentFilters = { search, minPrice, maxPrice, size };

    filteredShoes = shoes.filter(shoe => {
        const matchesSearch = shoe.name.toLowerCase().includes(search) ||
                            (shoe.description && shoe.description.toLowerCase().includes(search));
        const matchesPrice = shoe.price >= minPrice && shoe.price <= maxPrice;
        const matchesSize = !size || shoe.sizes.some(s => s.toLowerCase().includes(size));

        return matchesSearch && matchesPrice && matchesSize;
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
        const card = createProductCard(shoe, false); // false = isShoes
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
    document.getElementById('search').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('filter-size').value = '';
    
    currentFilters = { search: '', minPrice: null, maxPrice: null, size: '' };
    
    // Reset to show all shoes
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
        document.getElementById('products-container').innerHTML = '<div class="no-products"><p>No shoes added yet. Use the form above to add your first shoe!</p></div>';
        return;
    }
    
    // Initialize filters when shoes are rendered
    filteredShoes = [...shoes];
    renderFilteredShoes();
    updateResultsCount();
}

// Delete function that maintains filters
function deleteShoe(id) {
    if (confirm('Are you sure you want to delete this shoe?')) {
        shoes = shoes.filter(shoe => shoe.id !== id);
        saveShoes(); // Save to persistence after deleting
        // Reapply current filters after deletion
        applyFilters();
    }
}

// Modal functionality
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const imageContainer = document.getElementById('modal-image-container');
    
    // Set product details
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description || 'No description available';
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    
    // Handle category (for clothes only) - hide for shoes
    const categoryElement = document.getElementById('modal-category');
    categoryElement.style.display = 'none';
    
    // Handle color (for clothes only) - hide for shoes
    const colorElement = document.getElementById('modal-color');
    colorElement.style.display = 'none';
    
    // Handle image
    if (product.image) {
        imageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" class="modal-image" onerror="showFallbackIcon(this, '${getFallbackIcon(product)}')">`;
    } else {
        imageContainer.innerHTML = `<div class="modal-fallback-icon">${getFallbackIcon(product)}</div>`;
    }
    
    // Handle sizes
    const sizesContainer = document.getElementById('modal-sizes');
    sizesContainer.innerHTML = product.sizes.map(size => 
        `<span class="modal-size-tag">${size}</span>`
    ).join('');
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function getFallbackIcon(product) {
    if (product.category) {
        // For clothes
        const categoryEmoji = {
            'shirts': '👔',
            'pants': '👖', 
            'dresses': '👗',
            'jackets': '🧥',
            'accessories': '👜',
            'other': '👕'
        };
        return categoryEmoji[product.category] || '👕';
    } else {
        // For shoes
        return '👟';
    }
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
            'shirts': '👔', 'pants': '👖', 'dresses': '👗',
            'jackets': '🧥', 'accessories': '👜', 'other': '👕'
        };
        
        card.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteClothing(${product.id})">×</button>
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">${categoryEmoji[product.category] || '👕'}</div>` : (categoryEmoji[product.category] || '👕')}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-name">${product.name}</div>
                ${product.color ? `<div style="opacity: 0.8; margin-bottom: 0.5rem;">Color: ${product.color}</div>` : ''}
                <div class="product-description">${product.description || 'No description available'}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-sizes">
                    ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
                </div>
            </div>
        `;
    } else {
        // For shoes
        card.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteShoe(${product.id})">×</button>
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">👟</div>` : '👟'}
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description || 'No description available'}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-sizes">
                    ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    return card;
}

// Close modal when clicking outside content
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize the page - load saved data first
loadShoes();
renderShoes();