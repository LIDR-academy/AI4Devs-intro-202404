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
  