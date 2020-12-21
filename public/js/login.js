var elementoNombre = document.getElementById('nombre-usuario');
var elementoSala = document.getElementById('sala-chat');
var elementoEmail = document.getElementById('email');
var elementoClave = document.getElementById('clave');



const login = async() => {

    var login = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: elementoEmail.value,
            password: elementoClave.value
        })
    });

    var data = await login.json();

    if (data.ok) {
        var nombre = elementoNombre.value;
        var sala = elementoSala.value;

        window.location.href = `chat.html?nombre=${nombre}&sala=${sala}`;
    } else {
        console.log('Todo mal compae');
    }

}