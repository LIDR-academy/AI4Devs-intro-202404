
User
Hola, Me puedes crear una página en html que tenga el titulo reverse string abajo de este título tenga una caja de texto y debajo de esta tenga un boton en color azul con el texto Reverse y un icono de refrescar, al cual dar clic use un archivo javascript que dentro tenga una funcion la cual reciba un parametro string y devuelva el texto a la inversa, y este resultado lo muestre en la página html debajo del boton en negrilla, aparte tmb le puedes incluir debajo del resultado otro boton para copiar al portapapeles la salida obtenida este boton dejalo en color gris y con un icono de pegar y puedes agregarle validaciones sobre la caja de texto para no permitir hacer clic en reverse si no se tiene texto escrito, y en el alert mostrar el texto copiado en el portapapeles por fa.

ChatGPT
Claro, aquí tienes el código HTML para crear la página solicitada:

html
Copy code
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reverse String</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  .container {
    text-align: center;
  }
  input[type="text"] {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
  }
  .blue {
    background-color: #007bff;
  }
  .gray {
    background-color: #808080;
  }
</style>
</head>
<body>

<div class="container">
  <h1>Reverse String</h1>
  <input type="text" id="inputString" placeholder="Ingrese un texto">
  <button class="blue" onclick="reverseString()"><i class="fas fa-sync-alt"></i> Reverse</button>
  <p id="result"></p>
  <button class="gray" onclick="copyToClipboard()"><i class="fas fa-clipboard"></i> Copiar al portapapeles</button>
</div>

<script src="script.js"></script>

</body>
</html>

Y aquí tienes el código JavaScript que realizará la función de revertir la cadena y copiar el resultado al portapapeles:

javascript
Copy code
function reverseString() {
  var input = document.getElementById('inputString').value.trim();
  if (input === "") {
    alert("Por favor, ingrese un texto antes de revertir.");
    return;
  }
  var reversedString = input.split('').reverse().join('');
  document.getElementById('result').innerHTML = '<strong>' + reversedString + '</strong>';
}

function copyToClipboard() {
  var resultText = document.getElementById('result').innerText.trim();
  if (resultText === "") {
    alert("No hay texto para copiar.");
    return;
  }
  var tempInput = document.createElement('textarea');
  tempInput.value = resultText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Texto copiado al portapapeles: ' + resultText);
}

Asegúrate de guardar el archivo JavaScript como script.js en la misma carpeta que tu archivo HTML para que funcione correctamente. También, ten en cuenta que he incluido la biblioteca Font Awesome para los iconos; asegúrate de tener una conexión a Internet activa para cargar los iconos desde su CDN.
Create a html+js website where you input a string up to 100 chars length, click on a button "Reverse 🔄" and below you can see the text reversed. Below, there is a button "Copy 📋" that copies the content to the clipboard and shows a plain text "Copied to clipboard!" to the right of the button. Button should only appears once there is reversed text. Styles should be fresh and flat, similar to bootstrap library. Use functions to better decouple and structure the code in script.js

