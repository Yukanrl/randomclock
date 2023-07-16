function rotateClockHands() {
  var hourHand = document.getElementById('hour-hand');
  var minuteHand = document.getElementById('minute-hand');
  var secondHand = document.getElementById('second-hand');

  var randomHour = getRandomHour();
  var randomMinute = Math.floor(Math.random() * 60);
  var randomSecond = Math.floor(Math.random() * 60);

  var hourRotation = getHourRotation(randomHour, randomMinute);
  var minuteRotation = getMinuteRotation(randomMinute, randomSecond);
  var secondRotation = getSecondRotation(randomSecond);

  hourHand.style.transform = 'rotate(' + hourRotation + 'deg)';
  minuteHand.style.transform = 'rotate(' + minuteRotation + 'deg)';
  secondHand.style.transform = 'rotate(' + secondRotation + 'deg)';

  updateDigitalClock(randomHour, randomMinute, randomSecond);
}

function updateDigitalClock(hour, minute, second) {
  var digitalClock = document.getElementById('texto-hora-digital');
  var formattedHour = formatTimeValue(hour);
  var formattedMinute = formatTimeValue(minute);
  var formattedSecond = formatTimeValue(second);
  digitalClock.textContent = formattedHour + ':' + formattedMinute + ':' + formattedSecond;
}

function formatTimeValue(value) {
  if (value === 0) {
    return '12';
  } else {
    return value.toString().padStart(2, '0');
  }
}

function getHourRotation(hour, minute) {
  return (30 * hour) + (minute / 2);
}

function getMinuteRotation(minute, second) {
  return (6 * minute) + (second / 10);
}

function getSecondRotation(second) {
  return 6 * second;
}

function getRandomHour() {
  return Math.floor(Math.random() * 12);
}

function setup() {
  var svg = select('#puntos');
  var html = '';
  html += createCircle(150, 150, 5);
  for (var i = 0; i < 60; i++) {
    var x = 120 * cos(2 * PI * i / 60) + 150;
    var y = 120 * sin(2 * PI * i / 60) + 150;
    var r = i % 5 === 0 ? 3 : 1;
    html += createCircle(x, y, r);
  }
  svg.html(html);
}

function createCircle(x, y, r) {
  return (
    '<circle cx="' +
    x +
    '" cy="' +
    y +
    '" r="' +
    r +
    '" stroke="transparent" fill="black" stroke-width="1" />'
  );
}

setup();
