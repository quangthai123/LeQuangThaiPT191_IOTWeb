/** @format */

let toggle1 = document.querySelector('.toggle-one');
let toggle2 = document.querySelector('.toggle-two');
let text1 = document.querySelector('.text1');
let text2 = document.querySelector('.text2');
const light1 = document.getElementById('light');
const fan = document.getElementById('fan');

function AnimatedToggleOne() {
   toggle1.classList.toggle('active');
   if (toggle1.classList.contains('active')) {
      text1.innerHTML = 'ON';
      light1.src = 'images/denSang.jpg';
   } else {
      text1.innerHTML = 'OFF';
      light1.src = 'images/denTat.jpg';
   }
}

function AnimatedToggleTwo() {
   toggle2.classList.toggle('active');
   if (toggle2.classList.contains('active')) {
      text2.innerHTML = 'ON';
      fan.src = 'images/fan.gif';
   } else {
      text2.innerHTML = 'OFF';
      fan.src = 'images/fan.jpg';
   }
}

function getRandomNumber() {
   return Math.floor(Math.random() * 101);
}

function getRandomNumberLux() {
   return Math.floor(Math.random() * 1001);
}

const areaChartOptions = {
   series: [
      {
         name: 'Temperature',
         data: [11, 32, 45, 32, 34, 52, 99],
      },
      {
         name: 'Humidity',
         data: [51, 4, 2, 33, 66, 9, 94],
      },
      {
         name: 'Illuminance',
         data: [312, 40, 281, 51, 426, 974, 999],
      },
   ],
   chart: {
      type: 'area',
      background: 'transparent',
      height: 350,
      stacked: false,
      toolbar: {
         show: false,
      },
   },
   colors: ['#ff0000', '#00ffff', '#fff700'],
   labels: [
      '2024-29-01 13:30:05',
      '2024-29-01 13:30:48',
      '2024-29-01 13:35:16',
      '2024-29-01 13:39:44',
      '2024-29-01 13:47:31',
      '2024-29-01 13:52:09',
      '2024-29-01 14:01:47',
   ],
   dataLabels: {
      enabled: false,
   },
   fill: {
      gradient: {
         opacityFrom: 0.4,
         opacityTo: 0.1,
         shadeIntensity: 1,
         stops: [0, 100],
         type: 'vertical',
      },
      type: 'gradient',
   },
   grid: {
      borderColor: '#55596e',
      yaxis: {
         lines: {
            show: true,
         },
      },
      xaxis: {
         lines: {
            show: true,
         },
      },
   },
   legend: {
      labels: {
         colors: '#f5f7ff',
      },
      show: true,
      position: 'top',
   },
   markers: {
      size: 6,
      strokeColors: '#1b2635',
      strokeWidth: 3,
   },
   stroke: {
      curve: 'smooth',
   },
   xaxis: {
      axisBorder: {
         color: '#55596e',
         show: true,
      },
      axisTicks: {
         color: '#55596e',
         show: true,
      },
      labels: {
         offsetY: 5,
         style: {
            colors: '#f5f7ff',
         },
      },
   },
   yaxis: [
      {
         title: {
            text: 'Temperature & Humidity',
            style: {
               color: '#f5f7ff',
            },
         },
         labels: {
            style: {
               colors: ['#f5f7ff'],
            },
         },
      },
      {
         opposite: true,
         title: {
            text: 'Illuminance',
            style: {
               color: '#f5f7ff',
            },
         },
         labels: {
            style: {
               colors: ['#f5f7ff'],
            },
         },
      },
   ],
   tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark',
   },
};

const areaChart = new ApexCharts(document.querySelector('#area-chart'), areaChartOptions);
areaChart.render();

function updateCardValues() {
   var value1 = getRandomNumber();
   var value2 = getRandomNumber();
   var value3 = getRandomNumberLux();

   var card1 = document.getElementById('card1');
   var card2 = document.getElementById('card2');
   var card3 = document.getElementById('card3');

   temp_text.innerHTML = value1;
   humi_text.innerHTML = value2;
   illu_text.innerHTML = value3;

   card1.style.backgroundImage = `linear-gradient(rgb(240, 130,130)${100 - value1}%, rgb(255, 0, 0))`;
   card2.style.backgroundImage = `linear-gradient(rgb(168, 221, 220)${100 - value2}%, rgb(0, 30, 255))`;
   card3.style.backgroundImage = `linear-gradient(rgb(240, 240, 175)${100 - value3 / 10}%, rgb(255, 247, 0))`;
}

setInterval(updateCardValues, 2000);
updateCardValues(); // Initialize values on page load
