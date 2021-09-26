const clock = document.querySelector('#clock');
const SEVEN_SEGMENTS_DISPLAYS_NUMBER = 4;
const segmentNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const colors = ['pink', 'lightgreen', 'lightblue', 'violet', 'wheat'];
let colorSettingSelected = "red";

const colorSettings = document.querySelectorAll('input[name=colorSetting]');
for (const colorSetting of colorSettings) {
    colorSetting.addEventListener('click', (event) => {
        colorSettingSelected = event.target.value;
    });
}

for (let i = 0; i < SEVEN_SEGMENTS_DISPLAYS_NUMBER; i++) {
    const sevenSegmentsDislay = document.createElement('div');
    sevenSegmentsDislay.classList.add('seven-segments-display');
    for (let segmentName of segmentNames) {
        const segment = document.createElement('div');
        segment.id = `segment${segmentName}`;
        segment.addEventListener('mouseover', () => {
            setColor(segment);
        });
        segment.addEventListener('mouseleave', () => {
            removeColor(segment);
        });
        sevenSegmentsDislay.append(segment);
    }
    clock.append(sevenSegmentsDislay);
}

function setColor(element) {
    const color = getColor(colorSettingSelected);
    element.style.background = color;
    element.style.borderColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 16px ${color}`;
}

function getColor(colorSetting) {
    switch(colorSetting) {
        case "red": return 'red';
        case "6": return colors[Math.floor(Math.random() * colors.length)];
        case "16M": return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
}

function removeColor(element) {
    element.style.background = '#300000';
    element.style.border = '#300000';
    element.style.boxShadow = '0 0 2px #100000';
}