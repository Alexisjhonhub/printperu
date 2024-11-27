import { GoogleGenerativeAI } from "@google/generative-ai";

const clave = "AIzaSyCDARXDULl2vfrJKznxJ0JPmmOQKX_lGkc";

const genAI = new GoogleGenerativeAI(clave);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const consultaInput = document.querySelector("#consulta");
const botonConsulta = document.querySelector("#botonConsulta");
const resultadoConsulta = document.querySelector("#resultadoConsulta");

botonConsulta.addEventListener("click", manejarConsulta);

consultaInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    manejarConsulta();
  }
});

async function manejarConsulta() {
  const consulta = consultaInput.value.trim();

  if (!consulta) {
    resultadoConsulta.innerHTML = "Por favor, ingresa una consulta válida.";
    return;
  }

  desactivarBoton();

  try {
    const result = await model.generateContent(consulta);
    const response = await result.response;
    const text = await response.text();

    let respuesta = `<div class="respuesta">${text}</div>`;
    respuesta += `<br><strong>Ofrecemos los siguientes servicios:</strong>`;
    respuesta += `
      <ul>
        <li><strong>Branding</strong></li>
        <li><strong>Identidad Corporativa</strong></li>
        <li><strong>Imprenta Digital</strong></li>
        <li><strong>Diseño Gráfico</strong></li>
        <li><strong>Merchandising</strong></li>
        <li><strong>Diseño 3D</strong></li>
      </ul>`;
    respuesta += `<br><div>¿Te gustaría conversar con un asesor personal? Haz clic en el siguiente botón:</div>`;
    respuesta += `<a class="link-asesor" id="linkAsesor" href="#">Contactar con asesor</a>`;

    resultadoConsulta.innerHTML = respuesta;

    document.querySelector("#linkAsesor").addEventListener("click", redirigirAsesor);
  } catch (error) {
    console.error("Error en la consulta:", error);
    resultadoConsulta.innerHTML = "Hubo un problema con la consulta. Inténtalo de nuevo.";
  }

  consultaInput.value = "";
  activarBoton();
}

function redirigirAsesor() {
  const nombre = prompt("Por favor, ingresa tu nombre:");
  const celular = prompt("Por favor, ingresa tu número de celular:");

  if (nombre && celular) {
    const whatsappURL = `https://wa.me/51935785939?text=Hola, soy ${encodeURIComponent(nombre)} y mi número es ${encodeURIComponent(celular)}. Estoy interesado en los servicios de C&S PRINT PERÚ.`;
    window.open(whatsappURL, "_blank");
  } else {
    alert("Es necesario proporcionar tu nombre y celular para continuar.");
  }
}

function desactivarBoton() {
  botonConsulta.disabled = true;
  botonConsulta.innerText = "Consultando...";
}

function activarBoton() {
  botonConsulta.disabled = false;
  botonConsulta.innerText = "Consultar";
}
