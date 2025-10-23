// *************** lazy loads ***************
const images = document.querySelectorAll("img");
images.forEach(function(image) {
 image.setAttribute("loading", "lazy");
});


// *************** next header ***************
const nextHeader = document.querySelector('.header').nextElementSibling;
nextHeader.style.marginTop = "60px";


// *************** Pencarian ***************
// *************** Pencarian ***************
const ikonTelusur = document.querySelector(".search");
const boxTelusur = document.querySelector(".box-search");
const kolomTelusur = document.querySelector(".kolom-telusur");
const hasilPencarian = document.querySelector(".hasil-pencarian");

// Daftar semua URL JSON yang ingin dicari
const jsonUrls = [
  '/json/artikel.json',
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
  const query = kolomTelusur.value.toLowerCase().trim(); // Tambah .trim()
  if (query.length > 0) {
    fetchArticles(query);
  } else {
    hasilPencarian.innerHTML = "";
  }
});

/**
 * Mengambil data dari semua URL JSON, menggabungkannya, dan memfilter berdasarkan query.
 * Catatan: Asumsi struktur JSON adalah { "daftar_artikel": [...] } untuk semua file.
 */
async function fetchArticles(query) {
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

    // 3. Gabungkan semua daftar artikel ke dalam satu array
    let allArticles = [];
    dataArray.forEach(data => {
      // Asumsikan kunci array adalah 'daftar_artikel'
      if (data && Array.isArray(data.daftar_artikel)) {
        allArticles = allArticles.concat(data.daftar_artikel);
      }
    });
    
    // 4. Filter artikel gabungan
    const filteredArticles = allArticles.filter(article =>
      article.judul.toLowerCase().includes(query)
    );

    // 5. Tampilkan hasil
    displayResults(filteredArticles);

  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil atau memproses artikel:', error);
    hasilPencarian.innerHTML = `<p style="color: red;">Error: Gagal memuat data pencarian.</p>`;
  }
}

function displayResults(articles) {
  if (articles.length > 0) {
    hasilPencarian.innerHTML = articles.map(article => `
      <a href="${article.url}" class="ditemukan">
        <img src="${article.alamat_gambar}" alt="Gambar artikel">
        <b>${article.judul}</b>
      </a>
    `).join('');
  } else {
    hasilPencarian.innerHTML = "<p>Tidak ada artikel yang cocok dengan pencarian.</p>";
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

