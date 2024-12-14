function guardarDatosServicios() {
  var cliente = document.getElementById('cliente').value;
  var dni = document.getElementById('dni').value;
  var tiposervicio = document.getElementById('tiposervicio').value;
  var detalleservicio = document.getElementById('detalleservicio').value;
  var detalleubicacion = document.getElementById('detalleubicacion').value;

  var nuevoServicio = {
      cliente: cliente,
      dni: dni,
      tiposervicio: tiposervicio,
      detalleservicio: detalleservicio,
      detalleubicacion: detalleubicacion
  };

  // Obtener el array de servicios del local storage o inicializarlo si no existe
  var servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  
  // Agregar el nuevo servicio al array
  servicios.push(nuevoServicio);
  
  // Guardar el array actualizado en el local storage
  localStorage.setItem('servicios', JSON.stringify(servicios));
  
  alert('Datos guardados correctamente en Local Storage');

   // Limpiar los campos del formulario
   document.getElementById('cliente').value = '';
   document.getElementById('dni').value = '';
   document.getElementById('tiposervicio').value = '';
   document.getElementById('detalleservicio').value = '';
   document.getElementById('detalleubicacion').value = '';

}


document.addEventListener("DOMContentLoaded", function () {
  cargarServicios();
});

function cargarServicios() {
  var servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  var serviciosBody = document.getElementById('serviciosBody');

  serviciosBody.innerHTML = '';

  servicios.forEach(function(servicio, index) {
      var row = document.createElement('tr');
      row.innerHTML = `
          <th type="button" data-bs-toggle="modal" data-bs-target="#selecservicio" scope="row">${index + 1}</th>
          <td>${servicio.cliente}</td>
          <td>${servicio.dni}</td>
          <td>${servicio.tiposervicio}</td>
          <td>${servicio.detalleservicio}</td>
          <td>${servicio.detalleubicacion}</td>
      `;
      row.addEventListener('click', function() {
          cargarServicioEnModal(index);
      });
      serviciosBody.appendChild(row);
  });

  // Actualizar el contador de notificaciones
  actualizarContador(servicios.length);
}

function cargarServicioEnModal(index) {
  var servicios = JSON.parse(localStorage.getItem('servicios')) || [];
  var servicio = servicios[index];

  document.getElementById('modal-cliente').value = servicio.cliente;
  document.getElementById('modal-dni').value = servicio.dni;
  document.getElementById('modal-tiposervicio').value = servicio.tiposervicio;
  document.getElementById('modal-detalleservicio').value = servicio.detalleservicio;
  document.getElementById('modal-detalleubicacion').value = servicio.detalleubicacion;

  // Guardar el índice del servicio actual en un atributo del modal
  document.getElementById('selecservicio').setAttribute('data-servicio-index', index);
}

function actualizarServicio() {
  var index = document.getElementById('selecservicio').getAttribute('data-servicio-index');
  var servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  servicios[index] = {
    cliente: document.getElementById('modal-cliente').value,
    dni: document.getElementById('modal-dni').value,
    tiposervicio: document.getElementById('modal-tiposervicio').value,
    detalleservicio: document.getElementById('modal-detalleservicio').value,
    detalleubicacion: document.getElementById('modal-detalleubicacion').value
  };

  localStorage.setItem('servicios', JSON.stringify(servicios));
  cargarServicios();

  var modal = bootstrap.Modal.getInstance(document.getElementById('selecservicio'));
  modal.hide();
}

function eliminarServicio() {
  var index = document.getElementById('selecservicio').getAttribute('data-servicio-index');
  var servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  // Eliminar el servicio del array
  servicios.splice(index, 1);

  // Guardar el array actualizado en el local storage
  localStorage.setItem('servicios', JSON.stringify(servicios));

  // Recargar la tabla
  cargarServicios();

  // Cerrar el modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('selecservicio'));
  modal.hide();
}

function actualizarContador(count) {
  var notificationElement = document.querySelector('.notification');
  notificationElement.setAttribute('data-count', count);
}

// Boton guardar Cliente

function guardarCliente() {
  // Recoger los datos del formulario
  var nombre = document.getElementById('nombre').value;
  var dniCliente = document.getElementById('dniCliente').value;
  var telefono = document.getElementById('telefono').value;
  var email = document.getElementById('email').value;
  var direccion = document.getElementById('direccion').value;
  var direccion2 = document.getElementById('direccion2').value;
  var provincia = document.getElementById('provincia').value;

  var nuevoCliente = {
      nombre: nombre,
      dniCliente: dniCliente,
      telefono: telefono,
      email: email,
      direccion: direccion,
      direccion2: direccion2,
      provincia: provincia
  };

  // Preguntar al usuario si desea guardar el cliente
  var confirmarGuardar = confirm("¿Desea guardar este cliente?");

  if (confirmarGuardar) {
    // Obtener el array de clientes del local storage o inicializarlo si no existe
    var clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
    
    // Agregar el nuevo cliente al array
    clientes.push(nuevoCliente);
    
    // Guardar el array actualizado en el local storage
    localStorage.setItem('Clientes', JSON.stringify(clientes));
    
    alert('Cliente guardado correctamente en Local Storage');

    // Limpiar los campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('dniCliente').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('direccion2').value = '';
    document.getElementById('provincia').value = '';

    // Cerrar el modal
    var modal = bootstrap.Modal.getInstance(document.getElementById('clie'));
    modal.hide();
  } else {
    alert('El cliente no ha sido guardado');
  }
}

// lista de clientes

// Cargar clientes al abrir el modal de lista de clientes
document.getElementById('listaclientes').addEventListener('click', function() {
  var clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
  cargarClientes(clientes);
  mostrarModalClientes();
});

// Función para cargar los clientes en el acordeón
function cargarClientes(clientes) {
  var accordionContainer = document.getElementById('accordionExample');
  accordionContainer.innerHTML = ''; // Limpiar contenido previo

  clientes.forEach(function(cliente, index) {
    var clienteItem = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            ${cliente.nombre}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>Nombre:</strong> ${cliente.nombre}<br>
            <strong>DNI:</strong> ${cliente.dniCliente}<br>
            <strong>Teléfono:</strong> ${cliente.telefono}<br>
            <strong>Email:</strong> ${cliente.email}<br>
            <strong>Dirección:</strong> ${cliente.direccion}<br>
            <strong>Dirección 2:</strong> ${cliente.direccion2}<br>
            <strong>Provincia:</strong> ${cliente.provincia}
            <button class="delete-button" onclick="eliminarCliente(${index})" style="color: red;">
              <svg class="delete-svgIcon" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    accordionContainer.innerHTML += clienteItem;
  });
}

// Función para eliminar un cliente
function eliminarCliente(index) {
  var clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
  clientes.splice(index, 1);
  localStorage.setItem('Clientes', JSON.stringify(clientes));
  cargarClientes(clientes);
}

// Añadir evento input al campo de búsqueda
document.getElementById('inputBuscar').addEventListener('input', function() {
  var searchText = document.getElementById('inputBuscar').value.toLowerCase();
  var clientes = JSON.parse(localStorage.getItem('Clientes')) || [];

  // Filtrar clientes que coincidan con el texto de búsqueda
  var filteredClientes = clientes.filter(function(cliente) {
    return cliente.nombre.toLowerCase().includes(searchText) ||
           cliente.dniCliente.toLowerCase().includes(searchText) ||
           cliente.telefono.toLowerCase().includes(searchText) ||
           cliente.email.toLowerCase().includes(searchText) ||
           cliente.direccion.toLowerCase().includes(searchText) ||
           cliente.direccion2.toLowerCase().includes(searchText) ||
           cliente.provincia.toLowerCase().includes(searchText);
  });

  cargarClientes(filteredClientes);
});

// Mostrar el modal de lista de clientes
function mostrarModalClientes() {
  var modal = new bootstrap.Modal(document.getElementById('listaClientesModal'));
  modal.show();
}

document.getElementById("btnFactura").addEventListener("click", function(){
  window.open("Facturacion/facturacion.html");
});
