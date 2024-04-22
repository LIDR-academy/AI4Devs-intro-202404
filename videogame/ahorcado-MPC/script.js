document.addEventListener('DOMContentLoaded', function () {
  const palabras = [
    "AHORCADO", "COCHE", "GATO", "PERRO", "ORDENADOR", "CASA", "ARBOL", "MONTAÑA", "PLAYA", "FUTBOL",
    "BALONCESTO", "TENIS", "GUITARRA", "PIANO", "LIBRO", "REVISTA", "PELICULA", "MUSICA", "CINE", "TEATRO",
    "ESCUELA", "UNIVERSIDAD", "TRABAJO", "VACACIONES", "FAMILIA", "AMIGOS", "COMIDA", "BEBIDA", "RESTAURANTE",
    "SUPERMERCADO", "JARDIN", "PARQUE", "CIUDAD", "PUEBLO", "NATURALEZA", "ANIMALES", "VEHICULO", "AVION",
    "BARCO", "TREN", "AUTOBUS", "MOTO", "BICICLETA", "CAMINO", "CALLE", "CARRETERA", "SENDA", "RIO", "LAGO",
    "MAR", "OCEANO", "ISLA", "CONTINENTE", "PAIS", "CIUDADANO", "GOBIERNO", "POLITICA", "DEMOCRACIA", "DICTADURA",
    "GUERRA", "PAZ", "RELIGION", "DIOS", "IGLESIA", "TEMPLO", "CREENCIA", "ESPIRITU", "ALMA", "CUERPO", "MENTE",
    "CEREBRO", "CORAZON", "SANGRE", "PULMONES", "HIGADO", "RIÑON", "ESTOMAGO", "INTESTINOS", "PANCREAS",
    "APENDICE", "COLUMNA", "HUESO", "ARTICULACION", "MUSCULO", "TEJIDO", "CELULA", "ORGANISMO", "CREATURA",
    "VIDA", "MUERTE", "NACIMIENTO", "EDAD", "AÑOS", "MES", "DIA", "HORA", "MINUTO", "SEGUNDO", "TIEMPO", "ESPACIO",
    "UNIVERSO", "MUNDO", "PLANETA", "TIERRA", "LUNA", "SOL", "ESTRELLA", "GALAXIA", "CIELO", "NUBE", "LLUVIA",
    "RAYO", "TRUENO", "VIENTO", "NIEVE", "HIELO", "FRIO", "CALOR", "VERANO", "OTOÑO", "INVIERNO", "PRIMAVERA",
    "NATURALEZA", "MEDIOAMBIENTE", "ECOSISTEMA", "BOSQUE", "SELVA", "DESERTO", "MONTAÑA", "COLINA", "VALLE",
    "LLANURA", "RIO", "LAGO", "MAR", "OCEANO", "PLAYA", "ISLA", "CONTINENTE", "FAUNA", "FLORA", "PLANTA", "ANIMAL",
    "INSECTO", "AVE", "MAMIFERO", "REPTIL", "ANFIBIO", "PECES", "CRUSTACEO", "MOLUSCO", "ARACNIDO", "BACTERIA",
    "HONGO", "VIRUS", "MICROORGANISMO", "ALIMENTO", "COMIDA", "BEBIDA", "FRUTA", "VERDURA", "CARNE", "PESCADO",
    "CEREALES", "LEGUMBRES", "LACTEOS", "AZUCAR", "SAL", "GRASA", "PROTEINA", "VITAMINA", "MINERAL", "AGUA",
    "HIDROGENO", "OXIGENO", "CARBONO", "NITROGENO", "FLUOR", "FOSFORO", "AZUFRE", "CLORO", "SODIO", "POTASIO",
    "MAGNESIO", "CALCIO", "HIERRO", "COBRE", "ZINC", "MANGANESO", "MOLIBDENO", "ESTRONGINIO", "CROMO", "CINC",
    "CITRATO", "CITRICIDAD", "ACIDO", "ALCALINO", "NEUTRO", "MORFEMA", "LEXEMA", "GRAMATICA", "SINTAXIS", "ORTOGRAFIA",
    "SEMANTICA", "PRAGMATICA", "MORFOLOGIA", "SINTAGMA", "PALABRA", "SIGNIFICADO", "CONCEPTO", "IDEA", "PENSAMIENTO",
    "EMOCION", "SENTIMIENTO", "SENSACION", "PERCEPCION", "CONCIENCIA", "INCONSCIENCIA", "CONOCIMIENTO", "DESCONOCIMIENTO",
    "APRENDIZAJE", "ENSEÑANZA", "APRENDIZ", "MAESTRO", "ALUMNO", "PROFESOR", "EDUCACION", "ESCUELA", "COLEGIO",
    "INSTITUTO", "UNIVERSIDAD", "BACHILLERATO", "CICLO", "CURSO", "ASIGNATURA", "MATERIA", "LENGUA", "MATEMATICAS",
    "CIENCIAS", "NATURALES", "SOCIALES", "HUMANIDADES", "FILOSOFIA", "HISTORIA", "GEOGRAFIA", "ECONOMIA", "PSICOLOGIA",
    "SOCIOLOGIA", "ANTROPOLOGIA", "BIOLOGIA", "FISICA", "QUIMICA", "ELECTRONICA", "INFORMATICA", "PROGRAMACION",
    "ROBOTICA", "MEDICINA", "ENFERMERIA", "PSIQUIATRIA", "PSICOANALISIS", "PSICOTERAPIA", "TERAPIA", "FARMACIA",
    "QUIROFANO", "HOSPITAL", "CLINICA", "CONSULTA", "URGENCIAS", "AMBULATORIO", "CIRUGIA", "ANESTESIA", "REANIMACION",
    "TRAUMATOLOGIA", "CARDIOLOGIA", "ONCOLOGIA", "NEUROLOGIA", "PEDIATRIA", "GERIATRIA", "OBSTETRICIA", "GINECOLOGIA",
    "DERMATOLOGIA", "OTORRINOLARINGOLOGIA", "OFTALMOLOGIA", "UROLOGIA", "GASTROENTEROLOGIA", "ENDOCRINOLOGIA",
    "HEMATOLOGIA", "NEUMOLOGIA", "REHABILITACION", "RADIOLOGIA", "RADIOTERAPIA", "NUTRICION", "DIETETICA",
    "PSICOSOMATICA", "MEDICINA", "TRADICIONAL", "ALTERNATIVA", "COMPLEMENTARIA", "HOMEOPATIA", "ACUPUNTURA",
    "FITOTERAPIA", "NATUROPATIA", "OSTEOPATIA", "QUIROPRAXIA", "MASSAGE", "SHIATSU", "REIKI", "YOGA", "TAICHI",
    "MEDITACION", "RELAXACION", "MINDFULNESS", "MUSICOTERAPIA", "AROMATERAPIA", "DANZOTERAPIA", "HIPNOSIS",
    "ALIMENTACION", "NUTRICION", "DIETETICA", "DIETA", "AYUNO", "BALANCE", "ENERGIA", "METABOLISMO", "DIGESTION",
    "ABSORCION", "CIRCULACION", "RESPIRACION", "EXCRECION", "REPRODUCCION", "CRECIMIENTO", "DESARROLLO", "ADAPTACION",
    "EVOLUCION", "MUTACION", "GENETICA", "HERENCIA", "VARIACION", "SELECCION", "NATURAL", "ARTIFICIAL", "TECNOLOGIA",
    "INNOVACION", "DESCUBRIMIENTO", "INVENTO", "CREATIVIDAD", "IMAGINACION", "INSPIRACION", "ASPIRACION", "MOTIVACION",
    "OBJETIVO", "META", "PROPÓSITO", "FIN", "INTENCION", "PLAN", "ESTRATEGIA", "TACTICA", "OPERACION", "EJECUCION",
    "ACCION", "REACTION", "COMPORTAMIENTO", "ACTITUD", "CONDUCTA", "COMUNICACION", "COMPRENSION", "INTERPRETACION",
    "SIGNIFICADO", "MENSAJE", "INFORMACION", "CONOCIMIENTO", "APRENDIZAJE", "ENSEÑANZA", "EDUCACION", "FORMACION",
    "CULTURA", "CIVILIZACION", "SOCIEDAD", "COMUNIDAD", "GRUPO", "COLECTIVO", "ORGANIZACION", "INSTITUCION",
    "ESTRUCTURA", "SISTEMA", "ORDEN", "LEY", "NORMA", "VALOR", "PRINCIPIO", "CREENCIA", "CONVICCION", "IDEAL",
    "MORAL", "ETICA", "JUSTICIA", "DIGNIDAD", "LIBERTAD", "IGUALDAD", "FRATERNIDAD", "SOLIDARIDAD", "RESPETO",
    "TOLERANCIA", "PACIENCIA", "HUMILDAD", "GENEROSIDAD", "BONDAD", "AMABILIDAD", "CARIDAD", "COMPASION", "AMOR",
    "AFECTO", "CARIÑO", "TERNURA", "CALOR", "AMISTAD", "AMIGOS", "COMPANIA", "CONVIVENCIA", "RELACION", "VINCULO",
    "LAZO", "RELACION", "SENTIMENTAL", "ROMANTICO", "SEXUAL", "MATRIMONIO", "FAMILIA", "PAREJA", "NOVIAZGO",
    "NOVIO", "NOVIA", "ESPOSO", "ESPOSA", "PADRE", "MADRE", "HIJO", "HIJA", "HERMANO", "HERMANA", "ABUELO",
    "ABUELA", "NIETO", "NIETA", "SUEGRO", "SUEGRA", "YERNO", "NUERA", "CUÑADO", "CUÑADA", "SOBRINO", "SOBRINA",
    "PADRINO", "MADRINA", "AHIJADO", "AHIJADA", "TIOS", "PRIMOS", "SOBRINOS", "BISABUELOS", "BISNIETOS", "TATARABUELOS",
    "TATARANIETOS", "ANCESTROS", "DESCENDIENTES", "ESTUDIO", "INVESTIGACION", "CIENCIA", "ARTICULO", "LIBRO",
    "TESIS", "TRABAJO", "PROYECTO", "INVESTIGADOR", "CIENTIFICO", "ESCRITOR", "AUTOR", "EDITOR", "LECTOR",
    "BIBLIOTECA", "ARCHIVO", "MUSEO", "EXPOSICION", "CONGRESO", "SEMINARIO", "CONFERENCIA", "CURSO", "TALLER",
    "MASTER", "DOCTORADO", "EXAMEN", "EVALUACION", "CALIFICACION", "NOTA", "APROBADO", "SUSPENSO", "MATRICULA",
    "CERTIFICADO", "DIPLOMA", "TITULO", "GRADO", "MAESTRIA", "DOCTOR", "RECTOR", "PROFESOR", "ALUMNO", "MAESTRO",
    "DIRECTOR", "SECRETARIO", "ADMINISTRATIVO", "SERVICIOS", "DOCENCIA", "INVESTIGACION", "EXTENSION", "UNIVERSITARIO",
    "ESTUDIANTE", "FACULTAD", "DEPARTAMENTO", "ESCUELA", "INSTITUTO", "CENTRO", "UNIDAD", "DIVISION", "SECCION",
    "CATEDRA", "LECCION", "TEORIA", "PRACTICA", "METODO", "ENFOQUE", "TECNICA", "PROCEDIMIENTO", "INSTRUMENTO",
    "HERRAMIENTA", "RECURSO", "MEDIO", "EQUIPO", "APARATO", "INSTRUMENTO", "MATERIAL", "OBJETO", "ELEMENTO",
    "OBJETIVO", "META", "PROPÓSITO", "FIN", "INTENCION", "PLAN", "ESTRATEGIA", "TACTICA", "OPERACION", "EJECUCION",
    "ACCION", "REACTION", "COMPORTAMIENTO", "ACTITUD", "CONDUCTA", "COMUNICACION", "COMPRENSION", "INTERPRETACION",
    "SIGNIFICADO", "MENSAJE", "INFORMACION", "CONOCIMIENTO", "APRENDIZAJE", "ENSEÑANZA", "EDUCACION", "FORMACION",
    "CULTURA", "CIVILIZACION", "SOCIEDAD", "COMUNIDAD", "GRUPO", "COLECTIVO", "ORGANIZACION", "INSTITUCION",
    "ESTRUCTURA", "SISTEMA", "ORDEN", "LEY", "NORMA", "VALOR", "PRINCIPIO", "CREENCIA", "CONVICCION", "IDEAL",
    "MORAL", "ETICA", "JUSTICIA", "DIGNIDAD", "LIBERTAD", "IGUALDAD", "FRATERNIDAD", "SOLIDARIDAD", "RESPETO",
    "TOLERANCIA", "PACIENCIA", "HUMILDAD", "GENEROSIDAD", "BONDAD", "AMABILIDAD", "CARIDAD", "COMPASION", "AMOR",
    "AFECTO", "CARIÑO", "TERNURA", "CALOR", "AMISTAD", "AMIGOS", "COMPANIA", "CONVIVENCIA", "RELACION", "VINCULO",
    "LAZO", "RELACION", "SENTIMENTAL", "ROMANTICO", "SEXUAL", "MATRIMONIO", "FAMILIA", "PAREJA", "NOVIAZGO",
    "NOVIO", "NOVIA", "ESPOSO", "ESPOSA", "PADRE", "MADRE", "HIJO", "HIJA", "HERMANO", "HERMANA", "ABUELO",
    "ABUELA", "NIETO", "NIETA", "SUEGRO", "SUEGRA", "YERNO", "NUERA", "CUÑADO", "CUÑADA", "SOBRINO", "SOBRINA",
    "PADRINO", "MADRINA", "AHIJADO", "AHIJADA", "TIOS", "PRIMOS", "SOBRINOS", "BISABUELOS", "BISNIETOS", "TATARABUELOS",
    "TATARANIETOS", "ANCESTROS", "DESCENDIENTES", "ESTUDIO", "INVESTIGACION", "CIENCIA", "ARTICULO", "LIBRO",
    "TESIS", "TRABAJO", "PROYECTO", "INVESTIGADOR", "CIENTIFICO", "ESCRITOR", "AUTOR", "EDITOR", "LECTOR",
    "BIBLIOTECA", "ARCHIVO", "MUSEO", "EXPOSICION", "CONGRESO", "SEMINARIO", "CONFERENCIA", "CURSO", "TALLER",
    "MASTER", "DOCTORADO", "EXAMEN", "EVALUACION", "CALIFICACION", "NOTA", "APROBADO", "SUSPENSO", "MATRICULA",
    "CERTIFICADO", "DIPLOMA", "TITULO", "GRADO", "MAESTRIA", "DOCTOR", "RECTOR", "PROFESOR", "ALUMNO", "MAESTRO",
    "DIRECTOR", "SECRETARIO", "ADMINISTRATIVO", "SERVICIOS", "DOCENCIA", "INVESTIGACION", "EXTENSION", "UNIVERSITARIO",
    "ESTUDIANTE", "FACULTAD", "DEPARTAMENTO", "ESCUELA", "INSTITUTO", "CENTRO", "UNIDAD", "DIVISION", "SECCION",
    "CATEDRA", "LECCION", "TEORIA", "PRACTICA", "METODO", "ENFOQUE", "TECNICA", "PROCEDIMIENTO", "INSTRUMENTO",
    "HERRAMIENTA", "RECURSO", "MEDIO", "EQUIPO", "APARATO", "INSTRUMENTO", "MATERIAL", "OBJETO", "ELEMENTO",
    "OBJETIVO", "META", "PROPÓSITO", "FIN", "INTENCION", "PLAN", "ESTRATEGIA", "TACTICA", "OPERACION", "EJECUCION",
    "ACCION", "REACTION", "COMPORTAMIENTO", "ACTITUD", "CONDUCTA", "COMUNICACION", "COMPRENSION", "INTERPRETACION",
    "SIGNIFICADO", "MENSAJE", "INFORMACION", "CONOCIMIENTO", "APRENDIZAJE", "ENSEÑANZA", "EDUCACION", "FORMACION",
    "CULTURA", "CIVILIZACION", "SOCIEDAD", "COMUNIDAD", "GRUPO", "COLECTIVO", "ORGANIZACION", "INSTITUCION",
    "ESTRUCTURA", "SISTEMA", "ORDEN", "LEY", "NORMA", "VALOR", "PRINCIPIO", "CREENCIA", "CONVICCION", "IDEAL",
    "MORAL", "ETICA", "JUSTICIA", "DIGNIDAD", "LIBERTAD", "IGUALDAD", "FRATERNIDAD", "SOLIDARIDAD", "RESPETO",
    "TOLERANCIA", "PACIENCIA", "HUMILDAD", "GENEROSIDAD", "BONDAD", "AMABILIDAD", "CARIDAD", "COMPASION", "AMOR",
    "AFECTO", "CARIÑO", "TERNURA", "CALOR", "AMISTAD", "AMIGOS", "COMPANIA", "CONVIVENCIA", "RELACION", "VINCULO",
    "LAZO", "RELACION", "SENTIMENTAL", "ROMANTICO", "SEXUAL", "MATRIMONIO", "FAMILIA", "PAREJA", "NOVIAZGO",
    "NOVIO", "NOVIA", "ESPOSO", "ESPOSA", "PADRE", "MADRE", "HIJO", "HIJA", "HERMANO", "HERMANA", "ABUELO",
    "ABUELA", "NIETO", "NIETA", "SUEGRO", "SUEGRA", "YERNO", "NUERA", "CUÑADO", "CUÑADA", "SOBRINO", "SOBRINA",
    "PADRINO", "MADRINA", "AHIJADO", "AHIJADA", "TIOS", "PRIMOS", "SOBRINOS", "BISABUELOS", "BISNIETOS", "TATARABUELOS",
    "TATARANIETOS", "ANCESTROS", "DESCENDIENTES", "ESTUDIO", "INVESTIGACION", "CIENCIA", "ARTICULO", "LIBRO",
    "TESIS", "TRABAJO", "PROYECTO", "INVESTIGADOR", "CIENTIFICO", "ESCRITOR", "AUTOR", "EDITOR", "LECTOR",
    "BIBLIOTECA", "ARCHIVO", "MUSEO", "EXPOSICION", "CONGRESO", "SEMINARIO", "CONFERENCIA", "CURSO", "TALLER",
    "MASTER", "DOCTORADO", "EXAMEN", "EVALUACION", "CALIFICACION", "NOTA", "APROBADO", "SUSPENSO", "MATRICULA",
    "CERTIFICADO", "DIPLOMA", "TITULO", "GRADO", "MAESTRIA", "DOCTOR", "RECTOR", "PROFESOR", "ALUMNO", "MAESTRO",
    "DIRECTOR", "SECRETARIO", "ADMINISTRATIVO", "SERVICIOS", "DOCENCIA", "INVESTIGACION", "EXTENSION", "UNIVERSITARIO",
    "ESTUDIANTE", "FACULTAD", "DEPARTAMENTO", "ESCUELA", "INSTITUTO", "CENTRO", "UNIDAD", "DIVISION", "SECCION",
    "CATEDRA", "LECCION", "TEORIA", "PRACTICA", "METODO", "ENFOQUE", "TECNICA", "PROCEDIMIENTO", "INSTRUMENTO",
    "HERRAMIENTA", "RECURSO", "MEDIO", "EQUIPO", "APARATO", "INSTRUMENTO", "MATERIAL", "OBJETO", "ELEMENTO",
    "OBJETIVO", "META", "PROPÓSITO", "FIN", "INTENCION", "PLAN", "ESTRATEGIA", "TACTICA", "OPERACION", "EJECUCION",
    "ACCION", "REACTION", "COMPORTAMIENTO", "ACTITUD", "CONDUCTA", "COMUNICACION", "COMPRENSION", "INTERPRETACION",
    "SIGNIFICADO", "MENSAJE", "INFORMACION", "CONOCIMIENTO", "APRENDIZAJE", "ENSEÑANZA", "EDUCACION", "FORMACION",
    "CULTURA", "CIVILIZACION", "SOCIEDAD", "COMUNIDAD", "GRUPO", "COLECTIVO", "ORGANIZACION", "INSTITUCION",
    "ESTRUCTURA", "SISTEMA", "ORDEN", "LEY", "NORMA", "VALOR", "PRINCIPIO", "CREENCIA", "CONVICCION", "IDEAL",
    "MORAL", "ETICA", "JUSTICIA", "DIGNIDAD", "LIBERTAD", "IGUALDAD", "FRATERNIDAD", "SOLIDARIDAD", "RESPETO",
    "TOLERANCIA", "PACIENCIA", "HUMILDAD", "GENEROSIDAD", "BONDAD", "AMABILIDAD", "CARIDAD", "COMPASION", "AMOR",
    "AFECTO", "CARIÑO", "TERNURA", "CALOR", "AMISTAD", "AMIGOS", "COMPANIA", "CONVIVENCIA", "RELACION", "VINCULO",
    "LAZO", "RELACION", "SENTIMENTAL", "ROMANTICO", "SEXUAL", "MATRIMONIO", "FAMILIA", "PAREJA", "NOVIAZGO",
    "NOVIO", "NOVIA", "ESPOSO", "ESPOSA", "PADRE", "MADRE", "HIJO", "HIJA", "HERMANO", "HERMANA", "ABUELO",
    "ABUELA", "NIETO", "NIETA", "SUEGRO", "SUEGRA", "YERNO", "NUERA", "CUÑADO", "CUÑADA", "SOBRINO", "SOBRINA",
    "PADRINO", "MADRINA", "AHIJADO", "AHIJADA", "TIOS", "PRIMOS", "SOBRINOS", "BISABUELOS", "BISNIETOS", "TATARABUELOS",
    "TATARANIETOS", "ANCESTROS", "DESCENDIENTES", "ESTUDIO", "INVESTIGACION", "CIENCIA", "ARTICULO", "LIBRO",
    "TESIS", "TRABAJO", "PROYECTO", "INVESTIGADOR", "CIENTIFICO", "ESCRITOR", "AUTOR", "EDITOR", "LECTOR",
    "BIBLIOTECA", "ARCHIVO", "MUSEO", "EXPOSICION", "CONGRESO", "SEMINARIO", "CONFERENCIA", "CURSO", "TALLER",
    "MASTER", "DOCTORADO", "EXAMEN", "EVALUACION", "CALIFICACION", "NOTA", "APROBADO", "SUSPENSO", "MATRICULA",
    "CERTIFICADO", "DIPLOMA", "TITULO", "GRADO", "MAESTRIA", "DOCTOR", "RECTOR", "PROFESOR", "ALUMNO", "MAESTRO",
    "DIRECTOR", "SECRETARIO", "ADMINISTRATIVO", "SERVICIOS", "DOCENCIA", "INVESTIGACION", "EXTENSION", "UNIVERSITARIO",
    "ESTUDIANTE", "FACULTAD", "DEPARTAMENTO", "ESCUELA", "INSTITUTO", "CENTRO", "UNIDAD", "DIVISION", "SECCION",
    "CATEDRA", "LECCION", "TEORIA", "PRACTICA", "METODO", "ENFOQUE", "TECNICA", "PROCEDIMIENTO", "INSTRUMENTO",
    "HERRAMIENTA", "RECURSO", "MEDIO", "EQUIPO", "APARATO", "INSTRUMENTO", "MATERIAL", "OBJETO", "ELEMENTO",
    "OBJETIVO", "META", "PROPÓSITO", "FIN", "INTENCION", "PLAN", "ESTRATEGIA", "TACTICA", "OPERACION", "EJECUCION",
    "ACCION", "REACTION", "COMPORTAMIENTO", "ACTITUD", "CONDUCTA", "COMUNICACION", "COMPRENSION", "INTERPRETACION",
    "SIGNIFICADO", "MENSAJE", "INFORMACION", "CONOCIMIENTO", "APRENDIZAJE", "ENSEÑANZA", "EDUCACION", "FORMACION",
    "CULTURA", "CIVILIZACION", "SOCIEDAD", "COMUNIDAD"];

  let palabraSecreta = "";
  let letrasAdivinadas = [];
  let intentos = 10;

  // Obtener una palabra aleatoria
  function obtenerPalabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)];
  }

  // Inicializar el juego
  function inicializarJuego() {
    palabraSecreta = obtenerPalabraAleatoria().toUpperCase();
    letrasAdivinadas = [];
    intentos = 10;

    // Mostrar la palabra oculta
    let palabraMostrada = "";
    for (let i = 0; i < palabraSecreta.length; i++) {
      palabraMostrada += "_ ";
    }
    document.getElementById("word").textContent = palabraMostrada;

    // Mostrar el teclado
    const teclado = document.getElementById("keyboard");
    teclado.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letra = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letra;
      button.classList.add("btn", "m-1");
      button.dataset.letter = letra;
      button.addEventListener("click", function () {
        comprobarLetra(letra);
      });
      teclado.appendChild(button);
    }

    // Mostrar los intentos restantes
    document.getElementById("intentos").textContent = intentos;
  }

  // Comprobar si una letra está en la palabra secreta
  function comprobarLetra(letra) {
    if (intentos === 0 || letrasAdivinadas.includes(letra)) {
      return; // Salir si no quedan intentos o si la letra ya ha sido adivinada
    }

    if (palabraSecreta.includes(letra)) {
      // La letra está en la palabra secreta
      letrasAdivinadas.push(letra);
      actualizarPalabraMostrada();
      if (todasLetrasAdivinadas()) {
        alert("¡Has ganado!");
        reiniciarJuego();
      }
    } else {
      // La letra no está en la palabra secreta
      if (intentos === 1) {
        // Si es el último intento, mostrar la alerta directamente después de actualizar los elementos
        intentos--;
        document.getElementById("intentos").textContent = intentos;
        const button = document.querySelector(`button[data-letter="${letra}"]`);
        if (button) {
          button.classList.add("btn-danger");
        }
        document.getElementById("intentos").classList.add("low-attempts");
        actualizarPalabraMostrada();
        alert(`¡Has perdido! La palabra era: ${palabraSecreta}`);
        reiniciarJuego();
      } else {
        // La letra no está en la palabra secreta pero quedan más intentos
        intentos--;
        document.getElementById("intentos").textContent = intentos;
        const button = document.querySelector(`button[data-letter="${letra}"]`);
        if (button) {
          button.classList.add("btn-danger");
        }
        if (intentos < 4) {
          document.getElementById("intentos").classList.add("low-attempts");
        }
        if (intentos === 0) {
          alert(`¡Has perdido! La palabra era: ${palabraSecreta}`);
          reiniciarJuego();
        }
      }
    }
  }


  // Actualizar la palabra mostrada con las letras adivinadas
  function actualizarPalabraMostrada() {
    let palabraMostrada = "";
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (letrasAdivinadas.includes(palabraSecreta[i])) {
        palabraMostrada += palabraSecreta[i] + " ";
      } else {
        palabraMostrada += "_ ";
      }
    }
    document.getElementById("word").textContent = palabraMostrada;
    actualizarBotones();
  }

  // Actualizar el estilo de los botones según las letras adivinadas
  function actualizarBotones() {
    const botones = document.querySelectorAll("#keyboard button");
    botones.forEach(button => {
      if (letrasAdivinadas.includes(button.dataset.letter)) {
        button.classList.add("btn-success");
      }
    });
  }

  // Verificar si todas las letras de la palabra secreta han sido adivinadas
  function todasLetrasAdivinadas() {
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (!letrasAdivinadas.includes(palabraSecreta[i])) {
        return false;
      }
    }
    return true;
  }

  // Reiniciar el juego
  function reiniciarJuego() {
    inicializarJuego();
    const botones = document.querySelectorAll("#keyboard button");
    botones.forEach(button => {
      button.classList.remove("btn-success", "btn-danger");
    });
    document.getElementById("intentos").classList.remove("low-attempts"); // Eliminar la clase low-attempts
  }

  // Manejar el evento de presionar una tecla
  document.addEventListener("keydown", function (event) {
    const letra = event.key.toUpperCase();
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      comprobarLetra(letra);
    }
  });

  // Inicializar el juego al cargar la página
  inicializarJuego();
});
