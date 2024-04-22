NOTA: La descripción es un mix entre lo que propuso ChatGPT, ya que no tenía idea de qué juego hacer.

Empecé con: ``Dame ideas sobre videojuegos didácticos que se puedan hacer solo con html, js y css``

Me gustó la idea del simulador de economía así que le pregunté cómo plantearía el juego, e hice que generara el código.
La conversación completa [aquí](https://chat.openai.com/share/07ad2443-1ba8-4069-9c38-23f0852ea9fd).

## 1. Objetivo del Juego
   El objetivo principal del simulador de economía es construir y gestionar una ciudad o un imperio comercial de manera eficiente. Los jugadores deberán tomar decisiones sobre la construcción de infraestructuras y la administración de recursos para maximizar el crecimiento y la sostenibilidad económica.

## 2. Mécanica del juego
Cada jugador empieza con 1000$

### Recursos
   - **Dinero**: Utilizado para construir y mantener infraestructuras.
   - **Población**: Cantidad de personas.
   - **Bienestar**: Mide la felicidad de la población. Empieza en 100

### Construcciones y Mejoras
#### Construcciones
- Residencia: Cuesta 50$
- Fabrica: Cuesta 100$ 
- Tienda: Cuesta 70$
- Almacen: Cuesta 150$
- Hospital: Cuesta 150$
- Escuela: Cuesta 150$
- Supermercado: Cuesta 150$

#### Mejoras
- Si hay una fábrica, cada Residencia produce 12$ y por cada nueva fabrica se disminuya el tiempo que genera dinero una Residencia en 0.005 segundos
- Por cada tienda se genere 50$ cada 5 segundos
- Por cada supermercado se genere 100$ cada 7 segundos
- Por cada almacen se disminuya el tiempo que toma producir dinero de las tiendas en 0.03 segundos y los supermercados 0.01 segundos
- Por cada hospital, aumente el bienestar en 5 puntos cada 10s
- Por cada escuela, aumenta el bienestar en 7 puntos cada 10s
- Por cada residencia, la población aumente en 1 cada 20 segundos
- Por cada hospital y escuela, disminuye el tiempo de aumento de población de las residencias en 0.1s

### Desafíos y Eventos
- **Eventos económicos**: Crisis, booms económicos, cambios en la demanda.
- **Desastres naturales**: Afectan la infraestructura y requieren inversión en reconstrucción.
- **Guerras**: Afectan la infraestructura y la población


## 3. Interfaz del Usuario
   - **Mapa de la ciudad**: Visualización gráfica de la ciudad donde los jugadores pueden añadir y mejorar edificaciones.
   - **Panel de control**: Información sobre recursos disponibles, ingresos, gastos y estadísticas generales.
   - **Barra de herramientas**: Acceso rápido a construcciones, préstamos, y otras funcionalidades.
