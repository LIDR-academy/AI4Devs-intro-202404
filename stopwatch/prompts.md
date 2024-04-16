Gemini
https://gemini.google.com/app/2fb53c22c59bdb7f?hl=es_419

Copilot de MS
Usted
necesito que agregues el codigo html para el div countdown-div en base a esta imagen
Claro, aquí tienes el código HTML para el div de countdown-div basado en la descripción de la imagen que proporcionaste:

HTML

<div id="countdown-div" class="countdown-container">
    <input type="text" id="timer" value="00:00:00 000" readonly>
    <div class="countdown-buttons">
        <!-- Botones numéricos -->
        <button onclick="setTime(5)">5</button>
        <button onclick="setTime(6)">6</button>
        <button onclick="setTime(7)">7</button>
        <button onclick="setTime(8)">8</button>
        <button onclick="setTime(9)">9</button>
        <button id="setBtn" onclick="startCountdown()">Set</button>
        <br/>
        <button onclick="setTime(0)">0</button>
        <button onclick="setTime(1)">1</button>
        <button onclick="setTime(2)">2</button>
        <button onclick="setTime(3)">3</button>
        <button onclick="setTime(4)">4</button>
        <button id="clearBtn">Clear</button>
    </div>
</div>


