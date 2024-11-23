class Contacto {
  constructor(nombre, apellido, telefono, correo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
  }

  // Método para generar el enlace de WhatsApp con un mensaje personalizado
  generarWhatsAppLink() {
    const mensaje = `Hola ${this.nombre} ${this.apellido}, esta es una prueba, probando 1 2 3.`;
    return `https://wa\.me/58${this.telefono}?text=${encodeURIComponent(
      mensaje
    )}`;
  }

  // Método para mostrar la información del contacto con el enlace de WhatsApp
  mostrarContacto() {
    return ` 
            <div class="contacto"> 
                <p><strong>Nombre:</strong> ${this.nombre} ${this.apellido}</p> 
                <p><strong>Teléfono:</strong> <a href="${this.generarWhatsAppLink()}" target="_blank">${
      this.telefono
    }</a></p> 
            </div> 
        `;
  }
}

// Crear un arreglo para almacenar los contactos
let contactos = [];
let currentPage = 1;
const contactsPerPage = 60; // 10 filas * 6 columnas = 60 contactos por página

// Registrar 5 contactos
contactos.push(new Contacto("Juan", "Pérez", "1234567890"));
contactos.push(new Contacto("María", "Gómez", "2345678901"));
contactos.push(new Contacto("María", "Gómez", "2345678901"));
contactos.push(new Contacto("María", "Gómez", "2345678901"));

// Mostrar la información de los contactos en el documento HTML
const listaContactos = document.getElementById("listaContactos");
contactos.forEach((contacto) => {
  listaContactos.innerHTML += contacto.mostrarContacto();
});

function mostrarContactos() {
  const listaContactos = document.getElementById("listaContactos");
  listaContactos.innerHTML = "";
  const startIndex = (currentPage - 1) * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const contactosPagina = contactos.slice(startIndex, endIndex);

  contactosPagina.forEach((contacto) => {
    listaContactos.innerHTML += contacto.mostrarContacto();
  });

  mostrarPaginacion();
}

function mostrarPaginacion() {
  const paginacion = document.getElementById("paginacion");
  paginacion.innerHTML = "";
  const totalPages = Math.ceil(contactos.length / contactsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      currentPage = i;
      mostrarContactos();
    });

    if (i === currentPage) {
      button.style.backgroundColor = "#45a049";
    }

    paginacion.appendChild(button);
  }
}
