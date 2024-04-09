document.addEventListener('DOMContentLoaded', function() {
    // Create UI components
    const container = document.createElement('div');
    const title = document.createElement('h1');
    const input = document.createElement('input');
    const resultArea = document.createElement('div');

    // Set attributes and text content
    title.textContent = 'Reverse String Application';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Type here to reverse...');
    resultArea.setAttribute('id', 'reversedString');

    // Append elements to the container
    container.appendChild(title);
    container.appendChild(input);
    container.appendChild(resultArea);

    // Append container to the body
    document.body.appendChild(container);

    // Input event listener for real-time string reversal
    input.addEventListener('input', function() {
        resultArea.textContent = this.value.split('').reverse().join('');
    });

    // Inject CSS styles
    const style = document.createElement('style');
    style.textContent = `
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        div {
            text-align: center;
        }
        h1 {
            color: #333;
        }
        input[type="text"] {
            padding: 10px;
            margin: 20px 0;
            width: 80%;
            max-width: 400px;
        }
        #reversedString {
            color: #666;
            font-size: 20px;
        }
    `;
    // Append style to the head
    document.head.appendChild(style);
});
