function reverseText() {
  var input = document.getElementById("inputText").value;
  var reversed = input.split("").reverse().join("");
  document.getElementById("reversedText").innerText = reversed;
}

function copyText() {
  var textToCopy = document.getElementById("reversedText").innerText;
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = textToCopy;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  alert("Texto copiado al portapapeles: " + textToCopy);
}
