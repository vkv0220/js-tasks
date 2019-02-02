class Voter {

    constructor (options) {
        this._element = options.elem;
        this._render();
        this.voteField = this._element.querySelector('.vote');
        //this.voteUpButton = this._element.querySelector('.up');
        this.voteDownButton = this._element.querySelector('.down');
        this._element.addEventListener('click', this._vote.bind(this));
        this._element.onmousedown = () => false;

    }

    setVote(value) {
        this.voteField.innerText = value;
    }

    _render() {
        this._element.innerHTML = `
          <span class="down">—</span>
          <span class="vote">0</span>
          <span class="up">+</span>`;
    }

    _vote(event) {
        let target = event.target;
        if (target.closest ('.up')) {
            this.voteField.innerText++;
        }
        if (target === this.voteDownButton) {
        //if (target.closest('.down')) {
            this.voteField.innerText--;
        }
    }

}

const voter = new Voter({
    elem: document.getElementById('voter')
});

voter.setVote(1);