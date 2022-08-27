
const container = document.querySelector('.gridContainer');
const containerSize = Number(getComputedStyle(container).width.slice(0, -2));
const range = document.querySelector('#range');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('.clear');

let gridSize = range.value;
output.textContent = `${gridSize}px`;

range.addEventListener("input", () => output.textContent = `${range.value}px`);
range.addEventListener("change", resizeGrid);
clearBtn.addEventListener("click", clearGrid);

function drawGrid() {

    for (let row = 1; row <= gridSize; row++) {
        for (let column = 1; column <= gridSize; column++) {
            const pixel = document.createElement('div');
            pixel.classList.add('cell');
            pixel.setAttribute("id", `row: ${row} column: ${column}`);
            pixel.setAttribute("style", `height: ${(containerSize/gridSize)}px; width: ${(containerSize/gridSize)}px`);
            container.appendChild(pixel);
            pixel.addEventListener("mouseover", colorGrid);
        }
    }
};

function colorGrid(e) {
    /*const mousePos = e.target;
    console.log(mousePos.id); */

    let cell = e.target;

    /* stop the parent container from colouring in */
    e.stopPropagation();

    return cell.style.backgroundColor = getColor();
};

function resizeGrid() {

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    gridSize = this.value;
    output.textContent = `${gridSize}px`;

    drawGrid();
};

function clearGrid() {

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    drawGrid();
};

function getColor() {

    const color = document.querySelector("#colorwheel");
    return color.value;
}

drawGrid();