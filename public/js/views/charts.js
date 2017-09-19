$(function (){
  // 'use strict';

  var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
  var lineChartData = {
    labels : ['Aug 24 2017','Aug 25 2017','Sep 01 2017','Sep 05 2017','Sep 06 2017','Sep 07 2017','Sep 08 2017','Sep 10 2017','Sep 11 2017','Sep 12 2017'],
    datasets : [
      {
        label: '3WN-16010055',
        backgroundColor : 'rgba(220,220,220,0.2)',
        borderColor : 'rgba(220,220,220,1)',
        pointBackgroundColor : 'rgba(220,220,220,1)',
        pointBorderColor : '#fff',
        data : [11.6,11.6,6.98,13.84,12.99,13.16,12.95,12.96,13.04,12.98]
      }
    ]
  }

  var ctx = document.getElementById('canvas-1');
  var chart = new Chart(ctx, {
    type: 'line',
    data: lineChartData,
    options: {
      responsive: true
    }
  });


  var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
  var barChartData = {
    labels : ['Sep 01 2017','Sep 02 2017','Sep 03 2017','Sep 04 2017','Sep 05 2017','Sep 06 2017', 'Sep 07 2017', 'Sep 08 2017', 'Sep 09 2017', 'Sep 10 2017', 'Sep 11 2017', 'Sep 12 2017', 'Sep 16 2017'],
    datasets : [
      {
        label: '3WN-16010055',
        backgroundColor : 'rgba(220,220,220,0.5)',
        borderColor : 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        data : [246.65,48.26,246.74,243.56,213.43,78.31,82.27,82.08,81.27,83.68,79.84,82.59,84]
      }
    ]
  }
  var ctx = document.getElementById('canvas-2');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true
    }
  });


  var doughnutData = {
    labels: [
      'Freada Brusca',
      'Aceleração Brusca',
      'Curva Acentuada',
    ],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };
  var ctx = document.getElementById('canvas-3').getContext("2d");;
  var chart = new Chart(ctx, {
    type: 'doughnut',
    data: doughnutData,
    options: {
      responsive: true
    }
  });


  var radarChartData = {
    labels: ['Freadas Bruscas', 'Alta Aceleração', 'Alta Velocidade'],
    datasets: [
      {
        label: '3WN-16010055',
        backgroundColor: 'rgba(220,220,220,0.2)',
        borderColor: 'rgba(220,220,220,1)',
        pointBackgroundColor: 'rgba(220,220,220,1)',
        pointBorderColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [0,0,32.4]
      }
    ]
  };
  var ctx = document.getElementById('canvas-4');
  var chart = new Chart(ctx, {
    type: 'radar',
    data: radarChartData,
    options: {
      responsive: true
    }
  });


  var pieData = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };
  // var ctx = document.getElementById('canvas-5');
  // var chart = new Chart(ctx, {
  //   type: 'pie',
  //   data: pieData,
  //   options: {
  //     responsive: true
  //   }
  // });


  var polarData = {
    datasets: [{
      data: [
        11,
        16,
        7,
        3,
        14
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB'
      ],
      label: 'My dataset' // for legend
    }],
    labels: [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
    ]
  };
  var ctx = document.getElementById('canvas-6');
  var chart = new Chart(ctx, {
    type: 'polarArea',
    data: polarData,
    options: {
      responsive: true
    }
  });
});


var lineChartData = {
  labels : ['Sep 05 2017','Sep 06 2017','Sep 07 2017','Sep 08 2017','Sep 09 2017','Sep 10 2017','Sep 11 2017','Sep 12 2017','Sep 13 2017','Sep 14 2017','Sep 15 2017','Sep 16 2017'],
  datasets : [
    {
      label: '3WN-16010055',
      backgroundColor : 'rgba(120,220,220,0.2)',
      borderColor : 'rgba(220,250,120,1)',
      pointBackgroundColor : 'rgba(220,220,220,1)',
      pointBorderColor : '#fff',
      data : [5.56397,3.54203,1.09216,6.40676,6.12957,13.20612,6.19839,4.78206,0,0,0,4]
    }
  ]
}

var ctx = document.getElementById('canvas-5');
var chart = new Chart(ctx, {
  type: 'line',
  data: lineChartData,
  options: {
    responsive: true
  }
});