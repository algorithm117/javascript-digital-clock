'use strict';

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
  rotationDegreeSeconds,
  rotationDegreeMinutes,
  rotationDegreeHour,
  flag;

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
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function setHandRotations() {
  secondHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotationDegreeSeconds}deg)`;

  minuteHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotationDegreeMinutes}deg)`;

  hourHand.style.transform = `translateX(-50%) translateY(-100%) rotate(${rotationDegreeHour}deg)`;
}

function setText() {
  digitalTime.textContent = `${hour}:${(
    minutes + ''
  ).padStart(2, '0')} ${dayNight}`;

  longDate.innerHTML = `${weekday},${month} <span>${day}</span>`;
}

function clock() {
  tick();

  function tick() {
    now = new Date();
    console.log(now);

    weekday = weekdays[now.getDay()];
    month = months[now.getMonth()];
    day = now.getDate();
    hour = now.getHours() % 12;
    minutes = now.getMinutes();
    seconds = now.getSeconds();
    dayNight = now.getHours() >= 12 ? 'PM' : 'AM';

    // set initial values for clock hands
    rotationDegreeSeconds =
      rotationDegreeSeconds || seconds * 6;
    rotationDegreeMinutes =
      rotationDegreeMinutes || minutes * 6;
    rotationDegreeHour =
      rotationDegreeHour || hour * 30;

    // run after clocks have been initialized once, otherwise your clock hands are in the wrong position since after initializing the hands at the correct position, you add 6 degrees which puts the second hand 6 degrees ahead of where it should be.

    if (flag) {
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
    }

    flag = true;

    setHandRotations();
    setText();
  }

  setInterval(tick, 1000);
}
