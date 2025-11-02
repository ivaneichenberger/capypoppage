const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get('id'))
const categoria = params.get('cat')

if (!categoria) {
  document.body.innerHTML = '<h2>No se especificó categoría 😿</h2>'
} else {
  fetch(`data/${categoria}.json`)
    .then(res => res.json())
    .then(data => {
      const imagen = data.imagenes.find(img => img.id === id)
      const contenedor = document.getElementById('detalle')

      if (imagen) {
        const mensaje = encodeURIComponent(`Hola! Me interesaron los stickers de la categoria "${imagen.titulo}" me puede pasar más información, gracias 😁 `)
        const linkWhatsapp = `https://wa.me/543794136245?text=${mensaje}`

        contenedor.innerHTML = `
          <img id="stickerImg" src="${imagen.src}" alt="${imagen.titulo}">
          <h2>${imagen.titulo}</h2>
          <p>Precio: $${imagen.precio}</p>
          <p class="oferta">4 x $800 </p>
          <a href="${linkWhatsapp}" target="_blank">💬 Escribime por WhatsApp</a>
          <br>
          <a href="index.html">Volver</a>
        `

        const img = document.getElementById('stickerImg')

        // Zoom con clic (desktop)
        img.addEventListener('click', () => {
          img.classList.toggle('zoom-activo')
        })

        // Zoom con gesto (mobile)
        let scale = 1
        let startDist = 0

        img.addEventListener('touchstart', e => {
          if (e.touches.length === 2) {
            startDist = getDistance(e.touches[0], e.touches[1])
          }
        })

        img.addEventListener('touchmove', e => {
          if (e.touches.length === 2) {
            const newDist = getDistance(e.touches[0], e.touches[1])
            scale = Math.min(Math.max(1, newDist / startDist), 3)
            img.style.transform = `scale(${scale})`
            e.preventDefault()
          }
        })

        img.addEventListener('touchend', () => {
          if (scale <= 1.1) {
            img.style.transform = 'scale(1)'
          }
        })

        function getDistance(touch1, touch2) {
          const dx = touch1.clientX - touch2.clientX
          const dy = touch1.clientY - touch2.clientY
          return Math.sqrt(dx * dx + dy * dy)
        }
      } else {
        contenedor.innerHTML = '<h2>Sticker no encontrado 😿</h2>'
      }
    })
    .catch(err => console.error('Error al cargar los datos:', err))
}
