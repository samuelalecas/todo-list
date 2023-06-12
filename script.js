// Almacenar la información en localStorage
function saveItemToLocalStorage(id, item) {
    localStorage.setItem(id, JSON.stringify(item));
}

// Crear una función que añada elementos en localStorage

// Crear una función que lea el localStorage y pinte la pantalla


let toDoList = [];
let isNotEditingItem = true;
const inputBox = document.getElementById("inputBox");
const inputBoxBtn = document.getElementById("inputBoxBtn");
const list = document.getElementById("list");

// Función asignada al botón
const handleClickButton = () => {
    newToDoItem(inputBox.value);
    inputBox.value = "";
}

// Usar Enter para introducir datos
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isNotEditingItem) {
        // Evita el comportamiento por defecto de Enter
        event.preventDefault();
        // Llama al botón que se desea pulsar
        // inputBoxBtn.click();
        handleClickButton();
    }
});

const newToDoItem = (taskName) => {
    // Se crea nueva entrada en el objeto
    if (taskName === "") {
        alert("Por favor, inserte una tarea");
        return;
    }

    let item = {
        task: taskName,
        complete: false,
    }

    // Se introduce el item en el array
    toDoList.push(item);

    // Se introduce en el localStorage
    saveItemToLocalStorage((toDoList.length - 1), item);

    // Se crea un nuevo nodo
    insertNewToDoItem(toDoList);
}

const insertNewToDoItem = (array) => {
    let id = array.length - 1;
    // Crea un li que tenga de id el número del objeto
    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.classList.add("toDoItem");
    setTimeout(() => {
        li.classList.add("animationIn");
    }, 0)

    // Crea un checkbox con clase "checkbox"
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    // Se le puede añadir un addEventListener en cada checkbox al crearlos
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // OJO - Hay que asignar clase
            li.style.textDecoration = 'line-through';
            toDoList[id]["complete"] = true;
        } else {
            li.style.textDecoration = 'none';
            toDoList[id]["complete"] = false;
        }
    });

    // Crea un div con clase "task"
    let task = document.createElement("div");
    task.setAttribute("id", `task-${id}`);
    task.classList.add("task");
    task.innerText = toDoList[id].task;

    // Crea un botón con clase "editItemBtn"
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Editar";
    editBtn.addEventListener("click", () => {
        let currentId = li.id;
        // Enter ahora no introduce valor, sino que acepta la edición
        isNotEditingItem = false;

        // Se crea el campo de texto
        let editableTask = document.createElement("input");
        editableTask.setAttribute("type", "text");
        editableTask.setAttribute("placeholder", toDoList[currentId]["task"]);
        editableTask.classList.add("editable-task");

        // Se crea el botón Aceptar
        let editBtnOK = document.createElement("button");
        editBtnOK.classList.add("editBtnOK");
        editBtnOK.innerText = "Aceptar";
        editBtnOK.addEventListener("click", () => {
            if (editableTask.value === "") {
                toDoList[currentId]["task"] = toDoList[currentId]["task"];
            } else {
                toDoList[currentId]["task"] = editableTask.value;
            }
            task.innerText = toDoList[currentId]["task"];
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
            let currentId = li.id;
            toDoList.splice(currentId, 1);
            li.classList.add("animationOut")
            setTimeout(() => {
                li.parentNode.removeChild(li);
                // Se resetean las id de los li
                resetIds();
            }, 1000)

        }
    })

    // Se crea un botón de subida
    let upBtn = document.createElement('button');
    upBtn.classList.add("upBtn");
    upBtn.innerText = "▲";
    upBtn.addEventListener("click", () => {
        let index = +upBtn.parentNode.parentNode.id;
        moveItemList(index, DIRECTIONS.UP, toDoList);
    });

    // Se crea un botón de bajada
    let downBtn = document.createElement('button');
    downBtn.classList.add("downBtn");
    downBtn.innerText = "▼";
    downBtn.addEventListener("click", () => {
        let index = +downBtn.parentNode.parentNode.id;
        moveItemList(index, DIRECTIONS.DOWN, toDoList);
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

const DIRECTIONS = {
    UP: Symbol(),
    DOWN: Symbol(),
}

function moveItemList(index, direction, array) {

    if (direction === DIRECTIONS.UP) {
        if (index === 0) {
            return;
        }
        swapElementsArray(array, index - 1, index);
        moveUpDOM(index);
    }

    if (direction === DIRECTIONS.DOWN) {
        if (index === array.length - 1) {
            return;
        }
        swapElementsArray(array, index, index + 1);
        moveDownDOM(index);
    }
}

// Intercambia de lugar dos elementos de un array
function swapElementsArray(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// Desplaza los elementos del DOM hacia arriba y reemplaza los ID
function moveUpDOM(id) {
    let prevId = (id - 1).toString();

    let goUpItem = document.getElementById(id);
    let goDownItem = document.getElementById(prevId);

    goUpItem.setAttribute("id", prevId);
    goDownItem.setAttribute("id", id);

    goUpItem.after(goDownItem);
}

// Desplaza los elementos del DOM hacia abajo y reemplaza los ID
function moveDownDOM(id) {
    let nextId = (id + 1).toString();

    let goDownItem = document.getElementById(id);
    let goUpItem = document.getElementById(nextId);

    goDownItem.setAttribute("id", nextId);
    goUpItem.setAttribute("id", id);

    goDownItem.before(goUpItem);
}

// Resetear las id de todos los items de la lista
function resetIds() {
    let items = list.querySelectorAll("li");

    for (let i = 0; i < items.length; i++) {
        items[i].setAttribute("id", i);
    }
}

// function swapIndexToAfter(index, array){
//     if (index > array.length || index < 0) return array;
//     let newArray = [...array];
//     newArray.splice(index-1, 0, newArray[index]);
//     newArray.splice(index+1,1);
//     return newArray;
// }
