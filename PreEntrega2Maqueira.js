/////////////////////////INICIO LOGIN//////////////////////

function register(event) {
    event.preventDefault();

    const nombredeusuario = document.getElementById('nombredeusuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    if (!nombredeusuario || !contraseña) {
        document.getElementById('error').textContent = "Por favor, complete todos los campos.";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some(u => u.nombredeusuario === nombredeusuario)) {
        document.getElementById('error').textContent = "Ya existe ese nombre de usuario.";
        return;
    }

    usuarios.push({ nombredeusuario, contraseña });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Registro exitoso.");
    window.location.href = "login.html"; 
}

function login(event) {
    event.preventDefault();
    
    const nombredeusuario = document.getElementById('nombredeusuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();


    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


    const usuarioEncontrado = usuarios.find(u => u.nombredeusuario === nombredeusuario && u.contraseña === contraseña);

    if (usuarioEncontrado) {

        localStorage.setItem('nombreUsuario', nombredeusuario);

        alert("Inicio de sesión exitoso.");
        window.location.href = "dashboard.html"; 
    } else {
        document.getElementById('error').textContent = "Usuario o contraseña incorrectos.";
    }
}

function iniciarsesion() {
    window.location.href = "login.html"; 
}

function registerRedirect() {
    window.location.href = "registro_cliente.html";
}

/////////////////////FINAL LOGIN////////////////////////////

let ingresos = [
    { categoria: 'Salario', descripcion: 'Ingreso mensual', monto: 1500, fecha: '01/10/2024' },
    { categoria: 'Freelance', descripcion: 'Trabajo extra', monto: 500, fecha: '15/10/2024' },
];

let gastos = [
    { categoria: 'Comida', descripcion: 'Compra de supermercado', monto: 200, fecha: '02/10/2024' },
    { categoria: 'Transporte', descripcion: 'Pase del bus', monto: 50, fecha: '10/10/2024' },
];


function agregaringresos() {
    let categoria = prompt("Ingrese la categoría:");
    let descripcion = prompt("Ingrese la descripción:");
    let monto = parseFloat(prompt("Ingrese el monto:"));
    let fecha = prompt("Ingrese la fecha (dd/mm/yyyy):");

    ingresos.push({ categoria, descripcion, monto, fecha });
    mostrarIngresos();
}

function agregargastos() {
    let categoria = prompt("Ingrese la categoría:");
    let descripcion = prompt("Ingrese la descripción:");
    let monto = parseFloat(prompt("Ingrese el monto:"));
    let fecha = prompt("Ingrese la fecha (dd/mm/yyyy):");

    gastos.push({ categoria, descripcion, monto, fecha });
    mostrarGastos();
}

// Funciones para eliminar ingresos y gastos
function eliminaringresos() {
    let categoria = prompt("Ingrese la categoría a eliminar:");
    ingresos = ingresos.filter(ingreso => ingreso.categoria !== categoria);
    mostrarIngresos();
}

function eliminargastos() {
    let categoria = prompt("Ingrese la categoría a eliminar:");
    gastos = gastos.filter(gasto => gasto.categoria !== categoria);
    mostrarGastos();
}

function editaringresos() {
    let categoria = prompt("Ingrese la categoría a editar:");
    let ingreso = ingresos.find(ingreso => ingreso.categoria === categoria);
    
    if (ingreso) {
        ingreso.descripcion = prompt("Ingrese la nueva descripción:", ingreso.descripcion);
        ingreso.monto = parseFloat(prompt("Ingrese el nuevo monto:", ingreso.monto));
        ingreso.fecha = prompt("Ingrese la nueva fecha (dd/mm/yyyy):", ingreso.fecha);
        mostrarIngresos();
    } else {
        alert("Ingreso no encontrado.");
    }
}

function editargastos() {
    let categoria = prompt("Ingrese la categoría a editar:");
    let gasto = gastos.find(gasto => gasto.categoria === categoria);
    
    if (gasto) {
        gasto.descripcion = prompt("Ingrese la nueva descripción:", gasto.descripcion);
        gasto.monto = parseFloat(prompt("Ingrese el nuevo monto:", gasto.monto));
        gasto.fecha = prompt("Ingrese la nueva fecha (dd/mm/yyyy):", gasto.fecha);
        mostrarGastos();
    } else {
        alert("Gasto no encontrado.");
    }
}


function mostrarIngresos() {
    const tbody = document.getElementById('tbody-ingresos');
    tbody.innerHTML = ''; 

    ingresos.forEach(ingreso => {
        const row = `<tr>
            <td>${ingreso.categoria}</td>
            <td>${ingreso.descripcion}</td>
            <td>${ingreso.monto}</td>
            <td>${ingreso.fecha}</td>
        </tr>`;
        tbody.innerHTML += row; 
    });
}

function mostrarGastos() {
    const tbody = document.getElementById('tbody-gastos');
    tbody.innerHTML = '';

    gastos.forEach(gasto => {
        const row = `<tr>
            <td>${gasto.categoria}</td>
            <td>${gasto.descripcion}</td>
            <td>${gasto.monto}</td>
            <td>${gasto.fecha}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}


document.addEventListener("DOMContentLoaded", function() {
    mostrarIngresos();
    mostrarGastos();
});