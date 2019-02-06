'use strict';

class Clock {
    constructor(options) {
        this._elem = options;
        this._render();
        this._elem.addEventListener('click', this.listener.bind(this));
        //document.querySelector('.button--stop').addEventListener('click', ()=> this.stop.bind(this));
    }
    _render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let min = date.getMinutes();
        if (min < 10) min = '0' + min;

        let sec = date.getSeconds();
        if (sec < 10) sec = '0' + sec;

        let output = `<span class="hour">${hours}</span>:<span class="min">${min}</span>:<span class="sec">${sec}</span>
        <div>
        <input type="button" class="button--start" value="Старт">
        <input type="button" class="button--stop" value="Стоп">
        <input type="button" onclick="alert('Часы должны останавливаться во время alert,\\nи продолжать корректно работать после нажатия на ОК')" value="alert для проверки корректного возобновления">
        </div>`;
        this._elem.innerHTML = output;
    }

    listener(event) {
        let target = event.target;

        if (target.tagName != 'INPUT') return;
        if (target.closest('.button--start')) {
            this.start();
        }
        if (target.closest('.button--stop')) {
            this.stop();
        }
    }

    start() {

        this._render();
        let renderInterval = this._render.bind(this);
        this._timer = setInterval(renderInterval, 1000);
    }
    stop() {
        clearInterval(this._timer);
    }
}
let element = document.getElementById('clock');

let pageClock = new Clock(element);
pageClock.start();
