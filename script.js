let toDoList = {};
let id = 0;
let isNotEditingItem = true;
const inputBox = document.getElementById("inputBox");
const inputBoxBtn = document.getElementById("inputBoxBtn");
const list = document.getElementById("list");

const getValue = () => {
    if(inputBox.value != ""){
        newToDoItem();
        inputBox.value = "";
    } else {
        alert("Por favor, inserte una tarea");
    }
}

// Usar Enter para introducir datos
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isNotEditingItem) {
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
    setTimeout(()=>{
        li.classList.add("animated");
    }, 100)

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
        // Método 01
        // toDoList[id]["task"] = prompt("Modifica la tarea", toDoList[id]["task"]);
        // task.innerText = toDoList[id]["task"];

        //Método 02
        // Enter ahora no introduce valor, sino que acepta la edición
        isNotEditingItem = false;

        // Se crea el campo de texto
        let editableTask = document.createElement("input");
        editableTask.setAttribute("type", "text");
        editableTask.setAttribute("placeholder", toDoList[id]["task"]);
        editableTask.classList.add("editable-task");

        // Se crea el botón Aceptar
        let editBtnOK = document.createElement("button");
        editBtnOK.classList.add("editBtnOK");
        editBtnOK.innerText = "Aceptar";
        editBtnOK.addEventListener("click", () => {
            if (editableTask.value === "") {
                toDoList[id]["task"] = toDoList[id]["task"];
            } else {
                toDoList[id]["task"] = editableTask.value;
            }
            task.innerText = toDoList[id]["task"];
            editableTask.parentNode.replaceChild(task, editableTask);
            editBtnOK.parentNode.replaceChild(editBtn, editBtnOK);
            editBtnCancel.parentNode.replaceChild(deleteBtn, editBtnCancel);
            isNotEditingItem = true;
        });

        // Enter acepta la edición
        editableTask.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                // Evita el comportamiento por defecto de Enter
                event.preventDefault();
                // Llama al botón que se desea pulsar
                editBtnOK.click();
            }
        });

        // Se crea el botón Cancelar
        let editBtnCancel = document.createElement("button");
        editBtnCancel.classList.add("editBtnCancel");
        editBtnCancel.innerText = "Cancelar";
        editBtnCancel.addEventListener("click", () => {
            editableTask.parentNode.replaceChild(task, editableTask);
            editBtnOK.parentNode.replaceChild(editBtn, editBtnOK);
            editBtnCancel.parentNode.replaceChild(deleteBtn, editBtnCancel);
            isNotEditingItem = true;
        });

        // Escape cancela la edición
        editableTask.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                // Evita el comportamiento por defecto de Enter
                event.preventDefault();
                // Llama al botón que se desea pulsar
                editBtnCancel.click();
            }
        });

        // Se reemplazan los elementos
        task.parentNode.replaceChild(editableTask, task);
        editBtn.parentNode.replaceChild(editBtnOK, editBtn);
        deleteBtn.parentNode.replaceChild(editBtnCancel, deleteBtn);

        // Focus el campo
        editableTask.focus();
    })

    // Crea un botón con clase "deleteItemBtn"
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "Borrar";

    // DUDA -> ¿Hay alguna manera de introducir un atributo onclick?
    deleteBtn.addEventListener("click", () => {
        if (confirm("¿Seguro que deseas borrarlo?")) {
            // Método para eliminar un elemento
            li.classList.add("deleted")
            setTimeout(()=>{
                li.parentNode.removeChild(li);
            }, 1000)
            // Se elimina del objeto la entrada
            delete toDoList[id];
        }
    })

    // Inserta cada elemento en el li
    li.append(checkbox, task, editBtn, deleteBtn);

    // Inserta el li dentro del ul
    list.appendChild(li);
}
