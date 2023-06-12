Pasos a seguir:
1. Crear un input text para poder escribir el todo.
1b. Cuando pulsas el botón, el texto del campo se almacena.
2. El texto introducido ha de almacenarse en un array.
2b. Se borra el campo al introducirse.
2c. Hacer que al pulsar Enter haga lo mismo que pulsar Enviar.
3. Cada vez que se introduce un texto, se inyecta un nuevo código HTML con el texto.
5. Este código ha de tener un botón de editar, y un botón de borrar.
6. Este código ha de tener un id único, que permita manejar los borrados y ediciones.
7. Si pulsas el checkbox, el texto se tacha y "complete" pasa a ser verdad.
8. Para que al pulsar Editar se reemplace el campo de texto:
    - Crear un input de texto
    - Ponerle de valor dentro el task actual
    - Seleccionar el nodo y reemplazarlo
    - Al acabar la edición, seleccionar el nodo y volverlo a hacer texto normal

Incorporando localStorage:
- ¿Cuándo se puede actualizar el array?
    - Al añadir un item
    - Al borrar un item
    - Al cambiar el orden de un item

ERRORES:
- Cuando editas un elemento, no se actualiza el localStorage.
- Cuando bajas un elemento en la lista, da error.
- Cuando excede el límite por arriba, da error.
- Se resetea el id cuando se borra un elemento.