let toDoList = {};
let id = 0;
const inputBox = document.getElementById("inputBox");
const inputBoxBtn = document.getElementById("inputBoxBtn");

const getValue = () => {
    newToDoItem();
    inputBox.value = "";
    console.log(toDoList);
}

// Usar Enter para introducir datos
// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

inputBox.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
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
    id++;
}
