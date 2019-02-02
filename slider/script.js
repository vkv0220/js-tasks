'use strict';

class Slider {
    constructor(options) {
        this.elem = options.elem;
        this.render();
        this.thumbElem = this.elem.querySelector('.thumb');
        this.shiftX;
        this.shiftY
        this.sliderCoords;
        this.thumbCoords;
        this.elem.ondragstart = () => false;
        this.bindedMove = this.onDocumentMouseMove.bind(this);
        this.bindedUp = this.onDocumentMouseUp.bind(this);
        this.elem.addEventListener('mousedown', this.move.bind(this));
    }

    move(event) {
        if (event.target.closest('.thumb')) {
            this.startDrag(event.clientX, event.clientY);
            console.log(event.clientX, event.clientY);
            return false; // disable selection start (cursor change)
        }
    }

    startDrag(startClientX, startClientY) {
        this.thumbCoords = this.thumbElem.getBoundingClientRect();
        this.shiftX = startClientX - this.thumbCoords.left;
        this.shiftY = startClientY - this.thumbCoords.top;

        this.sliderCoords = this.elem.getBoundingClientRect();

        document.addEventListener('mousemove', this.bindedMove);
        document.addEventListener('mouseup', this.bindedUp);
    }



    _moveTo(clientX) {
        // вычесть координату родителя, т.к. position: relative
        let newLeft = clientX - this.shiftX - this.sliderCoords.left;

        // курсор ушёл вне слайдера
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = this.elem.offsetWidth - this.thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        this.thumbElem.style.left = newLeft + 'px';
    }


    onDocumentMouseMove(e) {
        this._moveTo(e.clientX);
    }

    onDocumentMouseUp() {
        this.endDrag();
    }


    endDrag() {
        document.removeEventListener('mousemove', this.bindedMove);
        document.removeEventListener('mouseup', this.bindedUp);
    }

    render() {
        this.elem.innerHTML= `<div class="thumb"></div>`;
    }
}



let sliderElem = document.getElementById('slider');

let slider = new Slider({elem: sliderElem});