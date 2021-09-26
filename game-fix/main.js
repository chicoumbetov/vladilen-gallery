const screen     = document.querySelectorAll('.screen');
const btnStart   = document.querySelector('.screen__start');
const restart    = document.querySelector('.game-over');
const btnReStart = document.querySelector('.game-over__restart');
const timeList   = document.querySelector('.time__list');
const field      = document.querySelector('.field');
const timer      = document.querySelector('.screen__timer');
const hasFocus   = document.querySelector('.time__field');
const btnTime    = document.querySelector('.time__field-btn');
const board      = document.querySelector('.screen__board');
const circle     = document.querySelector('.circle');

// Counter(-Stricke :3)
let time = 0;
let score = 0;

let inputValue;
let isOver = false;
let inter;
let interInput;

// Func / Start
// Set time
const setTime = (value) => {
	timer.innerHTML = value;
}

// Get random number
const getRndNum = (min, max) => {
	return Math.round(Math.random() * (max - min) + min);
}

// Get random HEX color
const getRndColor = () => {
	const rndColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	return rndColor;
};

// Get value from input
const getInputValue = () => {
	const value = document.querySelector('.time__field').value;

	if (value !== 0 && value.length > 0) {
		inputValue = value;
		screen[1].classList.add('up');
	}
}

// Decrease time (Buttons)
const decTime = () => {
	if (time === 0) {
		gameEnd();

	} else if (isOver === true) {
		board.innerHTML = ''
		restart.classList.remove('hide');
		gameOver();

	} else {
		let current = --time
		if (current < 10) {
		  current = `0${current}`
		}
		setTime(`00:${current}`)
	}
};

// Decrease time (Input)
const decTimeInput = () => {
	if (inputValue === 0) {
		gameEnd();
	} else if (isOver === true) {
		board.innerHTML = ''
		restart.classList.remove('hide');
		gameOver();

	} else {
		let value = --inputValue;

		const seconds = value % 60;
		const secondsInMinutes = (value - seconds) / 60;
		const minutes = secondsInMinutes % 60;
		const hours = (secondsInMinutes - minutes) / 60;

		let current = `${hours}:${minutes}:${seconds}`;

		if (hours < 10 && hours !== 0) {
			current = `0${hours}:${minutes}:${seconds}`;

		} else if (hours === 0 && minutes > 10) {
			current = `${minutes}:${seconds}`;

		} else if (minutes < 10 && seconds > 10) {
			current = `0${minutes}:${seconds}`;

		} else if (seconds < 10) {
			current = `0${minutes}:0${seconds}`;
		}

		setTime(current);
	}
}

// Create circle on a board
const createRndCircle = () => {
	const circle = document.createElement('div');
	circle.classList.add('circle');

	// Sets dynamic random size and background color
	setInterval(() => {
		const { width, height } = board.getBoundingClientRect();
		const s = getRndNum(10, 60);
		const x = getRndNum(0, width - s);
		const y = getRndNum(0, height - s);

		circle.style.width = `${s}px`;
		circle.style.height = `${s}px`;
		circle.style.top = `${x}px`;
		circle.style.left = `${y}px`;
		circle.style.background = getRndColor();
	}, 1000);

	board.append(circle);
}

// Sets the params when starting the game. (Buttons)
const gameStart = () => {
	timer.innerHTML = '00:00';
	timer.parentElement.classList.remove('hide');
	board.innerHTML = '';
	isOver = false;
	inter = setInterval(decTime, 1000);
	createRndCircle();
}

// Sets the params when starting the game. (Input)
const gameStartInput = () => {
	timer.innerHTML = '00:00';
	timer.parentElement.classList.remove('hide');
	board.innerHTML = '';
	isOver = false;
	interInput = setInterval(decTimeInput, 1000);
	createRndCircle();
}

// Sets the params when ending the game.
const gameEnd = () => {
	timer.parentElement.classList.add('hide');
	board.innerHTML = `<h1>Cчёт <span class='primary'>${score}</span></h1>`;
}

// Sets the params if the game over
const gameOver = () => {
	timer.parentElement.classList.add('hide');
	board.innerHTML = `<h3 class='game-over__message'>
							<span>Промах (ノಠ益ಠ)ノ彡┻━┻</span>
							<p>Вы проиграли :(<p>
							<p>Ваш счёт: <span>${score}</span></p>
						</h3>`
	clearInterval(inter);
	clearInterval(interInput);
}

// Sets dynamic color and box shadow
setInterval(() => {
	btnStart.style.color = getRndColor();
	btnStart.style.boxShadow = `0px 0px 30px -5px ${getRndColor()}`;
	btnReStart.style.color = getRndColor();
	btnReStart.style.boxShadow = `0px 0px 30px -5px ${getRndColor()}`;
	board.style.boxShadow = `0px 0px 20px -5px ${getRndColor()}`;
}, 100);
// Func / End

// Listeners / Start
btnTime.addEventListener('click', () => {
	getInputValue();
	gameStartInput();
});

btnStart.addEventListener('click', () => screen[0].classList.add('up'));

btnReStart.addEventListener('click', () => {
	screen[1].classList.remove('up');
	restart.classList.add('hide');
});

board.addEventListener('click', (e) => {
	if (e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createRndCircle();
	} else {
		isOver = true;
	}
})

timeList.addEventListener('click', (e) => {
	if (e.target.classList.contains('time__btn')) {
		time = parseInt(e.target.getAttribute('data-time'));
		screen[1].classList.add('up');
		gameStart();
	}
});

hasFocus.addEventListener('focusin', () => {
	field.style.border = '2px solid #9142e0';
	btnTime.style.background = '#9142e0';
})

hasFocus.addEventListener('focusout', () => {
	field.style.border = '2px solid #CFD8DC';
	btnTime.style.background = '#CFD8DC';
})
// Listeners / End

// Увы код не идеален, мого чего можно сократить и упорядочить, но пока это всё на что мне хватило времени и знаний
// Идеи появляющиеся одна за другой поели всё время и порадили некоторые баги.