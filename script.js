let toDoList = {};
let id = 0;
const inputBox = document.getElementById("inputBox");
const inputBoxBtn = document.getElementById("inputBoxBtn");
const list = document.getElementById("list");

const getValue = () => {
    newToDoItem();
    inputBox.value = "";
}

// Usar Enter para introducir datos
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Evita el comportamiento por defecto de Enter
        event.preventDefault();
        // Llama al botón que se desea pulsar
        inputBoxBtn.click();
    }
});

const newToDoItem = () => {
    toDoList[id] = {};
    toDoList[id]["task"] = inputBox.value;
    toDoList[id]["complete"] = false;
    insertNewToDoItem(id);
    id++;
}

const insertNewToDoItem = (id) => {
    // Crea un li que tenga de id el número del objeto
    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.classList.add("toDoItem");

    // Crea un checkbox con clase "checkbox"
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    // Se le puede añadir un addEventListener en cada checkbox al crearlos (utilizando ChatGPT)
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkbox.parentNode.style.textDecoration = 'line-through';
            toDoList[id]["complete"] = true;
        } else {
            checkbox.parentNode.style.textDecoration = 'none';
            toDoList[id]["complete"] = false;
        }
    });

    // Crea un div con clase "task"
    let task = document.createElement("div");
    task.setAttribute("id", `task-${id}`);
    task.classList.add("task");
    task.innerText = toDoList[id]["task"];

    // Crea un botón con clase "editItemBtn"
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Editar";
    editBtn.addEventListener("click", () => {
        toDoList[id]["task"] = prompt("Modifica la tarea", toDoList[id]["task"]);
        task.innerText = toDoList[id]["task"];
    })

    // Crea un botón con clase "deleteItemBtn"
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "Borrar";

    // DUDA -> ¿Hay alguna manera de introducir un atributo onclick?
    deleteBtn.addEventListener("click", () =>{
        if (confirm("¿Seguro que deseas borrarlo?")) {
            // Método para eliminar un elemento
            li.parentNode.removeChild(li);
            // Se elimina del objeto la entrada
            delete toDoList[id];
        }
    })

    // Inserta cada elemento en el li
    li.append(checkbox, task, editBtn, deleteBtn);

    // Inserta el li dentro del ul
    list.appendChild(li);

}

// Función para marcar/desmarcar una tarea (utilizando ChatGPT)
function tacharTarea() {
    // Verificar si el checkbox está marcado
    if (this.checked) {
        // Si está marcado, tachar el texto de la tarea
        this.parentNode.style.textDecoration = 'line-through';
    } else {
        // Si no está marcado, quitar el tachado del texto de la tarea
        this.parentNode.style.textDecoration = 'none';
    }
}
