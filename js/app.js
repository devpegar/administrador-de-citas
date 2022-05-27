const d = document;
// Campos del formulario
const mascotaInput = d.querySelector("#mascota");
const propietarioInput = d.querySelector("#propietario");
const telefonoInput = d.querySelector("#telefono");
const fechaInput = d.querySelector("#fecha");
const horaInput = d.querySelector("#hora");
const sintomasInput = d.querySelector("#sintomas");
// Formulario
const formulario = d.querySelector("#nueva-cita");
// Contenedor de las citas
const contenedorCitas = d.querySelector("#citas");

let editando;

class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }
  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    // Crear el div para mostrar mensaje de alerta
    const divMensaje = d.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agregar clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Agregar al DOM
    d.querySelector("#contenido").insertBefore(
      divMensaje,
      d.querySelector(".agregar-cita")
    );

    // Quitar alerta despues de pasado 3 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();
    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = d.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      // Scripting de los elementos de la cita
      const mascotaParrafo = d.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = d.createElement("p");
      propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario:</span> ${propietario}
      `;
      const telefonoParrafo = d.createElement("p");
      telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Teléfono:</span> ${telefono}
      `;
      const fechaParrafo = d.createElement("p");
      fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;
      const horaParrafo = d.createElement("p");
      horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora:</span> ${hora}
      `;
      const sintomasParrafo = d.createElement("p");
      sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
      `;
      // Boton para eliminar cita
      const btnEliminar = d.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = `
      Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
      `;
      btnEliminar.onclick = () => eliminarCita(id);

      // Botón editar cita
      const btnEditar = d.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML = `
      Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
      `;
      btnEditar.onclick = () => cargarEdicion(cita);

      // Agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      // Agregar divCita al HTML
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const administrarCitas = new Citas();
const ui = new UI();
// Eventos
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}
// Objeto con datos de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};
// Funcion para llenar el objeto con los datos de los campos del formulario
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault();

  // Extraer la información del objeto de citas
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (editando) {
    ui.imprimirAlerta("La cita ha sido actualizada correctamente");

    // Pasar el objeto de la cita a edicion
    administrarCitas.editarCita({ ...citaObj });

    // Regresar el texto del boton a su estado original
    formulario.querySelector('button[type="submit"]').textContent =
      "Crear cita";

    // Quitar modo edicion
    editando = false;
  } else {
    // Generar un id unico
    citaObj.id = Date.now();

    // Creando nueva cita
    administrarCitas.agregarCita({ ...citaObj });

    // Mensaje de agregado correctamente
    ui.imprimirAlerta("La cita ha sido agregada correctamente");
  }

  // Reiniciar objeto
  reiniciarObjeto(citaObj);

  // Reinicia el formulario
  formulario.reset();

  // Mostrar la cita en el HTML
  ui.imprimirCitas(administrarCitas);
}

// Reiniciar objeto
function reiniciarObjeto(obj) {
  for (const p in obj) {
    obj[p] = "";
  }
}

function eliminarCita(id) {
  // Eliminar la cita
  administrarCitas.eliminarCita(id);

  // Imprimir mensaje
  ui.imprimirAlerta("La cita ha sido eliminada correctamente");

  // Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas } = cita;

  // Llenar input
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // LLenar el objeto
  for (const c in cita) {
    for (const o in citaObj) {
      if (c === o) {
        citaObj[o] = cita[c];
      }
    }
  }
  // Cambiar el texto del boton
  formulario.querySelector('button[type="submit"]').textContent = "Actualizar";

  editando = true;
}
