class CheckedList {
    constructor(options, items) {
        this.element = options.elem;
        this.items = items;
        this._render();
        this.lastClickedLi = null;
        this.element.addEventListener('click', this._select.bind(this));
        this.element.addEventListener('mousedown', () => false);
        this.element.querySelector('.button').addEventListener('click', this.getSelected.bind(this));
    }

    _render() {
        this.element.innerHTML = ` ${this.items.map((item) => `<li>${item}</li>`).join('')}
        <button class="button">Selected</button>`;
    }

    _select(event) {
        let target = event.target;

        // возможно, клик был внутри списка UL, но вне элементов LI
        if (target.tagName != "LI") return;

        // для Mac проверяем Cmd, т.к. Ctrl + click там контекстное меню
        if (event.metaKey || event.ctrlKey) {
            this._toggleSelect(target);
        } else if (event.shiftKey) {
            this._selectFromLast(target);
        } else {
            this._selectSingle(target);
        }

        this.lastClickedLi = target;
    }

    _toggleSelect(li) {
        li.classList.toggle('selected');
    }

    _selectFromLast(target) {
        const startElem = this.lastClickedLi || this.element.children[0];

        const isLastClickedBefore = startElem.compareDocumentPosition(target) & 4;

        if (isLastClickedBefore) {
            for (var elem = startElem; elem != target; elem = elem.nextElementSibling) {
                elem.classList.add('selected');
            }
        } else {
            for (var elem = startElem; elem != target; elem = elem.previousElementSibling) {
                elem.classList.add('selected');
            }
        }
        elem.classList.add('selected');
    }

    _deselectAll() {
        for (let i = 0; i < this.element.children.length; i++) {
            this.element.children[i].classList.remove('selected');
        }
    }

    _selectSingle(li) {
        this._deselectAll();
        li.classList.add('selected');
    }

    getSelected() {
        let arr = this.element.querySelectorAll('.selected');
        //let arr2 = Array.prototype.map.call(arr, (item) => item.innerText);
        // return arr;
        // let textList = [...arr].map((item) => item.innerText + '\n').join('');
        let textList = [...arr].map((item) => item.innerText);

        if (arr.length === 0) {
            alert('Ничего не выбрано');
        } else alert(textList);
    }
}

let items = ["Кристофер Робин", "Винни-Пух", "Ослик Иа", "Мудрая Сова", "Кролик. Просто кролик."];

let checkedList = new CheckedList({elem: document.querySelector('ul')}, items);