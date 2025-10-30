const categorias = [
  { nombre: 'Todos', archivo: null }, 
  { nombre: 'gatitos', archivo: 'data/gatitos.json' },
  { nombre: 'videojuegos', archivo: 'data/videojuegos.json' },
  { nombre: 'anime', archivo: 'data/anime.json' },
  { nombre: 'my melody', archivo: 'data/mymelody.json' },
  { nombre: 'cosas varias', archivo: 'data/varios.json' },
  { nombre: 'tiernos', archivo: 'data/tiernos.json' }
]

const filtros = document.getElementById('filtros')
const galeria = document.getElementById('galeria')


categorias.forEach(cat => {
  const btn = document.createElement('button')
  btn.textContent = cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)
  btn.addEventListener('click', () => cargarCategoria(cat))
  filtros.appendChild(btn)
})


cargarCategoria(categorias[0])

function cargarCategoria(categoria) {
  galeria.innerHTML = '<p>Cargando stickers...</p>'

  if (categoria.nombre === 'Todos') {
   
    const fetches = categorias
      .filter(c => c.archivo) 
      .map(c => fetch(c.archivo).then(res => res.json()))

    Promise.all(fetches)
      .then(arrays => {
        
        const todasImagenes = arrays.flatMap(data => data.imagenes)
        mostrarImagenes(todasImagenes)
      })
      .catch(err => {
        galeria.innerHTML = '<p>Error al cargar los stickers 😿</p>'
        console.error(err)
      })

  } else {

    fetch(categoria.archivo)
      .then(res => res.json())
      .then(data => mostrarImagenes(data.imagenes))
      .catch(err => {
        galeria.innerHTML = '<p>Error al cargar los stickers 😿</p>'
        console.error(err)
      })
  }
}

function mostrarImagenes(imagenes) {
  galeria.innerHTML = ''
  imagenes.forEach(imagen => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <img src="${imagen.src}" alt="${imagen.titulo}">
      <div class="info">
        <p class="titulo">${imagen.titulo}</p>
        <p class="precio">$${imagen.precio}</p>
        <p class="oferta">4 x $700</p>
      </div>
    `
    card.addEventListener('click', () => {
      window.location.href = `detalle.html?id=${imagen.id}&cat=${imagen.categoria}`
    })
    galeria.appendChild(card)
  })
}
