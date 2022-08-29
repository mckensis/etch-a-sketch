
const container = document.querySelector('.gridContainer');
const containerSize = Number(getComputedStyle(container).width.slice(0, -2));
const range = document.querySelector('#range');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('.clear');

let gridSize = range.value;
output.textContent = `${gridSize}px`;
let isDown = false;

function drawGrid() {

    for (let row = 1; row <= gridSize; row++) {
        for (let column = 1; column <= gridSize; column++) {
            const pixel = document.createElement('div');
            pixel.classList.add('cell');
            pixel.setAttribute("id", `row: ${row} column: ${column}`);
            pixel.setAttribute("style", `height: ${(containerSize/gridSize)}px; width: ${(containerSize/gridSize)}px`);
            container.appendChild(pixel);
        }
    }
    listeners();
};

drawGrid();

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

function colorGrid(e) {

    e.preventDefault();

    if (container.addEventListener("mousedown", () => { return isDown = true}));
    if (container.addEventListener("mouseup", () => { return isDown = false}));

    if(isDown) {
        e.preventDefault();
        let cell = e.target;
        let isDown = false;
        e.stopPropagation();
        cell.style.backgroundColor = getColor();
    }
}

// Function to handle touchscreen colouring
function touchColorGrid(e) {

    // Prevent scrolling page 
    e.preventDefault();
    e.stopPropagation();
    // Colour the cell from the initial touch
    let cell = e.target;
    cell.style.backgroundColor = getColor();
    // Set mouse to not be clicked
    isDown = false;

    // Get the boundaries of the container
    let containerL = container.getBoundingClientRect().left;
    let containerT = container.getBoundingClientRect().top;
    let containerR = container.getBoundingClientRect().right;
    let containerB = container.getBoundingClientRect().bottom;

    // When finger moves over container, colour pixel
    container.addEventListener("touchmove", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;
        
        // Checking if the finger is within the left/right/top/bottom container coordinates
        if (touchX > containerL && touchX < containerR) {
            if (touchY > containerT && touchY < containerB) {
                
                // Set the cell to the div where the finger is
                cell = document.elementFromPoint(touchX, touchY);
                let parent = cell.parentNode;
                
                // If the cell is within container colour it,
                // This is needed to provide room for error with finger touches
                if (parent === container) {
                    cell.style.backgroundColor = getColor();
                    e.stopPropagation();
                }
            }
        }
    });

    /* Don't think this is needed */
    //container.addEventListener("touchend", () => { return});
}

function listeners() {
    range.addEventListener("input", () => output.textContent = `${range.value}px`);
    range.addEventListener("change", resizeGrid);
    clearBtn.addEventListener("click", clearGrid);
    container.addEventListener("mousemove", colorGrid);
    container.addEventListener("touchstart", touchColorGrid);
}