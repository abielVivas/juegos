document.addEventListener('DOMContentLoaded', function() {
    var celdas = document.querySelectorAll(".cell");
    var turno = 'X';
    var arrayX = [];
    var arrayO = [];
    var juegoEmpatado = false;
    var winner = false;
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
            let win = combinacion.every(pos => array.includes(pos));
            if (win) {
                winner = true
                alert(`El ganador es ${turno}`);
                location.reload(true);
                return;
            }
        }
    }

    celdas.forEach(function(celda) {
        celda.addEventListener('click', function() {
            if (celda.textContent === '') {
                if (turno === 'X') {
                    arrayX.push(celda.dataset.pos);
                    celda.textContent = 'X';
                    celda.style.color = 'white';
                    setTimeout(function() {
                        checkWinner(arrayX, turno);
                        turno = 'O';
                    }, 0);
                } else {
                    arrayO.push(celda.dataset.pos);
                    celda.textContent = 'O';
                    celda.style.color = 'black';
                    setTimeout(function() {
                        checkWinner(arrayO, turno);
                        turno = 'X';
                    }, 0);
                }
            }
            if(arrayO.length == 4 && arrayX.length == 5){
                juegoEmpatado = true
            }
            setTimeout(function(){
                function alertarElEmpate(){
                    if(juegoEmpatado == true && winner == false){
                        alert('empate');
                        location.reload();
                    }
                }
                alertarElEmpate()
            } , 0)
        });
    });
});
