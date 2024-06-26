
const send = document.querySelector("#send");
const do_comp_name = document.querySelector('#do_comp_name');
const do_obs = document.querySelector('#do_obs');

const hora = document.querySelector('#hora');
const minuto = document.querySelector('#minuto');
const segundo = document.querySelector('#segundo');

const erase = document.querySelector('#erase')

var lista = document.querySelector('#history');


var _segundo = 50;
var _minuto = 0;
var _hora = 0;
var _millisegundo = 0;

var controle = 0


const _play = document.querySelector('#play');
const _stop = document.querySelector('#stop');
_play.onclick = () => start();
_stop.onclick = () => stop(); 


function sender() {

    console.log(hora.value)

    lista.innerHTML += `
            <div class="info" id="a${controle}">
                <span class="comp_name">${do_comp_name.value}</span>
                <span class="spend_time">${_hora}:${_minuto}:${_segundo}</span>
                <span class="obs">${do_obs.value}</span>
                <button class="erase" id="erase" onclick="eraser(${controle})">X</button>
            </div> `;
            
    controle += 1;
}


function eraser(n) {

    document.getElementById('a' + n).remove();
}

var cron;

function start () {
    stop();
    cron = setInterval(() => {timer();}, 100);
}

function stop() {
    clearInterval(cron);
    console.log(_segundo)
}

function timer() {
    if ((_millisegundo += 10) == 100) {
        _millisegundo = 0;
        _segundo++;
        segundo.innerHTML = _segundo;

    }
    if (_segundo == 60) {
        _segundo = 0;
        _minuto++;
        minuto.innerHTML = _minuto;
    }
    if (_minuto == 60 ) {
        _minuto = 0;
        _hora++;
        hora.innerHTML = _hora
    }
}


