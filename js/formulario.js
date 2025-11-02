// Precios
const precios = {
  photocard: 200,
  polaroid: 450,
  polaroidMini: 250
}

// Elementos
const checkPhotocards = document.getElementById('photocards')
const checkPolaroids = document.getElementById('polaroids')
const checkPolaroidsMini = document.getElementById('polaroidsMini')

const campoPhotocards = document.getElementById('campoPhotocards')
const campoPolaroids = document.getElementById('campoPolaroids')
const campoPolaroidsMini = document.getElementById('campoPolaroidsMini')

const cantPhotocards = document.getElementById('cantPhotocards')
const cantPolaroids = document.getElementById('cantPolaroids')
const cantPolaroidsMini = document.getElementById('cantPolaroidsMini')

const totalEl = document.getElementById('total')
const enviarBtn = document.getElementById('enviar')
const nombreInput = document.getElementById('nombre')

// Mostrar campos según selecciones
function actualizarCampos() {
  campoPhotocards.style.display = checkPhotocards.checked ? 'block' : 'none'
  campoPolaroids.style.display = checkPolaroids.checked ? 'block' : 'none'
  campoPolaroidsMini.style.display = checkPolaroidsMini.checked ? 'block' : 'none'
  calcularTotal()
}

checkPhotocards.addEventListener('change', actualizarCampos)
checkPolaroids.addEventListener('change', actualizarCampos)
checkPolaroidsMini.addEventListener('change', actualizarCampos)

cantPhotocards.addEventListener('input', calcularTotal)
cantPolaroids.addEventListener('input', calcularTotal)
cantPolaroidsMini.addEventListener('input', calcularTotal)

function calcularTotal() {
  let total = 0

  // Photocards
  if (checkPhotocards.checked) {
    let cantidad = parseInt(cantPhotocards.value) || 0
    if (cantidad >= 9) {
      let grupos = Math.floor(cantidad / 9)
      let sobrantes = cantidad % 9
      total += grupos * 1600 + sobrantes * precios.photocard
    } else {
      total += cantidad * precios.photocard
    }
  }

  // Polaroids normales
  if (checkPolaroids.checked) {
    total += (parseInt(cantPolaroids.value) || 0) * precios.polaroid
  }

  // Polaroids mini
  if (checkPolaroidsMini.checked) {
    total += (parseInt(cantPolaroidsMini.value) || 0) * precios.polaroidMini
  }

  totalEl.textContent = `Total: $${total}`
  return total
}

// Enviar por WhatsApp
enviarBtn.addEventListener('click', () => {
  const nombre = nombreInput.value.trim()
  if (!nombre) {
    alert('Por favor ingresá tu nombre 💕')
    return
  }

  const total = calcularTotal()
  if (total === 0) {
    alert('Seleccioná al menos un producto 💖')
    return
  }

  let mensaje = `¡Hola Capypop! 💖%0AQuiero hacer un pedido:%0A`

  if (checkPhotocards.checked) mensaje += `- Photocards: ${cantPhotocards.value}%0A`
  if (checkPolaroids.checked) mensaje += `- Polaroids normales: ${cantPolaroids.value}%0A`
  if (checkPolaroidsMini.checked) mensaje += `- Polaroids mini: ${cantPolaroidsMini.value}%0A`

  mensaje += `%0ATotal: $${total}%0A`
  mensaje += `A nombre de: ${nombre} 💗`

  const numero = '543794136245' // 💬 poné acá tu número de WhatsApp con código de país
  const url = `https://wa.me/${numero}?text=${mensaje}`

  window.open(url, '_blank')
})
