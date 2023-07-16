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
  var clockSize = 500; // Tamaño inicial del #clock
  
  var pointRadius = clockSize * 0.015; // Radio de los puntos en relación al tamaño del #clock
  var centerX = clockSize / 2;
  var centerY = clockSize / 2;
  var html = createCircle(centerX, centerY, pointRadius);

  function updatePoints() {
    var clockWidth = select('#clock').width;
    var clockHeight = select('#clock').height;
    var newClockSize = Math.min(clockWidth, clockHeight);

    // Actualizar valores de tamaño y posición en función del nuevo tamaño del #clock
    centerX = newClockSize / 2;
    centerY = newClockSize / 2;
    pointRadius = newClockSize * 0.005;

    html = createCircle(centerX, centerY, pointRadius);

    for (var i = 0; i < 60; i++) {
      var angle = map(i, 0, 60, 0, TWO_PI);
      var x = centerX + newClockSize * 0.4 * cos(angle);
      var y = centerY + newClockSize * 0.4 * sin(angle);
      var r = (i % 5 === 0) ? pointRadius * 1.5 : pointRadius;
      html += createCircle(x, y, r);
    }

    svg.html(html);
  }

  updatePoints(); // Llamar a la función para inicializar los puntos

  // Actualizar los puntos cuando se cambie el tamaño de la ventana
  window.addEventListener('resize', updatePoints);
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
