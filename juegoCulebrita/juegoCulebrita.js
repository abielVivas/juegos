const grid = document.getElementById("grid");

for (i = 0; i <= 99; i++) {
  const div = document.createElement("div");
  div.className = "casilla";
  div.id = i; 
  grid.appendChild(div);
}
var direccion = "derecha";
var posicionX = 0;
var posicionY = 0;
var culebra = [];
var manzanas = 1;
var posicionManzana = Math.floor(Math.random() * 100);
var fondo = document.getElementsByClassName("casilla");
function morir(){
    alert("game over")
    location.reload()
}

function chocar(posicion){
    console.log(posicion)
    if(posicion < 0 || posicion > 9){
        morir()
    }
}

function moverse(){
    if (direccion == "arriba") {
        posicionY = posicionY - 1;
    }
    if (direccion == "abajo") {
        posicionY = posicionY + 1;
    }
    if (direccion == "izquierda") {
        posicionX = posicionX - 1;
    }
    if (direccion == "derecha") {
        posicionX = posicionX + 1;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" && direccion != "abajo") {
        direccion = "arriba"
    }
    if (event.key == "ArrowDown" && direccion != "arriba"){
        direccion = "abajo"
    }
    if (event.key == "ArrowLeft" && direccion != "derecha") {
        direccion = "izquierda"
    }
    if (event.key == "ArrowRight" && direccion != "izquierda") {
        direccion = "derecha"
    }
});

function start() {
    moverse()
    var posicion = `${posicionY}` + `${posicionX}`;
    if(posicion[0] != "0"){
        culebra.push(posicion)
    }else{
        culebra.push(posicion[1])
    }
    if(culebra.length > manzanas){
        culebra.shift()
    }
    chocar(posicionX);
    chocar(posicionY);
    //pintar fondo
    var lugarManzana = document.getElementById(posicionManzana);
    for (i = 0; i < fondo.length; i++) {
        fondo[i].style.backgroundColor = "white";
    }
    lugarManzana.style.backgroundImage = "url('https://media.istockphoto.com/id/1141529240/es/vector/simple-manzana-en-estilo-plano-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=LVaXkw5udL6sGP5cQT7PHq122aaZrYs2RUDwk7-hOh8=')"
    lugarManzana.style.backgroundPosition = "absolute";
    lugarManzana.style.backgroundSize = "cover";
    lugarManzana.style.width = "50px";
    lugarManzana.style.height = "50px";
    //pintar culebra
    culebra.forEach(num => {
        const div = document.getElementById(num);
        div.style.backgroundColor = "green";
        if(posicion == posicionManzana){
            lugarManzana.removeAttribute("style")
            div.style.backgroundColor = "green";
            posicionManzana = Math.floor(Math.random() * 100);
            while(culebra.includes(posicionManzana)){
                posicionManzana = Math.floor(Math.random() * 100);
            }
            manzanas ++;
        }
    });
    //chocar con ella misma
    for(i = 0; i < culebra.length; i ++){
        for(j = 0; j < culebra.length; j ++){
            if(j == i){
                j++;
            }
            if(culebra[i] == culebra[j]){
                morir();
            }
        }
    }
    setTimeout(start, 300);
}
document.addEventListener("keydown", function(event){
    if(event.key == " "){
            start()
        }
    }
)