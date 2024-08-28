let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;
const timeDisplay = document.getElementById('time');
const lapList = document.getElementById('lap-list');

document.getElementById('start').addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    timeDisplay.innerHTML = '00:00:00:00';
    lapList.innerHTML = '';
    lapCount = 0;
});

document.getElementById('lap').addEventListener('click', () => {
    if (running) {
        lapCount++;
        const lapTime = timeDisplay.innerHTML;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(li);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    const milliseconds = Math.floor((difference % 1000) / 10);

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    timeDisplay.innerHTML = formattedTime;
}


function pad(number) {
    return number < 10 ? '0' + number : number;
}

document.addEventListener('DOMContentLoaded', () => {
    const capybara = document.getElementById('capybara');

    let posX = Math.random() * (window.innerWidth - capybara.offsetWidth);
    let posY = Math.random() * (window.innerHeight - capybara.offsetHeight);
    const speed = 2;
    const directionChangeInterval = 1000; 

    let moveX = speed;
    let moveY = speed;

    function moveCapybara() {
        posX += moveX;
        posY += moveY;
        if (posX <= 0 || posX >= window.innerWidth - capybara.offsetWidth) {
            moveX *= -1;
        }
        if (posY <= 0 || posY >= window.innerHeight - capybara.offsetHeight) {
            moveY *= -1;
        }
        capybara.style.left = posX + 'px';
        capybara.style.top = posY + 'px';

        requestAnimationFrame(moveCapybara);
    }

    moveCapybara();
});
