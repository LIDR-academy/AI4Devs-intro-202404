function showResult() {
    var inputText = document.getElementById("inputString").value;
    var reversedText = inputText.split('').reverse().join('');
    document.getElementById("resultadoText").textContent = reversedText;
    document.getElementById("resultadoPopup").style.display = "block";
}

function copyToClipboard() {
    var resultadoText = document.getElementById("resultadoText");
    var range = document.createRange();
    range.selectNode(resultadoText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}
