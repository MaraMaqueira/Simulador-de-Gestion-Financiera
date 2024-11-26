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
