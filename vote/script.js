class Voter {
    // ... ваш код
    constructor (options) {
        this._element = options.elem;
        this._render();
    }

    setVote() {

    }

    _render() {

    }

}

const voter = new Voter({
    elem: document.getElementById('voter')
});

voter.setVote(1);