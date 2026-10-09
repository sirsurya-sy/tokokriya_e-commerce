const STORE = {
  name: "TokoKriya",
  city: "Sidoarjo",
  email: "hello@tokokriya.id",
  phone: "+62 31 8945 2200",
  address: "Jl. Gubernur Suryo No. 18, Sidoarjo, Jawa Timur 61219",
  hours: "Senin–Sabtu, 09.00–21.00 WIB",
  freeShippingMin: 500000,
  coupons: {
    KRIYA10: { type: "percent", value: 10, label: "Diskon 10%" },
    WELCOMEKRIYA: { type: "percent", value: 15, label: "Diskon 15%" },
    FREESHIP: { type: "shipping", value: 0, label: "Gratis ongkir" }
  }
};

const CATEGORIES = ["Kulit Tanggulangin", "Anyaman", "Kerajinan Kayu", "Perhiasan", "Keramik", "Tekstil", "Dekorasi"];

const DELIVERY_OPTIONS = [
  { id: "jne", name: "JNE Regular", eta: "3–5 hari", price: 27000 },
  { id: "jnt", name: "J&T Express", eta: "2–4 hari", price: 35000 },
  { id: "sicepat", name: "SiCepat", eta: "2–3 hari", price: 32000 }
];

const PAYMENT_OPTIONS = [
  { id: "bank", name: "Transfer bank", hint: "BCA / Mandiri / BRI" },
  { id: "ovo", name: "OVO", hint: "Dompet digital" },
  { id: "gopay", name: "GoPay", hint: "Dompet digital" },
  { id: "card", name: "Kartu kredit", hint: "Visa / Mastercard" },
  { id: "cod", name: "Bayar di tempat", hint: "Bayar di tempat" }
];

const U = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const L = (file) => `assets/products/${encodeURIComponent(file)}`;

const PRODUCTS = [
  {
    id: "p01", slug: "dompet-kulit", name: "Dompet Kulit", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 185000, rating: 0, reviewCount: 0,
    stock: 10, stockStatus: "Tersedia", colors: ["Cokelat"], sizes: [],
    description: "Dompet kulit dengan desain ringkas untuk menyimpan uang dan kartu sehari-hari.",
    images: [L("dompet kulit.jpg")], featured: true, bestSeller: true, newArrival: true,
    details: { material: "Kulit", penggunaan: "Aksesori sehari-hari" }
  },
  {
    id: "p02", slug: "sandal-kulit-anyaman", name: "Sandal Kulit Anyaman", category: "Anyaman",
    brand: "Kriya Nusantara", price: 225000, rating: 0, reviewCount: 0,
    stock: 10, stockStatus: "Tersedia", colors: ["Alami"], sizes: [],
    description: "Sandal dengan detail anyaman untuk melengkapi gaya santai sehari-hari.",
    images: [L("sandal kulit anyaman.jpg")], featured: true, bestSeller: true, newArrival: true,
    details: { material: "Kulit dan anyaman" }
  },
  {
    id: "p03", slug: "gantungan-kunci-ukiran", name: "Gantungan Kunci Ukiran", category: "Kerajinan Kayu",
    brand: "Kriya Nusantara", price: 45000, rating: 0, reviewCount: 0,
    stock: 20, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Gantungan kunci beraksen ukiran, cocok sebagai aksesori kecil atau buah tangan.",
    images: [L("gantungan kunci ukiran.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { jenis: "Aksesori ukiran" }
  },
  {
    id: "p04", slug: "gelang-perak", name: "Gelang Perak", category: "Perhiasan",
    brand: "Kriya Nusantara", price: 325000, rating: 0, reviewCount: 0,
    stock: 8, stockStatus: "Tersedia", colors: ["Perak"], sizes: [],
    description: "Gelang perak dengan tampilan klasik untuk pemakaian sehari-hari maupun acara khusus.",
    images: [L("gelang perak.jpg")], featured: true, bestSeller: true, newArrival: true,
    details: { material: "Perak" }
  },
  {
    id: "p05", slug: "keranjang-anyaman-bulat", name: "Keranjang Anyaman Bulat", category: "Anyaman",
    brand: "Kriya Anyam", price: 135000, rating: 0, reviewCount: 0,
    stock: 12, stockStatus: "Tersedia", colors: ["Alami"], sizes: [],
    description: "Keranjang anyaman berbentuk bulat untuk penyimpanan dan penataan ruang.",
    images: [L("keranjang anyaman bulat.jpg")], featured: true, bestSeller: false, newArrival: false,
    details: { material: "Anyaman" }
  },
  {
    id: "p06", slug: "keranjang-anyaman", name: "Keranjang Anyaman", category: "Anyaman",
    brand: "Kriya Anyam", price: 165000, rating: 0, reviewCount: 0,
    stock: 12, stockStatus: "Tersedia", colors: ["Alami"], sizes: [],
    description: "Keranjang anyaman serbaguna untuk membantu merapikan perlengkapan di rumah.",
    images: [L("keranjang anyaman.jpg")], featured: false, bestSeller: true, newArrival: false,
    details: { material: "Anyaman" }
  },
  {
    id: "p07", slug: "mangkuk-kayu", name: "Mangkuk Kayu", category: "Kerajinan Kayu",
    brand: "Kriya Nusantara", price: 95000, rating: 0, reviewCount: 0,
    stock: 10, stockStatus: "Tersedia", colors: ["Alami"], sizes: [],
    description: "Mangkuk kayu dengan serat alami yang dapat digunakan sebagai wadah atau aksen meja.",
    images: [L("mangkuk kayu.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { material: "Kayu" }
  },
  {
    id: "p08", slug: "mangkuk-keramik", name: "Mangkuk Keramik", category: "Keramik",
    brand: "Kriya Keramik", price: 85000, rating: 0, reviewCount: 0,
    stock: 10, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Mangkuk keramik untuk kebutuhan saji maupun dekorasi meja.",
    images: [L("mangkuk keramik.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { material: "Keramik" }
  },
  {
    id: "p09", slug: "nampan-anyaman", name: "Nampan Anyaman", category: "Anyaman",
    brand: "Kriya Anyam", price: 110000, rating: 0, reviewCount: 0,
    stock: 10, stockStatus: "Tersedia", colors: ["Alami"], sizes: [],
    description: "Nampan anyaman untuk menyajikan hidangan atau menata barang kecil.",
    images: [L("nampan anyaman.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { material: "Anyaman" }
  },
  {
    id: "p10", slug: "cangkir-dan-piring-keramik", name: "Set Cangkir dan Piring Keramik", category: "Keramik",
    brand: "Kriya Keramik", price: 185000, rating: 0, reviewCount: 0,
    stock: 8, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Set cangkir dan piring keramik untuk menemani waktu minum teh atau kopi.",
    images: [L("cangkir dan piring keramik.jpg")], featured: true, bestSeller: true, newArrival: true,
    details: { material: "Keramik", isi: "Cangkir dan piring" }
  },
  {
    id: "p11", slug: "syal-tenun-ikat", name: "Syal Tenun Ikat", category: "Tekstil",
    brand: "Kriya Tekstil", price: 210000, rating: 0, reviewCount: 0,
    stock: 8, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Syal tenun ikat sebagai pelengkap busana dengan tekstur kain yang khas.",
    images: [L("syal tenun ikat.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { teknik: "Tenun ikat" }
  },
  {
    id: "p12", slug: "topeng-kayu", name: "Topeng Kayu", category: "Kerajinan Kayu",
    brand: "Kriya Nusantara", price: 245000, rating: 0, reviewCount: 0,
    stock: 5, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Topeng kayu untuk koleksi atau dekorasi ruang bernuansa tradisional.",
    images: [L("topeng kayu.jpg")], featured: true, bestSeller: false, newArrival: false,
    details: { material: "Kayu" }
  },
  {
    id: "p13", slug: "tudung-ayam-tradisional", name: "Tudung Ayam Tradisional", category: "Dekorasi",
    brand: "Kriya Nusantara", price: 175000, rating: 0, reviewCount: 0,
    stock: 6, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Kerajinan tradisional berbentuk tudung ayam untuk koleksi dan dekorasi.",
    images: [L("tudung ayam tradisional.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { jenis: "Kerajinan tradisional" }
  },
  {
    id: "p14", slug: "ukiran-gajah", name: "Ukiran Gajah", category: "Kerajinan Kayu",
    brand: "Kriya Nusantara", price: 195000, rating: 0, reviewCount: 0,
    stock: 6, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Karya ukir berbentuk gajah untuk mempercantik rak atau meja.",
    images: [L("ukiran gajah.jpg")], featured: false, bestSeller: true, newArrival: false,
    details: { motif: "Gajah" }
  },
  {
    id: "p15", slug: "vas-keramik", name: "Vas Keramik", category: "Keramik",
    brand: "Kriya Keramik", price: 155000, rating: 0, reviewCount: 0,
    stock: 7, stockStatus: "Tersedia", colors: [], sizes: [],
    description: "Vas keramik untuk bunga atau sebagai aksen dekoratif pada ruangan.",
    images: [L("vas keramik.jpg")], featured: true, bestSeller: false, newArrival: false,
    details: { material: "Keramik" }
  },
  {
    id: "p16", slug: "vas-tanah-liat", name: "Vas Tanah Liat", category: "Dekorasi",
    brand: "Kriya Nusantara", price: 125000, rating: 0, reviewCount: 0,
    stock: 7, stockStatus: "Tersedia", colors: ["Terakota"], sizes: [],
    description: "Vas tanah liat dengan karakter alami untuk dekorasi rumah.",
    images: [L("vas tanah liat.jpg")], featured: false, bestSeller: false, newArrival: true,
    details: { material: "Tanah liat" }
  }
];
const BLOG_POSTS = [
  {
    id: "b01",
    slug: "kerajinan-kulit-tanggulangin",
    title: "Keindahan Kerajinan Kulit Tanggulangin Sidoarjo",
    category: "Kerajinan",
    date: "2026-09-12",
    author: "Nadia Kriya",
    excerpt: "Tanggulangin adalah pusat kerajinan kulit terbesar di Jawa Timur. Temukan kisah di balik setiap jahitan tangan para pengrajin lokal.",
    image: L("dompet kulit.jpg"),
    content: [
      "Tanggulangin, sebuah kecamatan di Sidoarjo, telah lama dikenal sebagai sentra kerajinan kulit terbesar di Jawa Timur. Para pengrajin di sini mewariskan keahlian membuat tas, sepatu, dan dompet kulit secara turun-temurun selama lebih dari 40 tahun.",
      "Setiap produk kulit Tanggulangin dikerjakan dengan tangan — mulai dari memotong kulit, menjahit dengan jarum tangan, hingga memasang hardware. Kualitas yang dihasilkan setara dengan produk premium namun dengan harga yang jauh lebih terjangkau.",
      "TokoKriya berkolaborasi langsung dengan para pengrajin Tanggulangin untuk memastikan setiap produk yang Anda terima adalah hasil kerja tangan asli, bukan produksi massal."
    ]
  },
  {
    id: "b02",
    slug: "mengenal-batik-jetis-sidoarjo",
    title: "Batik Jetis: Warisan Budaya Sidoarjo yang Tak Lekang",
    category: "Batik",
    date: "2026-09-02",
    author: "Raka Putra",
    excerpt: "Batik Jetis Sidoarjo memiliki ciri khas motif sogan dengan warna gelap dan corak flora yang khas. Kenali lebih dalam warisan budaya ini.",
    image: L("syal tenun ikat.jpg"),
    content: [
      "Batik Jetis adalah salah satu batik tertua di Jawa Timur yang berasal dari Kelurahan Jetis, Sidoarjo. Karakteristiknya yang khas adalah dominasi warna sogan (coklat kehitaman) dengan motif flora dan fauna yang detail.",
      "Proses pembuatan batik tulis Jetis memakan waktu berminggu-minggu. Pengrajin menggunakan canting untuk menuang malam (lilin batik) di atas kain katun primissima, kemudian mewarnainya dengan pewarna alami dari tanaman lokal.",
      "TokoKriya bangga menjadi salah satu platform yang memperkenalkan keindahan Batik Jetis kepada pembeli modern, sambil memastikan pengrajin lokal mendapatkan penghargaan yang setimpal."
    ]
  },
  {
    id: "b03",
    slug: "anyaman-tradisional-sidoarjo",
    title: "Anyaman Pandan: Keahlian Tangan dari Sidoarjo",
    category: "Kerajinan",
    date: "2026-08-21",
    author: "Mira Sari",
    excerpt: "Anyaman daun pandan dari Sidoarjo dikenal kuat, rapi, dan ramah lingkungan. Simak cara pengrajin lokal menciptakan keindahan dari alam.",
    image: L("keranjang anyaman.jpg"),
    content: [
      "Kerajinan anyaman pandan dari Sidoarjo adalah salah satu produk unggulan UMKM lokal. Daun pandan dipanen, dikeringkan, dan dianyam menjadi berbagai produk: keranjang, tikar, topi, hingga tas.",
      "Yang membedakan anyaman Sidoarjo adalah ketelitian motif dan ketahanan produknya. Dengan pewarna alami dari tumbuhan, warna anyaman tahan bertahun-tahun tanpa memudar.",
      "TokoKriya memilih produk anyaman yang dikerjakan oleh kelompok ibu-ibu pengrajin di desa sekitar Sidoarjo sebagai bagian dari program pemberdayaan ekonomi lokal."
    ]
  },
  {
    id: "b04",
    slug: "cara-merawat-produk-kulit",
    title: "Tips Merawat Produk Kulit Tanggulangin Agar Awet",
    category: "Panduan",
    date: "2026-08-08",
    author: "Nadia Kriya",
    excerpt: "Produk kulit asli butuh perawatan yang tepat. Ikuti panduan sederhana ini agar tas, dompet, dan ikat pinggang kulit Anda bertahan puluhan tahun.",
    image: L("dompet kulit.jpg"),
    content: [
      "Kulit sapi asli adalah material yang makin indah seiring waktu jika dirawat dengan benar. Pertama, hindari paparan air berlebih dan sinar matahari langsung yang dapat membuat kulit retak dan memudar.",
      "Gunakan pelembap khusus kulit setiap 2-3 bulan sekali untuk menjaga kelembaban kulit. Simpan di tempat yang sejuk dan gunakan kantong pelindung saat tidak dipakai.",
      "Untuk noda ringan, cukup usap dengan kain lembap. Hindari sabun berlebih. Produk kulit yang dirawat dengan baik bisa bertahan 20-30 tahun dan memiliki karakter yang semakin cantik."
    ]
  }
];
const FAQS = [
  { cat: "shipping", q: "Berapa lama pengiriman ke Sidoarjo dan sekitarnya?", a: "Untuk Sidoarjo dan Surabaya biasanya 1–2 hari kerja. Kota lain di Jawa 2–5 hari tergantung kurir yang dipilih pada halaman pembayaran." },
  { cat: "shipping", q: "Apakah ada gratis ongkir?", a: "Ya. Belanja minimal Rp 500.000 mendapat gratis ongkir, atau gunakan kode FREESHIP." },
  { cat: "payment", q: "Metode pembayaran apa yang tersedia?", a: "Transfer bank, OVO, GoPay, kartu kredit (simulasi), dan Bayar di tempat. Ini proyek situs web — tidak ada pembayaran sungguhan." },
  { cat: "payment", q: "Kode kupon apa yang bisa dipakai?", a: "KRIYA10 (diskon 10%), WELCOMEKRIYA (diskon 15%), dan FREESHIP (gratis ongkir)." },
  { cat: "return", q: "Bagaimana kebijakan retur?", a: "Retur dalam 7 hari jika barang cacat atau salah kirim. Produk harus belum dipakai dan dilengkapi tag." },
  { cat: "account", q: "Apakah saya perlu membuat akun?", a: "Pembayaran bisa diisi tanpa login server. Profil, alamat, dan pesanan disimpan di peramban (penyimpanan lokal) untuk demo." },
  { cat: "orders", q: "Bagaimana melacak pesanan?", a: "Buka Pesanan saya, pilih pesanan, lalu gunakan Lacak pesanan. Status bersifat simulasi." },
  { cat: "produk", q: "Apakah informasi stok diperbarui secara langsung?", a: "Stok adalah data demo. Produk bertanda Habis tidak dapat ditambahkan ke keranjang." }
];

const DEFAULT_REVIEWS = [];
