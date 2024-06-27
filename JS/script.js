
const send = document.querySelector("#send");
const do_comp_name = document.querySelector('#do_comp_name');
const do_obs = document.querySelector('#do_obs');

const hora = document.querySelector('#hora');
const minuto = document.querySelector('#minuto');
const segundo = document.querySelector('#segundo');

const erase = document.querySelector('#erase')

var lista = document.querySelector('#history');


var _millisegundo = 0;
var _segundo = 0;
var _minuto = 0;
var _hora = 0;

var controle = 0
var control_time_progress = '00:00:00';
const template_storage = {tempo: []};


const _play = document.querySelector('#play');
const _stop = document.querySelector('#stop');
const _reset = document.querySelector('#reset');
_play.onclick = () => start();
_stop.onclick = () => stop(); 
_reset.onclick = () => reset(); 


if (localStorage.getItem('registro') == undefined) {
    localStorage.setItem('registro', JSON.stringify(template_storage));
}

var registro = JSON.parse(localStorage.getItem('registro'));
    


function eraser(n) {

    document.getElementById('a' + n).remove();

    let current = 0;
    document.querySelector('#day_progress_sec').innerHTML -= registro.tempo[n].segundo;

}

var cron;

function start () {
    stop();
    cron = setInterval(() => {timer();}, 10);
}

function stop() {
    clearInterval(cron);
    console.log(_segundo)
}

function timer() {
    if ((_millisegundo += 10) == 100) {
        _millisegundo = 0;
        _segundo++;
        let ctr = ''
        if ( _segundo >= 10 ) {
            segundo.innerHTML = _segundo;
        } else {
            ctr = '0' + _segundo
            segundo.innerHTML = ctr;
        }
    }
    if (_segundo == 60) {
        _segundo = 0;
        _minuto++;
        let ctr = ''
        if ( _minuto >= 10 ) {
            minuto.innerHTML = _minuto;
        } else {
            ctr = '0' + _minuto
            minuto.innerHTML = ctr;
        }
    }
    if (_minuto == 60 ) {
        _minuto = 0;
        _hora++;
        let ctr = ''
        if ( _hora >= 10 ) {
            hora.innerHTML = _hora;
        } else {
            ctr = '0' + _hora
            hora.innerHTML = ctr;
        }
    }
}

function reset() {
    _millisegundo = 0;
    _segundo = 0;
    _minuto = 0;
    _hora = 0;

    segundo.innerHTML = _segundo;
    minuto.innerHTML = _minuto;
    hora.innerHTML = _hora
}



function increment () {

    let time_sec = 0;
    let time_min = 0;
    let time_hr = 0;


    for (let i = 0; i < registro.tempo.length; i++){
        time_sec += Number(registro.tempo[i].segundo);
        time_min += Number(registro.tempo[i].minuto);
        time_hr += Number(registro.tempo[i].hora);
    }

    if (time_sec >= 60) {
        time_sec -= 60
        time_min += 1
    }

    if (time_min >= 60) {
        time_min -= 60
        time_hr += 1
    }

    console.log(time_hr, time_min, time_sec);
    document.querySelector('#day_progress_hr').innerHTML = time_hr;
    document.querySelector('#day_progress_min').innerHTML = time_min;
    document.querySelector('#day_progress_sec').innerHTML = time_sec;
}


function sender() {

    console.log(hora.value)

    lista.innerHTML += `
            <div class="info" id="a${controle}">
                <span class="comp_name">${do_comp_name.value}</span>
                <span class="spend_time">${_hora}:${_minuto}:${_segundo}</span>
                <span class="obs">${do_obs.value}</span>
                <button class="erase" id="erase" onclick="eraser(${controle})">X</button>
            </div> `;
            
    registro.tempo.push({hora: _hora, minuto: _minuto, segundo: _segundo})
    localStorage.setItem('registro', JSON.stringify(registro));

    controle += 1;

    reset();
    increment();
}