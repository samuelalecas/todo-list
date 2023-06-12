const DIRECTIONS = {
    UP: Symbol(),
    DOWN: Symbol(),
}

let toDoList = [];
let isNotEditingItem = true;
const inputBox = document.getElementById("inputBox");
const inputBoxBtn = document.getElementById("inputBoxBtn");
const list = document.getElementById("list");

// -----------------------------------------

// Actualiza el array del localStorage
function updateLocalStorage(array) {
    localStorage.setItem("list", JSON.stringify(array));
}

// Actualiza el listado en pantalla
function updateScreen(array) {
    list.innerHTML = "";
    for (index in array) {
        insertNewToDoItem(index, array[index]);
    }
}

// ------------------------------------------

// FUNCIÓN -> Controla la acción del botón "Enviar"
const handleClickButton = () => {
    newToDoItem(inputBox.value);
    inputBox.value = "";
}

// Usar Enter para activar botón
inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isNotEditingItem) {
        // Evita el comportamiento por defecto de Enter
        event.preventDefault();
        // Llama al botón que se desea pulsar
        // inputBoxBtn.click();
        handleClickButton();
    }
});

// -----------------------------------------

// FUNCIÓN -> Creación de un nuevo item del listado
const newToDoItem = (taskName) => {

    if (taskName === "") {
        alert("Por favor, inserte una tarea");
        return;
    }
    let item = {
        task: taskName,
        complete: false,
    }

    // Se actualiza el array
    toDoList.push(item);
    // Se introduce en el localStorage
    updateLocalStorage(toDoList);
    // Se actualiza la lista
    updateScreen(toDoList);
}

// -----------------------------------------

const insertNewToDoItem = (id, item) => {
    // Crea un li que tenga de id el número del objeto
    let li = document.createElement("li");
    li.classList.add("toDoItem", "animationIn");
    // setTimeout(() => {
    //     li.classList.add("animationIn");
    // }, 0)

    // Crea un checkbox con clase "checkbox"
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    // Se le puede añadir un addEventListener en cada checkbox al crearlos
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // OJO - Hay que asignar clase
            li.style.textDecoration = 'line-through';
            item["complete"] = true;
            updateLocalStorage(toDoList);
        } else {
            li.style.textDecoration = 'none';
            item["complete"] = false;
            updateLocalStorage(toDoList);
        }
    });

    // Crea un div con clase "task"
    let task = document.createElement("div");
    task.classList.add("task");
    task.innerText = item["task"];

    // Crea un botón con clase "editItemBtn"
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Editar";
    editBtn.addEventListener("click", () => {
        // Enter ahora no introduce valor, sino que acepta la edición
        isNotEditingItem = false;

        // Se crea el campo de texto
        let editableTask = document.createElement("input");
        editableTask.setAttribute("type", "text");
        editableTask.setAttribute("placeholder", item["task"]);
        editableTask.classList.add("editable-task");

        // Se crea el botón Aceptar
        let editBtnOK = document.createElement("button");
        editBtnOK.classList.add("editBtnOK");
        editBtnOK.innerText = "Aceptar";
        editBtnOK.addEventListener("click", () => {
            if (editableTask.value === "") {
                item["task"] = item["task"];
            } else {
                item["task"] = editableTask.value;
                updateLocalStorage(toDoList);
            }
            task.innerText = item["task"];
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

    deleteBtn.addEventListener("click", () => {
        if (confirm("¿Seguro que deseas borrarlo?")) {
            toDoList.splice(id, 1);
            updateLocalStorage(toDoList);
            li.classList.add("animationOut")
            setTimeout(() => {
                updateScreen(toDoList);
            }, 1000)

        }
    })

    // Se crea un botón de subida
    let upBtn = document.createElement('button');
    upBtn.classList.add("upBtn");
    upBtn.innerText = "▲";
    upBtn.addEventListener("click", () => {
        moveItemList(toDoList.indexOf(item), DIRECTIONS.UP, toDoList);
    });

    // Se crea un botón de bajada
    let downBtn = document.createElement('button');
    downBtn.classList.add("downBtn");
    downBtn.innerText = "▼";
    downBtn.addEventListener("click", () => {
        moveItemList(toDoList.indexOf(item), DIRECTIONS.DOWN, toDoList);
    });

    // Se meten en un mismo div
    let moveBtnsDiv = document.createElement('div');
    moveBtnsDiv.classList.add("moveBtnsDiv");
    moveBtnsDiv.append(upBtn, downBtn);

    // Inserta cada elemento en el li
    li.append(checkbox, task, editBtn, deleteBtn, moveBtnsDiv);

    // Inserta el li dentro del ul
    list.appendChild(li);
}

// -----------------------------------------

function moveItemList(index, direction, array) {

    if (direction === DIRECTIONS.UP) {
        if (index === 0) {
            return;
        }
        swapElementsArray(array, index - 1, index);
        updateLocalStorage(toDoList);
        updateScreen(array);
    }

    if (direction === DIRECTIONS.DOWN) {
        if (index === array.length - 1) {
            return;
        }
        swapElementsArray(array, index, index + 1);
        updateLocalStorage(toDoList);
        updateScreen(array);
    }
}

// Intercambia de lugar dos elementos de un array
function swapElementsArray(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// -----------------------------------------

// NADA MÁS EMPEZAR...
// Lee el localStorage y lo pasa a un array
toDoList = (localStorage["list"] === undefined) ? [] : JSON.parse(localStorage["list"]);
// Con ese nuevo array, pinta el listado
updateScreen(toDoList);
