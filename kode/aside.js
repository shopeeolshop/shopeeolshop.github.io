// *************** aside artikel ***************
fetch('/json/artikel.json')
  .then(response => response.json())
  .then(data => {
    const artikelBaru = document.querySelector('.artikel-baru');
    let html = '';

    const reversedArticles = data.daftar_artikel.reverse().slice(0, 10);

    reversedArticles.forEach(artikel => {
      html += `
        <a href="${artikel.url}">
          <img src="${artikel.alamat_gambar}">
          <b>${artikel.judul}</b>
        </a>`;
    });

    artikelBaru.innerHTML = html;

    // Tambahkan tombol setelah .artikel-baru
    const btn = document.createElement('a');
    btn.href = '/artikel/';
    btn.className = 'btn';
    btn.textContent = '<span class="fas fa-list-ul"></span>Kumpulan Artikel';

    artikelBaru.insertAdjacentElement('afterend', btn);
  })
  .catch(error => {
    console.error('Error:', error);
  });
