
// Inicializa el formulario de login y maneja la validación de usuario.

function initializeLoginForm() {

  const loginForm = document.getElementById('loginForm');  // Sacar el elemento FORM

  const errorMessage = document.getElementById('error-message'); // Sacar el elemento errorMessage



  const validUser = {

      username: 'admin',

      password: 'password123',

  };



  loginForm.addEventListener('submit', (event) => { // Añadir una escucha en el evento SUBMIT del formulario

      event.preventDefault();



      const username = document.getElementById('username').value; // Sacar el value de username

      const password = document.getElementById('password').value; // Sacar el value de password



      validateLogin(username, password, validUser) 

          ? handleLoginSuccess(username) 

          : displayError(errorMessage, 'Usuario o contraseña incorrectos.');

  });

}



// Valida el login del usuario comparando los datos ingresados con los datos correctos.

// username (string): Nombre de usuario ingresado.

// password (string): Contraseña ingresada.

// validUser (Object): Objeto con los datos de usuario y contraseña válidos.

// Retorna true si los datos coinciden, false en caso contrario.

function validateLogin(username, password, validUser) {

  return username === validUser.username && password === validUser.password;

}



// Muestra un mensaje de error.

// errorElement (HTMLElement): Elemento HTML donde se muestra el error.

// message (string): Mensaje a mostrar.

function displayError(errorElement, message) {

  errorElement.textContent = message;

  errorElement.style.display = 'block';  // Mostramos el mensaje de error solo cuando hay un error

}



// Maneja el caso de éxito en el login.

// username (string): Nombre del usuario logueado.

function handleLoginSuccess(username) {

  // Guardamos el estado de login en localStorage

  localStorage.setItem('loggedIn', 'true');

  localStorage.setItem('username', username);

  // Redirigir a una página de bienvenida o dashboard si fuera necesario

  alert(`¡Bienvenido, ${username}!`);

  window.location.href = "dashboard.html"; // Cambiar a la ruta deseada después de iniciar sesión

}