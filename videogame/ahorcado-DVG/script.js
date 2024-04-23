         const palabras = ["perro", "gato", "leon", "elefante", "jirafa", "tigre", "oso", "zorro", "conejo", "mono"];
        // Lista de palabras para adivinar (frutas)
        const frutas = ["manzana", "banana", "naranja", "uva", "pera", "sandía", "melón", "kiwi", "ciruela", "durazno"];
        // Lista de palabras para adivinar (países de Europa)
        const paisesEuropa = ["España", "Francia", "Italia", "Alemania", "Reino Unido", "Portugal", "Suecia", "Países Bajos", "Bélgica", "Suiza"];

        let palabra; // Palabra seleccionada
        let palabraMostrada; // Palabra mostrada con guiones bajos para letras no adivinadas
        let intentosMaximos = 7; // Número máximo de intentos
        let intentosRestantes; // Número de intentos restantes
        let aciertos = 0; // Contador de aciertos
        let partidasJugadas = 0; // Contador de partidas jugadas
        let partidasGanadas = 0; // Contador de partidas ganadas
        let temporizador; // Variable para almacenar el temporizador

        // Función para seleccionar una palabra aleatoria
        function seleccionarPalabra() {
            const categorias = [palabras, frutas, paisesEuropa];
            const categoriaSeleccionada = categorias[Math.floor(Math.random() * categorias.length)];
            return categoriaSeleccionada[Math.floor(Math.random() * categoriaSeleccionada.length)];
        }

        // Función para mostrar el mensaje de categoría
        function mostrarCategoria() {
            let categoria;
            if (palabras.includes(palabra)) {
                categoria = "Animales";
            } else if (frutas.includes(palabra)) {
                categoria = "Frutas";
            } else if (paisesEuropa.includes(palabra)) {
                categoria = "Países de Europa";
            } else {
                categoria = "Categoría desconocida";
            }
            document.getElementById("category-message").textContent = `Categoría: ${categoria}`;
        }

        // Función para inicializar el juego
        function inicializarJuego() {
            // Detener el temporizador si está activo
            if (temporizador) clearInterval(temporizador);

            // Seleccionar una palabra aleatoria
            palabra = seleccionarPalabra();
            // Mostrar la palabra con guiones bajos para las letras no adivinadas
            palabraMostrada = palabra.replace(/./g, "_ ");
            // Mostrar la palabra oculta en el documento
            document.getElementById("word-container").textContent = palabraMostrada;
            // Reiniciar el número de intentos restantes
            intentosRestantes = intentosMaximos;
            // Incrementar el contador de partidas jugadas
            partidasJugadas++;
            // Mostrar el muñeco del ahorcado vacío
            resetearMuñeco();
            // Generar botones para las letras
            generarBotonesLetras();
            // Mostrar el mensaje de categoría
            mostrarCategoria();
            // Mostrar el marcador de puntuación
            actualizarPuntuacion();
            // Iniciar el temporizador
            iniciarTemporizador();
        }

        // Función para iniciar el temporizador
        function iniciarTemporizador() {
            let segundos = 30;
            document.getElementById("game-over").textContent = `Tiempo restante: ${segundos} segundos`;
            temporizador = setInterval(function() {
                segundos--;
                if (segundos < 0) {
                    // Mostrar mensaje de game over
                    document.getElementById("game-over").textContent = `¡Game Over! Se acabó el tiempo. La palabra era "${palabra}".`;
                    document.getElementById("game-over").style.display = "block";
                    // Reiniciar el juego después de un segundo
                    setTimeout(inicializarJuego, 1000);
                    // Resetear el temporizador
                    clearInterval(temporizador);
                } else {
                    document.getElementById("game-over").textContent = `Tiempo restante: ${segundos} segundos`;
                }
            }, 1000);
        }

        // Función para resetear el muñeco del ahorcado
        function resetearMuñeco() {
            const partesMuñeco = document.querySelectorAll("#hangman line, #hangman circle");
            partesMuñeco.forEach(part => part.style.display = "none");
        }

        // Función para generar botones para las letras
        function generarBotonesLetras() {
            const letrasContainer = document.getElementById("letters");
            letrasContainer.innerHTML = "";
            for (let letra = 65; letra <= 90; letra++) {
                const boton = document.createElement("button");
                boton.textContent = String.fromCharCode(letra);
                boton.addEventListener("click", function() {
                    seleccionarLetra(String.fromCharCode(letra));
                });
                letrasContainer.appendChild(boton);
            }
        }

        // Función para manejar el click en una letra
        function seleccionarLetra(letra) {
            // Si la letra ya fue seleccionada, no hacer nada
            if (palabra.indexOf(letra) === -1 && palabra.indexOf(letra.toLowerCase()) === -1) {
                // Reducir el número de intentos restantes
                intentosRestantes--;
                // Mostrar la parte correspondiente del muñeco del ahorcado
                mostrarParteMuñeco(intentosMaximos - intentosRestantes);
            } else {
                // Reemplazar los guiones bajos con la letra seleccionada si está en la palabra
                let acierto = false;
                for (let i = 0; i < palabra.length; i++) {
                    if (palabra[i] === letra || palabra[i] === letra.toLowerCase()) {
                        palabraMostrada = palabraMostrada.substr(0, i * 2) + palabra[i] + palabraMostrada.substr(i * 2 + 1);
                        acierto = true;
                    }
                }
                // Si se encontró al menos un acierto
                if (acierto) {
                    // Incrementar el contador de aciertos
                    aciertos++;
                    // Verificar si se completó la palabra
                    if (palabraMostrada.indexOf("_") === -1) {
                        // Incrementar el contador de partidas ganadas
                        partidasGanadas++;
                        // Mostrar mensaje de victoria
                        document.getElementById("game-over").textContent = `¡Ganaste! La palabra era "${palabra}".`;
                        document.getElementById("game-over").style.display = "block";
                        // Iniciar nueva partida después de un segundo
                        setTimeout(inicializarJuego, 1000);
                    }
                }
            }
            // Mostrar la palabra actualizada en el documento
            document.getElementById("word-container").textContent = palabraMostrada;
            // Verificar si se acabaron los intentos
            if (intentosRestantes === 0 && palabraMostrada.indexOf("_") !== -1) {
                // Mostrar mensaje de game over
                document.getElementById("game-over").textContent = `¡Game Over! La palabra era "${palabra}".`;
                document.getElementById("game-over").style.display = "block";
                // Iniciar nueva partida después de un segundo
                setTimeout(inicializarJuego, 1000);
            }
            // Actualizar el marcador de puntuación
            actualizarPuntuacion();
        }

        // Función para mostrar la parte correspondiente del muñeco del ahorcado
        function mostrarParteMuñeco(intento) {
            const partesMuñeco = document.querySelectorAll("#hangman line, #hangman circle");
            partesMuñeco[intento - 1].style.display = "block";
        }

        // Función para actualizar el marcador de puntuación
        function actualizarPuntuacion() {
            document.getElementById("score").textContent = `Partidas jugadas: ${partidasJugadas} - Partidas ganadas: ${partidasGanadas}`;
        }

        // Llama a la función para inicializar el juego cuando se carga la página
        window.onload = inicializarJuego;