# TokoKriya

Website katalog dan toko online demo untuk **TokoKriya**, yang menampilkan kerajinan tangan lokal seperti produk kulit Tanggulangin, anyaman, keramik, kayu, tekstil, dan dekorasi. Antarmuka menggunakan Bahasa Indonesia dan harga dalam Rupiah.

## Fitur

- Beranda dengan kategori, produk pilihan, produk baru, dan produk terlaris.
- Katalog dengan pencarian, filter kategori, pengurutan, dan halaman detail produk.
- Keranjang belanja, daftar keinginan, kode promo, pilihan pengiriman, dan simulasi checkout.
- Akun demo dengan profil, alamat, metode pembayaran, notifikasi, pengaturan, dan daftar pesanan.
- Halaman informasi: Tentang, Jurnal/artikel, Kontak, FAQ, pengiriman, pengembalian, privasi, dan ketentuan.
- Tema gelap, tata letak responsif, animasi, transisi halaman, dan penyimpanan preferensi/data demo di browser.

## Teknologi

- HTML5
- CSS3
- JavaScript (vanilla)
- `localStorage` dan `sessionStorage` untuk menyimpan data demo pada browser

Tidak memerlukan framework atau instalasi dependency.

## Menjalankan website

Anda dapat membuka `index.html` langsung di browser. Untuk pengalaman yang lebih konsisten, jalankan server lokal dari folder proyek.

Dengan Python:

```bash
python -m http.server 8000
```

Buka [http://localhost:8000](http://localhost:8000) di browser. Hentikan server dengan `Ctrl+C` di terminal.

> Jika perintah `python` tidak tersedia di Windows, coba `py -m http.server 8000`.

Atau buka folder proyek di Visual Studio Code dan jalankan `index.html` menggunakan ekstensi Live Server.

## Halaman

| Halaman | File |
| --- | --- |
| Beranda | `index.html` |
| Katalog dan pencarian | `shop.html`, `search.html` |
| Produk terlaris dan produk baru | `best-sellers.html`, `new-arrivals.html` |
| Detail produk | `product-detail.html` |
| Keranjang, checkout, konfirmasi pesanan | `cart.html`, `checkout.html`, `order-success.html` |
| Wishlist | `wishlist.html` |
| Akun dan pesanan | `account.html`, `orders.html`, `order-detail.html` |
| Profil dan preferensi akun | `profile.html`, `addresses.html`, `payment-methods.html`, `notifications.html`, `settings.html` |
| Informasi dan konten | `about.html`, `blog.html`, `blog-detail.html`, `contact.html`, `faq.html` |
| Kebijakan | `shipping.html`, `returns.html`, `privacy.html`, `terms.html` |

## Struktur proyek

```text
.
├── assets/
│   └── products/       # Foto produk
├── css/
│   ├── style.css       # Gaya utama
│   ├── responsive.css  # Tampilan responsif
│   └── animations.css  # Animasi dan transisi
├── js/
│   ├── data.js         # Data produk, kategori, artikel, dan opsi toko
│   ├── products.js     # Filter dan tampilan produk
│   ├── cart.js         # Keranjang dan perhitungan harga
│   ├── wishlist.js     # Daftar keinginan
│   ├── account.js      # Akun dan data pelanggan demo
│   ├── checkout.js     # Pembuatan pesanan demo
│   ├── utils.js        # Utilitas umum dan penyimpanan browser
│   ├── app.js          # Interaksi dan inisialisasi halaman
│   └── loading.js      # Tampilan loading
├── reference/          # Materi referensi proyek
└── *.html              # Halaman website
```

## Catatan

Website ini merupakan **demo frontend**. Data produk dan pesanan disimpan di browser masing-masing menggunakan Web Storage. Checkout, pilihan pembayaran, akun, dan pesanan tidak terhubung ke server, payment gateway, atau layanan pengiriman sungguhan. Data browser dapat hilang ketika penyimpanan situs dibersihkan dan tidak otomatis tersinkron antarperangkat.

