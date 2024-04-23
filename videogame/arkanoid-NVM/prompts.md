# Documentación del Desarrollo del Juego Arkanoid

Este documento detalla la secuencia de prompts y respuestas proporcionados y recibidos durante el desarrollo del juego Arkanoid, permitiendo a otros desarrolladores seguir los mismos pasos para obtener resultados similares.

## Introducción

Este documento resume el proceso de desarrollo interactivo de un juego de Arkanoid, utilizando tecnologías web y la asistencia de GPT-4.

## Prompts y Desarrollo

### 1. Configuración Inicial del Juego

**Prompt**: Conoces el juego Arkanoid? Podrias detallarme el funcionamiento y las reglas del juego?

### 2. Estructura Básica del Juego

**Prompt**: Si tuvieras que construirlo utilizando HTML, CSS y Javascript, ¿cuáles son los pasos que seguirías?

### 3. Creación de Ladrillos

**Prompt**: Construye las filas de ladrillos. Quiero que al iniciar el juego tenga 8 filas de ladrillos, cada fila de un color.

### 4. Lógica de Colisión

**Prompt**: Ahora necesito que le apliquemos la lógica siguiente: Al impactar la pelota con el ladrillo, el ladrillo debe desaparecer y la pelota rebotar hacia abajo teniendo en cuenta el ángulo con el que impactó.

### 5. Bug en Rebote de la Pelota

**Prompt**: La pelota colisiona con la plataforma pero no rebota. Lo que ahora mismo sucede es como que se desliza a través de la plataforma.

### 6. Corrección de Bug en Colisiones

**Prompt**: Hemos arreglado el bug de rebote contra la plataforma pero ahora no choca contra los ladrillos y por lo tanto no los rompe, pasa por encima.

### 7. Fin del Juego

**Prompt**: Actualmente la pelota si no impacta con la plataforma, es decir, que no he posicionado bien dicha pieza con los cursores, la pelota se pierde de la pantalla. El comportamiento deseado es que al superar el nivel de la plataforma sin colisionar con ella, la partida se acabe.

### 8. Reinicio del Juego

**Prompt**: Demosles una puntuacion ascendente a cada fila de ladrillos, teniendo como ejemplo que la primera fila de ladrillos, cada uno de ellos tenga un valor de 10 puntos al romperlos y si en este caso tenemos 8 filas, la ultima fila de ladrillos valga 80 puntos romper cada uno de ellos.

### 9. Mejora Visual de la Tabla de Puntuaciones

**Prompt**: Quiero que me des algo parecido pero con los prompts exactos que te he ido pidiendo.

### 10. Documentación en Markdown

**Prompt**: Podrías hacerme una estructura markdown para añadir en un archivo .md de todos los prompts que te he ido pidiendo hasta llegar a la solución que tenemos actualmente?

## Conclusión

Este documento proporciona una guía paso a paso basada en los prompts específicos utilizados durante la sesión de desarrollo. Esto permite a cualquier desarrollador seguir el mismo proceso y lograr resultados similares en la creación de un juego de Arkanoid.
