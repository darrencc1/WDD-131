const background = document.querySelector("body");
// const wordCol = document.querySelector("p");
let logo = document.querySelector("img");
let mode = document.querySelector('select');
// console.log(logo);
// console.log(mode);
mode.addEventListener('change', changeMode);

function changeMode() {
    let current = mode.value;
    if (current == 'dark') {
        // background.style.backgroundColor = 'black';
        // wordCol.style.color = 'white';
        background.classList.add("dark-mode");
        // Since dark-mode is added to the body as a class. Everything will inherit the inheritable css rules
        logo.setAttribute('src', 'byui-logo-dark.png');
    }
    else {
        // background.style.backgroundColor = 'white';
        background.classList.remove("dark-mode");
        logo.setAttribute('src', 'byui-logo.webp');

    }
};