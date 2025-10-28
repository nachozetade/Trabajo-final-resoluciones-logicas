
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto
function agregarCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardar();
  alert(`${nombre} fue añadido al carrito`);
  mostrarCarrito();
  actualizarContador();
}

// ver carrito
function mostrarCarrito() {
  const tabla = document.getElementById("carrito-items");
  if (!tabla) return;

  tabla.innerHTML = "";
  let total = 0;

  carrito.forEach((item, idx) => {
    total += item.precio;
    tabla.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio}</td>
        <td><button class="btn btn-sm btn-danger" onclick="eliminar(${idx})">Eliminar</button></td>
      </tr>
    `;
  });

  const totalFinal = document.getElementById("total-final");
  if (totalFinal) totalFinal.textContent = `Total: $${total}`;
}

// Eliminar un producto
function eliminar(index) {
  carrito.splice(index, 1);
  guardar();
  mostrarCarrito();
  actualizarContador();
}

// Vaciar carrito
function vaciarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }
  if (confirm("¿Seguro que querés vaciar el carrito?")) {
    carrito = [];
    guardar();
    mostrarCarrito();
    actualizarContador();
    alert("Carrito vaciado correctamente.");
  }
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("¡Compra realizada con éxito! Gracias por tu compra.");
  carrito = [];
  guardar();
  mostrarCarrito();
  actualizarContador();
}

// Actualizar contador
function actualizarContador() {
  const contador = document.getElementById("cart-count");
  if (contador) contador.textContent = carrito.length;
}

// Iniciar
document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  actualizarContador();
});
