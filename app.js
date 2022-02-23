"use strict";

function setGrid(divs){
    const gridWidth = 600;
    const gridHeight = 400;
    const divWidth = gridWidth / divs;
    const divHeight = gridHeight / divs;
    for (let i=0; i<divs**2; i++){
        const div = document.createElement("div");
        div.style.width = `${divWidth}px`;
        div.style.height = `${divHeight}px`;
        grid.appendChild(div);
    }
}

let divs = 16;
let defaultColor = document.querySelector(".default");
defaultColor.classList.add("active");
const grid = document.querySelector(".container");
grid.classList.add("black");
const reset = document.querySelector(".reset");
const eraser = document.querySelector(".eraser");
const btnRandom = document.querySelector(".random");

document.addEventListener("DOMContentLoaded", setGrid(divs));
let divsGrid = document.querySelectorAll(".container div");
printColor(divsGrid);

function setDefaultColor(){
    const clase = "black";
    removeClass(clase);
    grid.classList.add(clase); 
}
defaultColor.addEventListener("click", setDefaultColor);

function setNewGrid(){
    let size = prompt("Enter the new size (max. 100", 16);
    if (!size){
        reset.classList.add("cancelled");
        if (size === "") alert ("Error! Put a number between 1 and 100");
        return;
    }
    if (isNaN(size) || size < 1 || size > 100){
        alert ("Error! Put a number between 1 and 100");
        return;
    }
    grid.innerHTML="";
    setGrid(size);
    divsGrid = document.querySelectorAll(".container div");
    printColor(divsGrid);
    
}

function printColor(divsGrid){
    divsGrid.forEach(div => div.addEventListener("mouseover",(e) => {
        console.log(divsGrid);
        if (grid.classList.contains("black")){
            e.target.style.backgroundColor= "#000";
        }
        else if (grid.classList.contains("random")){
            let randomColor = setRandomColor()
            e.target.style.backgroundColor= randomColor;
        }
        else if(grid.classList.contains("white")){
            e.target.style.backgroundColor= "#fff";
        }
    }));
}

function setRandomColor(){
    const simbolos = "0123456789ABCDEF";
    let randomColor = "#";

    for (let i=0; i<6; i++){
        randomColor += simbolos[Math.floor(Math.random() * 16)];
    }
    return randomColor;
}

function removeClass(claseABuscar){
    grid.classList.forEach(clase => {
        if (!clase.match(claseABuscar) && !clase.match("container")){
            grid.classList.remove(clase);
        }
    });
}

function random(){
    const clase = "random";
    removeClass(clase);
    grid.classList.add(clase);
}

function erase(){
    const clase = "white";
    removeClass(clase);
    grid.classList.add(clase);   
}

function setReset(){
    divsGrid.forEach(div => div.style.backgroundColor= "#fff");
    const clase = "black";
    removeClass(clase);
    grid.classList.add(clase);
}

function selectButton(botones, boton){
    for (const btn of botones) {
        btn.classList.remove("active");
    }
    if (boton.classList.contains("reset")){
        defaultColor.classList.add("active");
    }  
    if (!boton.classList.contains("cancelled")){
        const actual = grid.classList;
        for (const element of actual) {
            console.log(element);
            if (element === "black") defaultColor.classList.add("active");
            else if (element === "random") btnRandom.classList.add("active");
            else if (element === "white") eraser.classList.add("active");
        }
        console.log(actual);
    }
    if (boton.classList.contains("selected")){
        boton.classList.add("active");
    }
    
}

const botones = document.querySelectorAll(".options button");
botones.forEach(boton => boton.addEventListener("click", () => {
    console.log(boton);
    if (boton.textContent === "Default") setDefaultColor();
    if (boton.textContent === "Random") random();
    if (boton.textContent === "Eraser") erase();
    if (boton.textContent === "Reset") setReset();
    if (boton.textContent === "New Grid")setNewGrid();
    selectButton(botones, boton);
}));


