function reverseText() {
    // Obtener el valor del input
    var textInput = document.getElementById("textInput").value;
    
    // Convertir el texto en un array de caracteres, invertirlo y luego unirlo nuevamente
    var reversedText = textInput.split("").reverse().join("");
    
    // Mostrar el texto invertido
    document.getElementById("output").innerText = reversedText;
}