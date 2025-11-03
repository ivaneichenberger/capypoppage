const lista = document.getElementById('listaCarrito')
const total = document.getElementById('total')
const btnVaciar = document.getElementById('vaciarCarrito')
const btnWhatsapp = document.getElementById('enviarWhatsapp')

let carrito = JSON.parse(localStorage.getItem('carrito')) || []

function mostrarCarrito() {
  lista.innerHTML = ''
  if (carrito.length === 0) {
    lista.innerHTML = '<p>Tu carrito está vacío 😿</p>'
    total.textContent = ''
    localStorage.removeItem('carrito')
    return
  }

  let totalPrecio = 0

  carrito.forEach((item, i) => {
    const div = document.createElement('div')
    div.classList.add('item-carrito')
    div.innerHTML = `
      <img src="${item.variacion}" alt="${item.producto}">
      <div class="info-item">
        <h4>${item.producto}</h4>
        <p>$${item.precio}</p>
        <p style="font-size:0.9rem;color:#555;">Variación: ${extraerNombreVariacion(item.variacion)}</p>
        <button class="eliminar" data-index="${i}">❌ Eliminar</button>
      </div>
    `
    lista.appendChild(div)
    totalPrecio += item.precio
  })

  // 🔹 Aplicar promoción "4 x $800"
  let descuentoAplicado = false
  const cantidad = carrito.length

  if (cantidad >= 4) {
    const gruposDe4 = Math.floor(cantidad / 4)
    const resto = cantidad % 4
    totalPrecio = gruposDe4 * 800 + resto * 250
    descuentoAplicado = true
  }

  total.textContent = descuentoAplicado
    ? `Total con promo 4x$800 aplicada: $${totalPrecio}`
    : `Total: $${totalPrecio}`

  localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Función para extraer el nombre de la variación de la ruta
function extraerNombreVariacion(ruta) {
  const nombreArchivo = ruta.split('/').pop() // ej: "gatitos1_1.jpg"
  const nombre = nombreArchivo.split('.')[0] // quita ".jpg"
  return nombre
}

// eliminar un ítem
lista.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar')) {
    const i = e.target.dataset.index
    carrito.splice(i, 1)
    mostrarCarrito()
  }
})

// vaciar carrito
btnVaciar.addEventListener('click', () => {
  carrito = []
  localStorage.removeItem('carrito')
  mostrarCarrito()
})

// enviar por whatsapp
btnWhatsapp.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío 😿')
    return
  }

  let mensaje = '¡Hola! Quiero hacer el siguiente pedido:\n\n'

  carrito.forEach((item, i) => {
    const variacionNombre = extraerNombreVariacion(item.variacion)
    mensaje += `${i + 1}. ${item.producto} - ${variacionNombre} - $${item.precio}\n`
  })

  // Recalcular total con la promoción
  const cantidad = carrito.length
  let totalFinal = carrito.reduce((acc, item) => acc + item.precio, 0)
  if (cantidad >= 4) {
    const gruposDe4 = Math.floor(cantidad / 4)
    const resto = cantidad % 4
    totalFinal = gruposDe4 * 800 + resto * 250
    mensaje += `\n✅ Se aplicó la promo 4x$800\n`
  }

  mensaje += `\nTotal: $${totalFinal}\n\nGracias 🩷`

  const link = `https://wa.me/543794136245?text=${encodeURIComponent(mensaje)}`
  window.open(link, '_blank')
})

mostrarCarrito()
