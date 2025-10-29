const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get('id'))

fetch('images.json')
  .then(res => res.json())
  .then(data => {
    const imagen = data.imagenes.find(img => img.id === id)
    const contenedor = document.getElementById('detalle')

    if (imagen) {
      contenedor.innerHTML = `
        <img src="${imagen.src}" alt="${imagen.titulo}">
        <h2>${imagen.titulo}</h2>
        <p>Precio: $${imagen.precio}</p>
        <a href="index.html">Volver</a>
      `
    } else {
      contenedor.innerHTML = '<h2>Imagen no encontrada</h2>'
    }
  })
  .catch(err => console.error('Error al cargar los datos:', err))
