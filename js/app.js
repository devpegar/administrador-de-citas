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

class Citas {
  constructor() {
    this.citas = [];
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
}
