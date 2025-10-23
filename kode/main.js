// *************** lazy loads ***************
const images = document.querySelectorAll("img");
images.forEach(function(image) {
 image.setAttribute("loading", "lazy");
});


// *************** next header ***************
const nextHeader = document.querySelector('.header').nextElementSibling;
nextHeader.style.marginTop = "60px";


// *************** Pencarian ***************
const ikonTelusur = document.querySelector(".search");
const boxTelusur = document.querySelector(".box-search");
const kolomTelusur = document.querySelector(".kolom-telusur");
const hasilPencarian = document.querySelector(".hasil-pencarian");

// Daftar semua URL JSON produk yang ingin dicari
const jsonUrls = [
  '/json/otomotif.json',
  '/json/perawatan-dan-kecantikan.json',
  '/json/handphone-dan-aksesoris.json'
];

window.addEventListener("click", e => {
  if (e.target === ikonTelusur) {
    boxTelusur.classList.toggle("aktif");
    if (boxTelusur.classList.contains("aktif")) {
      ikonTelusur.classList.add("fa-times");
      // Fokuskan kolom telusur saat dibuka
      kolomTelusur.focus(); 
    } else {
      ikonTelusur.classList.remove("fa-times");
      // Bersihkan hasil saat ditutup
      hasilPencarian.innerHTML = "";
      kolomTelusur.value = "";
    }
  }
});

kolomTelusur.addEventListener("input", () => {
  const query = kolomTelusur.value.toLowerCase().trim();
  if (query.length >= 3) { // Rekomendasi: Mulai pencarian setelah 3 karakter
    fetchProducts(query);
  } else {
    // Tampilkan pesan atau kosongkan jika query terlalu pendek
    hasilPencarian.innerHTML = query.length > 0 ? "<p>Masukkan minimal 1 kata. Contoh: tas, sabun, kaca dll.</p>" : "";
  }
});

/**
 * Mengambil data dari semua URL JSON produk, menggabungkannya, dan memfilter berdasarkan query.
 */
async function fetchProducts(query) {
  try {
    // 1. Ambil semua file JSON secara paralel
    const fetchPromises = jsonUrls.map(url => fetch(url));
    const responses = await Promise.all(fetchPromises);

    // Cek apakah ada response yang gagal (misalnya 404)
    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for ${response.url}`);
      }
    }

    // 2. Parse semua response menjadi objek JSON
    const dataPromises = responses.map(response => response.json());
    const dataArray = await Promise.all(dataPromises);

    // 3. Gabungkan semua data produk ke dalam satu array
    let allProducts = [];
    dataArray.forEach(data => {
      // Kita perlu mengidentifikasi kunci array yang berisi produk
      for (const key in data) {
        if (Array.isArray(data[key])) {
          // Tambahkan kategori/URL asal ke objek produk (opsional, untuk debugging)
          const categoryProducts = data[key].map(product => ({
              ...product,
              kategori: key // Menambahkan kategori asal produk
          }));
          allProducts = allProducts.concat(categoryProducts);
        }
      }
    });
    
    // 4. Filter produk gabungan berdasarkan namaProduk
    const filteredProducts = allProducts.filter(product =>
      product.namaProduk && product.namaProduk.toLowerCase().includes(query)
    );

    // 5. Tampilkan hasil
    displayResults(filteredProducts);

  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil atau memproses data produk:', error);
    hasilPencarian.innerHTML = `<p style="color: red;">Error: Gagal memuat data pencarian.</p>`;
  }
}

/* Menampilkan hasil produk yang ditemukan. */
function displayResults(products) {
  if (products.length > 0) {
    hasilPencarian.innerHTML = products.map(product => `
      <a href="${product.urlProduk}" class="ditemukan" target="_blank">
        <img src="${product.gambarProduk}" alt="Gambar produk">
        <div class="info-produk">
          <p class="harga">Rp ${product.hargaProduk}</p>
          <b>${product.namaProduk}</b>
        </div>
      </a>
    `).join('');
  } else {
    hasilPencarian.innerHTML = "<p>Tidak ada produk yang cocok dengan pencarian.</p>";
  }
}


// *************** footer credit ***************
const tahun = document.querySelector(".tahun");
let date = new Date().getFullYear();
tahun.innerHTML = date;


// *************** anti cheats ***************
/*

 document.addEventListener("contextmenu", e => {
 e.preventDefault();
}, false);
document.body.addEventListener('keydown', event => {
  if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
    event.preventDefault()
  }

});

*/




