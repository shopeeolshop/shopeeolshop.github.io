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
    const artikelBtn = document.createElement('a');
    artikelBtn.href = '/artikel/';
    artikelBtn.className = 'btn';
    artikelBtn.innerHTML = '<span class="fas fa-list-ul" style="margin-right:8px;"></span>Kumpulan Artikel';

    artikelBaru.insertAdjacentElement('afterend', artikelBtn);
  })
  .catch(error => {
    console.error('Error:', error);
  });
