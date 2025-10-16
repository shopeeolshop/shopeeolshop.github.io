// *************** Artikel Section ***************
async function fetchLatestArticles() {
    try {
        const response = await fetch('/artikel.json');
        const data = await response.json();
        // Mengambil 5 artikel terbaru dan membalik urutannya
        const latestArticles = data.daftar_artikel.slice(-5).reverse();
        displayLatestArticles(latestArticles);
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil artikel:', error);
    }
}

function displayLatestArticles(articles) {
    const boxSliderArtikel = document.querySelector('.box-slider-artikel');
    boxSliderArtikel.innerHTML = articles.map(article => `
        <a href="${article.url}" class="content-slider-artikel swiper-slide slide">
            <img src="${article.alamat_gambar}">
            <h3>${article.judul}</h3>
            <p>${article.deskripsi}</p>
        </a>
    `).join('');
}

fetchLatestArticles();

// *************** galeri klien ***************
const klienSlider = new Swiper(".klien-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 16,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        500: {
            slidesPerView: 2,
        },
        800: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 3000,
    },
});

// *************** artikel section ***************
const artikelTerbaruSlider = new Swiper(".container-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 16,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        500: {
            slidesPerView: 2,
        },
        800: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 2500,
    },
});