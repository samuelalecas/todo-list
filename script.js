let toDoList = [];
const textBox = document.getElementById("textBox");


const getValue = () => {
    toDoList.push(textBox.value);
    textBox.value = "";
    console.log(toDoList);
}