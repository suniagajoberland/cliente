class Contacto {
  constructor(nombre, apellido, telefono) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
  }

  generarWhatsAppLink() {
    const mensaje = `Hola ${this.nombre} ${this.apellido}, seguimos a la orden por acá. Feliz día.`;
    return `https://wa.me/58${this.telefono}?text=${encodeURIComponent(
      mensaje
    )}`;
  }

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

let contactos = [];
let currentPage = 1;
const contactsPerPage = 100; // 100 contactos por página

document.getElementById("registrar").addEventListener("click", function () {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;

  const nuevoContacto = new Contacto(nombre, apellido, telefono);
  contactos.push(nuevoContacto);
  mostrarContactos();
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("telefono").value = "";
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
      button.classList.add("active");
    }

    paginacion.appendChild(button);
  }
}

// Registro inicial de contactos de ejemplo (opcional)
contactos.push(new Contacto("Juan", "Pérez", "4143693311"));
contactos.push(new Contacto("María", "Gómez", "4143693311"));
contactos.push(new Contacto("Carlos", "Rodríguez", "4143693311"));
contactos.push(new Contacto("Ana", "Martínez", "4143693311"));
contactos.push(new Contacto("Luis", "Fernández", "4143693311"));
// Añade más contactos según sea necesario
mostrarContactos();
