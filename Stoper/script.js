class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        if (!this.running) {
            this.times = {
                minutes: 0,
                seconds: 0,
                milisconds: 0
            };
            this.print();
        }
    }

    add() {
        if (!this.running) {
            const ul = document.querySelector('.results');
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(this.format(this.times)));
            ul.appendChild(li);
        }
    }

    clear() {
        const ul = document.querySelector('.results');
        while(ul.firstChild)
            ul.removeChild(ul.firstChild);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.milisconds))}`;
    }

    print() {
        this.display.innerText = this.format(this.times);
    }


    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.milisconds += 1;
        if (this.times.milisconds >= 100) {
            this.times.seconds += 1;
            this.times.milisconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
}

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

let addToListButton = document.getElementById('add');
addToListButton.addEventListener('click', () => stopwatch.add());

let clearListButton = document.getElementById('clear');
clearListButton.addEventListener('click', () => stopwatch.clear());


function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}