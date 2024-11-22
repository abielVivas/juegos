const buttom = document.getElementById("reload")
buttom.addEventListener("click",function(){
    window.location.reload();
})
let direction;
let aPressed = false;
let dPressed = false;
let jumping = false;

const element = document.querySelector("#doll");
const style = window.getComputedStyle(element);

let elementFloor1 = document.querySelector("#floor1");
let elementFloor2 = document.querySelector("#floor2");
let elementFloor3 = document.querySelector("#floor3");
let elementFloor4 = document.querySelector("#floor4");
floor1Position = elementFloor1.getBoundingClientRect();
floor2Position = elementFloor2.getBoundingClientRect();
floor3Position = elementFloor3.getBoundingClientRect();
floor4Position = elementFloor4.getBoundingClientRect();


let floor;
let floorRight;
let floorLeft;
function verifyFloor(){
    let dollPosition = element.getBoundingClientRect();
    if(dollPosition.right > floor1Position.left && dollPosition.left < floor1Position.right && dollPosition.bottom < floor1Position.bottom){
        floor = floor1Position.top;
        floorRight = floor2Position;
        floorLeft = 1000
    }
    else if(dollPosition.right > floor2Position.left && dollPosition.left < floor2Position.right && dollPosition.bottom < floor2Position.bottom){
        floor = floor2Position.top;
        floorRight = floor3Position;
        floorLeft = floor1Position;
    }
    else if(dollPosition.right > floor3Position.left && dollPosition.left < floor3Position.right && dollPosition.bottom < floor3Position.bottom){
        floor = floor3Position.top;
        floorLeft = floor2Position;
        floorRight = floor4Position;
    }
    else if(dollPosition.right > floor4Position.left && dollPosition.left < floor4Position.right && dollPosition.bottom < floor4Position.bottom){
        floor = floor4Position.top;
        floorLeft = floor3Position;
    }
    else{
        floor = 1000
    }
    return floor;
}

function verifyCrash(){

    if(direction === "right" && floorRight){
        let dollPosition = element.getBoundingClientRect();
        if(dollPosition.right >= floorRight.left && dollPosition.bottom > floorRight.top){
            console.log("hola")
            let currentPosition = parseInt(style.getPropertyValue("left"));
            currentPosition = currentPosition - 5;
            element.style.left = currentPosition + "px";
            window.requestAnimationFrame(verifyCrash);
        }
    }
    if (direction === "left") {
        let dollPosition = element.getBoundingClientRect();
        console.log(`floorLeft:`, floorLeft ); 
        if (floorLeft && dollPosition.left <= floorLeft.right && dollPosition.bottom > floorLeft.top && dollPosition.top < floorLeft.bottom) {
            console.log(`dollPosition.left:${dollPosition.left}, floorLeft.right:${floorLeft.right}`);
            let currentPosition = parseInt(style.getPropertyValue("left"));
            currentPosition = currentPosition + 5;
            element.style.left = currentPosition + "px";
            window.requestAnimationFrame(verifyCrash);
        }
    }

}
function goRight() {
    if (dPressed) {
        direction = "right"
        let dollPosition = element.getBoundingClientRect();
        let currentPosition = parseInt(style.getPropertyValue("left"));
        currentPosition = currentPosition + 5;
        element.style.left = currentPosition + "px";
        verifyCrash();
        let floor = verifyFloor();
        if (dollPosition.bottom < floor && jumping == false){
            fall()
        }
        window.requestAnimationFrame(goRight);
    }
}

function goLeft() {
    if (aPressed) {
        direction = "left"
        let dollPosition = element.getBoundingClientRect();
        let currentPosition = parseInt(style.getPropertyValue("left"));
        currentPosition = currentPosition - 5;
        element.style.left = currentPosition + "px";
        verifyCrash();
        let currentFloor = verifyFloor();

        if (dollPosition.top < currentFloor &&  jumping == false){
            fall();
        }
        window.requestAnimationFrame(goLeft);
    }
}

let gravity = 2;
function fall() {
    let dollPositionTop = parseInt(style.getPropertyValue("top"));
    let dollPosition = element.getBoundingClientRect();
    let currentPosition = dollPositionTop;
    currentPosition += gravity;
    let floor = verifyFloor();
    element.style.top = currentPosition + "px";
    if (dollPosition.bottom >= floor) {
        element.style.top = floor - 30 + "px";
        gravity = 2;
        return;
    }
    window.requestAnimationFrame(fall);
}

let acceleration = -20;
function jump() {
    jumping = true;
    let currentPosition = parseInt(style.getPropertyValue("top"));
    currentPosition += acceleration;
    acceleration += 2;
    element.style.top = currentPosition + "px";
    floor = verifyFloor();
    let dollPosition = element.getBoundingClientRect();
    if(dollPosition.bottom > floor){
        element.style.top = floor - 30 + "px";
        jumping = false;
        acceleration = -20;
    }
    if (jumping) {
        window.requestAnimationFrame(jump);
    }
}

document.addEventListener("keydown", function (eventkeydown) {
    if (eventkeydown.key == "w") {
        if(jumping == false){
            jump();
        }
    }
    if (eventkeydown.key == "a" && !aPressed) {
        aPressed = true;
        goLeft();
    }
    if (eventkeydown.key == "d" && !dPressed) {
        dPressed = true;
        goRight();
    }
});

document.addEventListener("keyup", function (eventkeyup) {
    if (eventkeyup.key == "a") {
        aPressed = false;
    }
    if (eventkeyup.key == "d") {
        dPressed = false;
    }
});
