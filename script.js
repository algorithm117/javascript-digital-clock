// 'use strict';

window.onload = clock;

const themeBtn = document.querySelector('.btn');
const secondHand = document.querySelector(
  '.second-hand'
);
const minuteHand = document.querySelector(
  '.minute-hand'
);
const hourHand =
  document.querySelector('.hour-hand');
const digitalTime = document.querySelector(
  '.digital-time'
);
const longDate =
  document.querySelector('.long-date');

// changing theme
themeBtn.addEventListener('click', (event) => {
  const bodyElement =
    event.target.closest('body');
  if (
    bodyElement.classList.contains('light-mode')
  ) {
    bodyElement.classList.remove('light-mode');
    bodyElement.classList.add('dark-mode');
  } else {
    bodyElement.classList.remove('dark-mode');
    bodyElement.classList.add('light-mode');
  }

  themeBtn.textContent = `${
    bodyElement.classList.contains('dark-mode')
      ? 'Light Mode'
      : 'Dark Mode'
  }`;
});

// moving clock logic

let now,
  weekday,
  month,
  day,
  seconds,
  minutes,
  hour,
  dayNight,
  rotationDegreeSeconds = 0,
  rotationDegreeMinutes = 0,
  rotationDegreeHour = 0;

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weekdays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
];

function extraction() {
  now = new Date();

  weekday = weekdays[now.getDay()];
  month = months[now.getMonth()];
  day = now.getDate();
  hour = now.getHours() % 12;
  minutes = now.getMinutes();
  seconds = now.getSeconds();
  dayNight = now.getHours() >= 12 ? 'PM' : 'AM';

  rotationDegreeSeconds =
    rotationDegreeSeconds || seconds * 6;
  rotationDegreeMinutes =
    rotationDegreeMinutes || minutes * 6;
  rotationDegreeHour =
    rotationDegreeHour || hour * 30;
}

function setHandRotations() {
  secondHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotationDegreeSeconds}deg)`;

  minuteHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotationDegreeMinutes}deg)`;

  hourHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotationDegreeHour}deg)`;
}

function setText() {
  digitalTime.textContent = `${hour}:${minutes} ${dayNight}`;

  longDate.innerHTML = `${weekday},${month} <span>${day}</span>`;
}

function clock() {
  function tick() {
    extraction();

    setText();

    rotationDegreeSeconds =
      rotationDegreeSeconds + 6;

    if (rotationDegreeSeconds % 360 === 0) {
      rotationDegreeMinutes =
        rotationDegreeMinutes + 6;
    }

    if (rotationDegreeMinutes % 360 === 0) {
      rotationDegreeHour =
        rotationDegreeHour + 30;
    }

    setHandRotations();
  }

  tick();

  setInterval(tick, 1000);
}
