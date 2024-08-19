const colores = ["Amarillo", "Naranja", "Azul"];
let nombreUsuario = "";
let edadUsuario = 0;
let lugarDeOrigen = "";
let colorFavorito = "";

function pedirNombre() {
    nombreUsuario = prompt("¿Cómo te llamas?");
    if (!nombreUsuario || nombreUsuario.trim() === "") {
        nombreUsuario = "Desconocido";
    }
}

function pedirEdad() {
    edadUsuario = parseInt(prompt("¿Cuántos años tenés?"), 10);
    if (isNaN(edadUsuario) || edadUsuario <= 0) {
        edadUsuario = 18; 
    }
}

function pedirLugarDeOrigen() {
    lugarDeOrigen = prompt("¿De dónde sos?");
    if (!lugarDeOrigen || lugarDeOrigen.trim() === "") {
        lugarDeOrigen = "Desconocido";
    }
}

function pedirColorFavorito() {
    let seleccion = prompt(`¿Cuál es tu color favorito? Elige entre:\n${colores.join("\n")}`);
    if (colores.includes(seleccion.charAt(0).toUpperCase() + seleccion.slice(1).toLowerCase())) {
        colorFavorito = seleccion;
    } else {
        colorFavorito = "Otro";
    }
}

function mostrarInformacion() {
    console.log("Información del Usuario:");
    console.log(`Nombre: ${nombreUsuario}`);
    console.log(`Edad: ${edadUsuario}`);
    console.log(`Lugar de origen: ${lugarDeOrigen}`);
    console.log(`Color favorito: ${colorFavorito}`);
    
    if (edadUsuario >= 18) {
        console.log(`${nombreUsuario}, sos mayor de edad.`);
    } else {
        console.log(`${nombreUsuario}, sos menor de edad.`);
    }
}

function mostrarConfirmacion() {
    const confirmacion = confirm("¿Querés continuar?");
    console.log(confirmacion ? "Elegiste continuar." : "Elegiste cancelar.");
}

pedirNombre();
pedirEdad();
pedirLugarDeOrigen();
pedirColorFavorito();
mostrarInformacion();
mostrarConfirmacion();

