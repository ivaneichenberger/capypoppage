const categorias = [
  { nombre: 'gatitos', archivo: 'data/gatitos.json' },
  { nombre: 'videojuegos', archivo: 'data/videojuegos.json' },
  { nombre: 'anime', archivo: 'data/anime.json' },
  { nombre: 'my melody', archivo: 'data/mymelody.json' },
  { nombre: 'cosas varias', archivo: 'data/varios.json' }
]

const filtros = document.getElementById('filtros')
const galeria = document.getElementById('galeria')

// Crear botones de categoría
categorias.forEach(cat => {
  const btn = document.createElement('button')
  btn.textContent = cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)
  btn.addEventListener('click', () => cargarCategoria(cat.archivo))
  filtros.appendChild(btn)
})

// Cargar categoría por defecto
cargarCategoria('data/gatitos.json')

function cargarCategoria(ruta) {
  galeria.innerHTML = '<p>Cargando stickers...</p>'
  fetch(ruta)
    .then(res => res.json())
    .then(data => {
      galeria.innerHTML = ''
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
          window.location.href = `detalle.html?id=${imagen.id}&cat=${imagen.categoria}`
        })
        galeria.appendChild(card)
      })
    })
    .catch(err => {
      galeria.innerHTML = '<p>Error al cargar los stickers 😿</p>'
      console.error(err)
    })
}
