fetch('images.json')
  .then(res => res.json())
  .then(data => {
    const contenedor = document.body
    data.imagenes.forEach(imagen => {
      const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `
        <img src="${imagen.src}" alt="${imagen.titulo}">
        <div class="info">
          <p class="titulo">${imagen.titulo}</p>
          <p class="precio">$${imagen.precio}</p>
        </div>
      `
      card.addEventListener('click', () => {
        window.location.href = `detalle.html?id=${imagen.id}`
      })
      contenedor.appendChild(card)
    })
  })
  .catch(err => console.error('Error al cargar las imágenes:', err))
