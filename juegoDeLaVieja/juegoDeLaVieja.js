document.addEventListener('DOMContentLoaded', function() {
    var celdas = document.querySelectorAll(".cell");
    var turno = 'X';
    var arrayX = [];
    var arrayO = [];
    var juegoTermiado =  false;
    function resetGame() {
        location.reload();
    }
    function checkWinner(array, turno) {

        const combinacionesGanadoras = [
            ['11', '12', '13'],
            ['21', '22', '23'],
            ['31', '32', '33'],
            ['11', '21', '31'],
            ['12', '22', '32'],
            ['13', '23', '33'],
            ['11', '22', '33'],
            ['13', '22', '31']
        ];

        for (let i = 0; i < combinacionesGanadoras.length; i++) {
            const combinacion = combinacionesGanadoras[i];
            let gano = combinacion.every(pos => array.includes(pos));
            if (gano) {
                alert(`El ganador es ${turno}`);
                juegoTermiado = true;
                resetGame();
                return;
            }
        }
    }

    celdas.forEach(function(celda) {
        celda.addEventListener('click', function() {
            if (celda.textContent === '') {
                if (turno === 'X') {
                    if (!arrayX.includes(celda.dataset.pos) && !arrayO.includes(celda.dataset.pos)) {
                        arrayX.push(celda.dataset.pos);
                        celda.textContent = 'X';
                        celda.style.color = 'white';
                        checkWinner(arrayX, turno);
                        turno = 'O';
                    }
                } else if (turno === 'O') {
                    if (!arrayO.includes(celda.dataset.pos) && !arrayX.includes(celda.dataset.pos)) {
                        arrayO.push(celda.dataset.pos);
                        celda.textContent = 'O';
                        celda.style.color = 'black';
                        checkWinner(arrayO, turno);
                        turno = 'X';
                    }
                }
            }
            if(arrayO.length == 4 && arrayX.length == 5 && juegoTermiado == false){
                alert(`empate
                    `);
                resetGame()
            }
        });
    });
});
