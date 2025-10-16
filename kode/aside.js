// // *************** aside artikel ***************
fetch('/artikel.json')
  .then(response => response.json())
  .then(data => {
    const artikelBaru = document.querySelector('.artikel-baru');
    let html = '';

    // Membalik urutan array daftar_artikel dan mengambil 5 elemen terakhir
    const reversedArticles = data.daftar_artikel.reverse().slice(0, 5);

    reversedArticles.forEach(artikel => {
      html += `
        <a href="${artikel.url}">
          <img src="${artikel.alamat_gambar}">
          <b>${artikel.judul}</b>
        </a>`;
    });
    artikelBaru.innerHTML = html;
  })
  .catch(error => {
    console.error('Error:', error);
  });