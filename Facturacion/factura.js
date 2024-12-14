const formDetalle = document.getElementById("formDetalle");
const inputCantidad = document.getElementById("inputCantidad");
const selectDescripcion = document.getElementById("selectDescripcion");
const inputPUnitario = document.getElementById("inputPUnitario");
const inputPTotal = document.getElementById("inputPTotal");
const cuerpoTabla = document.getElementById("cuerpoTabla");

const subtotalInput = document.getElementById("subtotal");
const impuestosInput = document.getElementById("impuestos");
const totalInput = document.getElementById("total");

let arregloDetalle = [];

const calcularTotales = () => {
    let subtotal = arregloDetalle.reduce((sum, detalle) => sum + parseFloat(detalle.pTotal), 0);
    let impuestos = subtotal * 0.18; // 18% de impuestos
    let total = subtotal + impuestos;

    subtotalInput.value = subtotal.toFixed(2);
    impuestosInput.value = impuestos.toFixed(2);
    totalInput.value = total.toFixed(2);
};

const redibujarTabla = () => {
    cuerpoTabla.innerHTML = ""; // Clear the table body first

    arregloDetalle.forEach((detalle, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${detalle.cant}</td>
            <td>${detalle.descripcion}</td>
            <td>${detalle.pUnit}</td>
            <td>${detalle.pTotal}</td>`;

        let tdEliminar = document.createElement("td");
        let botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "btn-danger");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = () => {
            arregloDetalle.splice(index, 1); // Remove the item from the array
            redibujarTabla(); // Redraw the table
            calcularTotales(); // Recalculate totals
        };

        tdEliminar.appendChild(botonEliminar);
        fila.appendChild(tdEliminar);
        cuerpoTabla.appendChild(fila);
    });
};

formDetalle.onsubmit = (e) => {
    e.preventDefault();
    // Creando objeto detalle
    const objDetalle = {
        cant: inputCantidad.value,
        descripcion: selectDescripcion.options[selectDescripcion.selectedIndex].text,
        pUnit: inputPUnitario.value,
        pTotal: (inputCantidad.value * inputPUnitario.value).toFixed(2)
    };
    arregloDetalle.push(objDetalle);

     // Limpiar el formulario
     formDetalle.reset();
    redibujarTabla();
    calcularTotales();
};





function mostrarServiciosAlert() {
    var servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    if (servicios.length === 0) {
      alert('No hay servicios almacenados.');
      return;
    }
  
    var listaServicios = 'Seleccione un servicio:\n';
    servicios.forEach(function(servicio, index) {
      listaServicios += `${index + 1}: ${servicio.cliente} - ${servicio.tiposervicio}\n`;
    });
  
    var seleccion = prompt(listaServicios);
    if (seleccion) {
      var servicioIndex = parseInt(seleccion) - 1;
      if (servicioIndex >= 0 && servicioIndex < servicios.length) {
        alert(`Servicio seleccionado:\nCliente: ${servicios[servicioIndex].cliente}\nDNI: ${servicios[servicioIndex].dni}\nTipo de Servicio: ${servicios[servicioIndex].tiposervicio}\nDetalle Servicio: ${servicios[servicioIndex].detalleservicio}\nDetalle Ubicación: ${servicios[servicioIndex].detalleubicacion}`);
      } else {
        alert('Selección no válida.');
      }
    }
  }
  
  document.getElementById('mostrarServiciosBtn').addEventListener('click', mostrarServiciosAlert);
  


  function mostrarServiciosModal() {
    var servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    var serviciosList = document.getElementById('serviciosList');
    serviciosList.innerHTML = ''; // Limpiar lista previa
  
    if (servicios.length === 0) {
      serviciosList.innerHTML = '<li class="list-group-item">No hay servicios almacenados.</li>';
      return;
    }
  
    servicios.forEach(function(servicio, index) {
      var listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerText = `${servicio.cliente} - ${servicio.tiposervicio}`;
      listItem.setAttribute('data-index', index);
      listItem.addEventListener('click', function() {
        var servicioIndex = this.getAttribute('data-index');
        var servicioSeleccionado = servicios[servicioIndex];
        alert(`Servicio seleccionado:\nCliente: ${servicioSeleccionado.cliente}\nDNI: ${servicioSeleccionado.dni}\nTipo de Servicio: ${servicioSeleccionado.tiposervicio}\nDetalle Servicio: ${servicioSeleccionado.detalleservicio}\nDetalle Ubicación: ${servicioSeleccionado.detalleubicacion}`);
      });
      serviciosList.appendChild(listItem);
    });
  }
  
  document.getElementById('mostrarServiciosBtn').addEventListener('click', mostrarServiciosModal);
    