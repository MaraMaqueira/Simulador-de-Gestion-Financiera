// LOGIN Y REGISTRO

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


// INGRESOS Y CATEGORIAS
let categoria = [];
let ingresos = [];

function crearCategoria() {
    const nombrecategoria = prompt('Ingrese el nombre de la categoría:');
    if (nombrecategoria === null) {
        alert('No se puede crear una categoría sin nombre.');
        return;
    }
    categoria.push(nombrecategoria);
    alert(`Categoría '${nombrecategoria}' creada.`);
}

function agregaringresos() {
    const buscarcategoria = prompt('Ingrese la categoría del ingreso:');
    const descripcion = prompt('Ingrese la descripción del ingreso:');
    const monto = prompt('Ingrese el monto del ingreso:');
    const fecha = prompt('Ingrese la fecha del ingreso (DD/MM/AAAA):');

    ingresos.push({ Categoria: buscarcategoria, Descripcion: descripcion, Monto: monto, Fecha: fecha });
    alert('Ingreso añadido exitosamente.');

    actualizarTablaIngresos(); 
}


function actualizarTablaIngresos() {
    const tablaIngresos = document.getElementById('tablaIngresos').getElementsByTagName('tbody')[0];
    tablaIngresos.innerHTML = ''; 
    
    ingresos.forEach(entry => {
        const row = tablaIngresos.insertRow();
        row.insertCell(0).textContent = entry.Categoria;
        row.insertCell(1).textContent = entry.Descripcion;
        row.insertCell(2).textContent = entry.Monto;
        row.insertCell(3).textContent = entry.Fecha;
    });
}

function verIngresos() {
    if (ingresos.length === 0) {
        alert('No hay ingresos registrados.');
        return;
    }

    let visualizarIngresos = 'Ingresos:\n';
    ingresos.forEach((entry, index) => {
        visualizarIngresos += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(visualizarIngresos);
}
// BUSQUEDA DE INGRESOS
function buscarIngresosPorNombre() {
    const nombre = prompt('Ingrese el nombre o descripción del ingreso a buscar:');
    const resultados = ingresos.filter(entry => entry.Descripcion.toLowerCase().includes(nombre.toLowerCase()));

    if (resultados.length === 0) {
        alert('No se encontraron ingresos con ese nombre.');
        return;
    }

    let resultadosBusqueda = 'Resultados de búsqueda por nombre:\n';
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

function filtrarIngresosPorCategoria() {
    const categoriaBuscada = prompt('Ingrese la categoría de ingresos a filtrar:');
    const resultados = ingresos.filter(entry => entry.Categoria.toLowerCase() === categoriaBuscada.toLowerCase());

    if (resultados.length === 0) {
        alert('No se encontraron ingresos en esa categoría.');
        return;
    }

    let resultadosBusqueda = `Ingresos en la categoría '${categoriaBuscada}':\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

function filtrarIngresosPorFecha() {
    const fechaBuscada = prompt('Ingrese la fecha de los ingresos a buscar (DD/MM/AAAA):');
    const resultados = ingresos.filter(entry => entry.Fecha === fechaBuscada);

    if (resultados.length === 0) {
        alert('No se encontraron ingresos en esa fecha.');
        return;
    }

    let resultadosBusqueda = `Ingresos en la fecha '${fechaBuscada}':\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

// INGRESOS DEL MES
function ingresosDelMesActual() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // Los meses en JavaScript son 0-11
    const añoActual = fechaActual.getFullYear();

    const resultados = ingresos.filter(entry => {
        const [dia, mes, año] = entry.Fecha.split('/');
        return parseInt(mes) === mesActual && parseInt(año) === añoActual;
    });

    if (resultados.length === 0) {
        alert('No se encontraron ingresos en el mes actual.');
        return;
    }

    let resultadosBusqueda = `Ingresos en el mes actual (${mesActual}/${añoActual}):\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

function ingresosDesdeHasta() {
    const fechaInicio = prompt('Ingrese la fecha de inicio (DD/MM/AAAA):');
    const fechaFinal = prompt('Ingrese la fecha final (DD/MM/AAAA):');

    if (!fechaInicio || !fechaFinal) {
        alert('Debe ingresar tanto una fecha de inicio como una fecha final.');
        return;
    }

    const [diaInicio, mesInicio, añoInicio] = fechaInicio.split('/');
    const [diaFinal, mesFinal, añoFinal] = fechaFinal.split('/');

    const inicio = new Date(`${añoInicio}-${mesInicio}-${diaInicio}`);
    const final = new Date(`${añoFinal}-${mesFinal}-${diaFinal}`);

    const resultados = ingresos.filter(entry => {
        const [dia, mes, año] = entry.Fecha.split('/');
        const fechaIngreso = new Date(`${año}-${mes}-${dia}`);
        return fechaIngreso >= inicio && fechaIngreso <= final;
    });

    if (resultados.length === 0) {
        alert('No se encontraron ingresos en el rango de fechas especificado.');
        return;
    }

    let resultadosBusqueda = `Ingresos desde ${fechaInicio} hasta ${fechaFinal}:\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}


// GASTOS Y CATEGORIAS
let categoriasGastos = [];
let gastos = [];

function crearCategoriaGastos() {
    const nombrecategoria = prompt('Ingrese el nombre de la categoría de gastos:');
    if (nombrecategoria === null) {
        alert('No se puede crear una categoría sin nombre.');
        return;
    }
    categoriasGastos.push(nombrecategoria);
    alert(`Categoría de gastos '${nombrecategoria}' creada.`);
}

function agregargastos() {
    const buscarcategoria = prompt('Ingrese la categoría del gasto:');
    if (!categoriasGastos.includes(buscarcategoria)) {
        alert('Categoría no existe. Primero crea la categoría.');
        return;
    }

    const descripcion = prompt('Ingrese la descripción del gasto:');
    const monto = prompt('Ingrese el monto del gasto:');
    const fecha = prompt('Ingrese la fecha del gasto (DD/MM/AAAA):');

    gastos.push({ Categoria: buscarcategoria, Descripcion: descripcion, Monto: monto, Fecha: fecha });
    alert('Gasto añadido exitosamente.');

    actualizarTablaGastos(); 
}

function actualizarTablaGastos() {
    const tablaGastos = document.getElementById('tablaGastos').getElementsByTagName('tbody')[0];
    tablaGastos.innerHTML = ''; 

    gastos.forEach(entry => {
        const row = tablaGastos.insertRow();
        row.insertCell(0).textContent = entry.Categoria;
        row.insertCell(1).textContent = entry.Descripcion;
        row.insertCell(2).textContent = entry.Monto;
        row.insertCell(3).textContent = entry.Fecha;
    });
}


    const descripcion = prompt('Ingrese la descripción del gasto:');
    const monto = prompt('Ingrese el monto del gasto:');
    const fecha = prompt('Ingrese la fecha del gasto (DD/MM/AAAA):');

    gastos.push({ Categoria: buscarcategoria, Descripcion: descripcion, Monto: monto, Fecha: fecha });
    alert('Gasto añadido exitosamente.');


function verGastos() {
    if (gastos.length === 0) {
        alert('No hay gastos registrados.');
        return;
    }

    let visualizarGastos = 'Gastos:\n';
    gastos.forEach((entry, index) => {
        visualizarGastos += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(visualizarGastos);
}

// BUSQUEDA DE GASTOS
function buscarGastosPorNombre() {
    const nombre = prompt('Ingrese el nombre o descripción del gasto a buscar:');
    const resultados = gastos.filter(entry => entry.Descripcion.toLowerCase().includes(nombre.toLowerCase()));

    if (resultados.length === 0) {
        alert('No se encontraron gastos con ese nombre.');
        return;
    }

    let resultadosBusqueda = 'Resultados de búsqueda por nombre:\n';
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

function filtrarGastosPorCategoria() {
    const categoriaBuscada = prompt('Ingrese la categoría de gastos a filtrar:');
    const resultados = gastos.filter(entry => entry.Categoria.toLowerCase() === categoriaBuscada.toLowerCase());

    if (resultados.length === 0) {
        alert('No se encontraron gastos en esa categoría.');
        return;
    }

    let resultadosBusqueda = `Gastos en la categoría '${categoriaBuscada}':\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

function filtrarGastosPorFecha() {
    const fechaBuscada = prompt('Ingrese la fecha de los gastos a buscar (DD/MM/AAAA):');
    const resultados = gastos.filter(entry => entry.Fecha === fechaBuscada);

    if (resultados.length === 0) {
        alert('No se encontraron gastos en esa fecha.');
        return;
    }

    let resultadosBusqueda = `Gastos en la fecha '${fechaBuscada}':\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

function gastosDelMesActual() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; 
    const añoActual = fechaActual.getFullYear();

    const resultados = gastos.filter(entry => {
        const [dia, mes, año] = entry.Fecha.split('/');
        return parseInt(mes) === mesActual && parseInt(año) === añoActual;
    });

    if (resultados.length === 0) {
        alert('No se encontraron gastos en el mes actual.');
        return;
    }

    let resultadosBusqueda = `Gastos en el mes actual (${mesActual}/${añoActual}):\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}


function gastosDesdeHasta() {
    const fechaInicio = prompt('Ingrese la fecha de inicio (DD/MM/AAAA):');
    const fechaFinal = prompt('Ingrese la fecha final (DD/MM/AAAA):');

    if (!fechaInicio || !fechaFinal) {
        alert('Debe ingresar tanto una fecha de inicio como una fecha final.');
        return;
    }

    const [diaInicio, mesInicio, añoInicio] = fechaInicio.split('/');
    const [diaFinal, mesFinal, añoFinal] = fechaFinal.split('/');

    const inicio = new Date(`${añoInicio}-${mesInicio}-${diaInicio}`);
    const final = new Date(`${añoFinal}-${mesFinal}-${diaFinal}`);

    const resultados = gastos.filter(entry => {
        const [dia, mes, año] = entry.Fecha.split('/');
        const fechaGasto = new Date(`${año}-${mes}-${dia}`);
        return fechaGasto >= inicio && fechaGasto <= final;
    });

    if (resultados.length === 0) {
        alert('No se encontraron gastos en el rango de fechas especificado.');
        return;
    }

    let resultadosBusqueda = `Gastos desde ${fechaInicio} hasta ${fechaFinal}:\n`;
    resultados.forEach((entry, index) => {
        resultadosBusqueda += `${index + 1}. Categoría: ${entry.Categoria}, Descripción: ${entry.Descripcion}, Monto: ${entry.Monto}, Fecha: ${entry.Fecha}\n`;
    });

    alert(resultadosBusqueda);
}

//PRESUPUESTO
function presupuesto() {
    const categoriaPresupuesto = prompt('Ingrese la categoría para el presupuesto:');
    if (!categoriasGastos.includes(categoriaPresupuesto)) {
        alert('La categoría no existe. Primero crea la categoría.');
        return;
    }

    const tipoPeriodo = prompt('Ingrese el tipo de tiempo (semanal, mensual o anual):').toLowerCase();
    let presupuestoInicial = parseFloat(prompt('Ingrese el monto del presupuesto:'));

    if (isNaN(presupuestoInicial) || presupuestoInicial <= 0) {
        alert('El presupuesto debe ser un número válido mayor que 0.');
        return;
    }

    const fechaActual = new Date();

    const gastosFiltrados = gastos.filter(entry => {
        const [dia, mes, año] = entry.Fecha.split('/');
        const fechaGasto = new Date(`${año}-${mes}-${dia}`);

        if (entry.Categoria === categoriaPresupuesto) {
            if (tipoPeriodo === 'semanal') {
                const fechaInicioSemana = new Date(fechaActual.setDate(fechaActual.getDate() - fechaActual.getDay())); 
                return fechaGasto >= fechaInicioSemana;
            } else if (tipoPeriodo === 'mensual') {
                return fechaGasto.getMonth() === fechaActual.getMonth() && fechaGasto.getFullYear() === fechaActual.getFullYear();
            } else if (tipoPeriodo === 'anual') {
                return fechaGasto.getFullYear() === fechaActual.getFullYear();
            }
        }
        return false;
    });

    let totalGastos = gastosFiltrados.reduce((acc, entry) => acc + parseFloat(entry.Monto), 0);

    presupuestoInicial -= totalGastos;

    if (presupuestoInicial < 0) {
        alert(`Has excedido tu presupuesto en la categoría '${categoriaPresupuesto}' durante el período '${tipoPeriodo}'. El total excedido es: $${Math.abs(presupuestoInicial)}`);
    } else {
        alert(`Te queda $${presupuestoInicial} en tu presupuesto para la categoría '${categoriaPresupuesto}' durante el período '${tipoPeriodo}'.`);
    }
}



//AHORROS
let ahorros = []; 

function guardarAhorro() {
    const categoriaAhorro = prompt('Ingrese la categoría de ahorro:');
    if (categoriaAhorro === null || categoriaAhorro.trim() === "") {
        alert('Debe ingresar una categoría válida para el ahorro.');
        return;
    }

    const montoAhorro = parseFloat(prompt('Ingrese el monto a ahorrar:'));
    if (isNaN(montoAhorro) || montoAhorro <= 0) {
        alert('El monto de ahorro debe ser un número mayor que 0.');
        return;
    }

    const fechaAhorro = prompt('Ingrese la fecha del ahorro (DD/MM/AAAA):');
    if (!fechaAhorro) {
        alert('Debe ingresar una fecha válida.');
        return;
    }

    ahorros.push({ Categoria: categoriaAhorro, Monto: montoAhorro, Fecha: fechaAhorro });
    alert(`Ahorro de $${montoAhorro} en la categoría '${categoriaAhorro}' guardado exitosamente.`);
}

let objetivos = []; 
function establecerObjetivo() {
    const categoriaObjetivo = prompt('Ingrese la categoría del objetivo de ahorro:');
    if (categoriaObjetivo === null || categoriaObjetivo.trim() === "") {
        alert('Debe ingresar una categoría válida para el objetivo.');
        return;
    }

    const montoObjetivo = parseFloat(prompt('Ingrese el monto objetivo a alcanzar:'));
    if (isNaN(montoObjetivo) || montoObjetivo <= 0) {
        alert('El monto objetivo debe ser un número mayor que 0.');
        return;
    }

    objetivos.push({ Categoria: categoriaObjetivo, MontoObjetivo: montoObjetivo });
    alert(`Objetivo de ahorro de $${montoObjetivo} establecido en la categoría '${categoriaObjetivo}'.`);
}

function compararAhorrosConObjetivo() {
    const categoria = prompt('Ingrese la categoría de ahorro que desea comparar:');
    const totalAhorro = ahorros
        .filter(a => a.Categoria.toLowerCase() === categoria.toLowerCase())
        .reduce((acc, curr) => acc + curr.Monto, 0);

    const objetivo = objetivos.find(o => o.Categoria.toLowerCase() === categoria.toLowerCase());

    if (!objetivo) {
        alert('No se encontró un objetivo establecido para esa categoría.');
        return;
    }

    alert(`Total ahorrado en la categoría '${categoria}': $${totalAhorro}\nObjetivo: $${objetivo.MontoObjetivo}`);

    if (totalAhorro >= objetivo.MontoObjetivo) {
        alert(`¡Felicidades! Has alcanzado o superado tu objetivo de ahorro de $${objetivo.MontoObjetivo}.`);
    } else {
        const falta = objetivo.MontoObjetivo - totalAhorro;
        alert(`Aún te falta $${falta.toFixed(2)} para alcanzar tu objetivo.`);
    }
}

