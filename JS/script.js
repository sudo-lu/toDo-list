
const send = document.querySelector("#send");
const do_comp_name = document.querySelector('#do_comp_name');
const do_obs = document.querySelector('#do_obs');

const hora = document.querySelector('#hora');
const minuto = document.querySelector('#minuto');
const segundo = document.querySelector('#segundo');

const erase = document.querySelector('#erase')

var lista = document.querySelector('#history');


var _segundo = 23;
var _minuto = 43;
var _hora = 1;

var controle = 0

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