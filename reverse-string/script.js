function reverseString() {
  const inputElement = document.getElementById("inputString");
  const input = inputElement.value;
  const reversed = input.split("").reverse().join("");
  document.getElementById("reversedString").textContent = reversed;

  document.getElementById("resultContainer").style.display = "block";

  inputElement.value = "";
}

function copyToClipboard() {
  const reversedString = document.getElementById("reversedString").textContent;
  navigator.clipboard.writeText(reversedString).then(
    () => {
      alert("Copied to clipboard!");
    },
    (err) => {
      console.error("Could not copy text: ", err);
    }
  );
}
