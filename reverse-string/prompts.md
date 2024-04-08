CHATBOT: [Claude](https://claude.ai/login)

PROMPTS:

------

Actuando como experto desarrollador Javascript, se requiere crear una función llamada reverseString que reciba por parámetro una cadena de texto y devuelva en orden inverso la misma cadena. Ejemplo: se recibe el valor "AI4Devs", entonces devuelve el valor \`sveD4IA\`.

-----

¡perfecto! ahora se requiere el código html que contenga los siguientes elementos:

1.  Elemento de tipo input, el cual llevará por nombre inputString. Este input tendrá como etiqueta el texto: "Cadena origen" y como texto de ayuda: "Ingrese la cadena que desea invertir".
2.  Elemento de tipo button, el cual llevará por nombre buttonString. Este elemento tendrá como etiqueta el texto: "Revertir".

-----

Ahora el código Javascript debe estar contenido en un archivo lllamado: script.js y se debe evitar usar variables globales Javascript, en lugar de ello, acceder los elementos HTML adentro de las funciones donde se requiere leer su valor.

-----

finalmente, al elemento HTML llamado "inputString", agregar la llamada a la función reverseStringHandler cuando se presione la tecla "enter".

-----

¡Excelente! muchas gracias.

-----

**Luego de haber generado la solución con los prompts anteriores, se procede a elaborar un único promtp consolidado con el cual se obtuvo exactamente el mismo resultado con una sola instrucción:**

Actuando como experto desarrollador Javascript, se requiere crear dos archivos, un archivo html llamado index.html y otro archivo llamado script.js, donde:

El archivo html contiene:

1.  Elemento de tipo input, el cual llevará por nombre "inputString". Este input tendrá como etiqueta el texto: “Cadena origen” y como texto de ayuda: “Ingrese la cadena que desea invertir”.
2.  Elemento de tipo button, el cual llevará por nombre "buttonString". Este elemento tendrá como etiqueta el texto: “Revertir”.

El archivo script,js contiene:

1.  Función llamada "reverseString" que reciba por parámetro una cadena de texto y devuelva en orden inverso la misma cadena. Ejemplo: se recibe el valor “AI4Devs”, entonces devuelve el valor “sveD4IA”.
2.  Función llamada reverseStringHandler la cual agrega los siguientes eventos:
    1.  Al presionar la tecla "Enter" en el input “Cadena origen” se ejecuta la función "reverseString".
    2.  Al hacer clic en el elemento "buttonString", se ejecuta la función "reverseString".

Importante, no se permite el uso de variables globales en Javascript.


-----

