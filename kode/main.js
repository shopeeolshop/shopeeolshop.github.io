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

window.addEventListener("click", e => {
  if ( e.target === ikonTelusur ) {
    boxTelusur.classList.toggle("aktif");
    if ( boxTelusur.classList.contains("aktif") ) {
      ikonTelusur.classList.add("fa-times");
    }
    else{
      ikonTelusur.classList.remove("fa-times");
    }
  }
});

kolomTelusur.addEventListener("input", () => {
  const query = kolomTelusur.value.toLowerCase();
  // console.log('Masukan terakhir :', query);
  if (query.length > 0) {
    fetchArticles(query);
  } else {
    hasilPencarian.innerHTML = "";
  }
});

async function fetchArticles(query) {
  try {
    const response = await fetch('/artikel.json');
    const data = await response.json();
    const filteredArticles = data.daftar_artikel.filter(article => 
      article.judul.toLowerCase().includes(query)
    );
    displayResults(filteredArticles);
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil artikel:', error);
  }
}

function displayResults(articles) {
  if (articles.length > 0) {
    hasilPencarian.innerHTML = articles.map(article => `
      <a href="${article.url}" class="ditemukan">
        <img src="${article.alamat_gambar}">
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
document.addEventListener("contextmenu", e => {
 e.preventDefault();
}, false);
document.body.addEventListener('keydown', event => {
  if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
    event.preventDefault()
  }
});