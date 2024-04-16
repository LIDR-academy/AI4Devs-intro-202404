function reverseString() {
    // Obtiene el valor del input
    const inputString = document.getElementById("inputString").value;
  
    // Invierte la cadena
    const reversedString = inputString.split("").reverse().join("");
  
    // Muestra el resultado
    document.getElementById("result").innerText = "Cadena invertida: " + reversedString;
  };
