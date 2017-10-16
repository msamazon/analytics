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
  // var ctx = document.getElementById('canvas-99');
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
          0
      ],
      backgroundColor: [
        '#FF6384'
      ],
      label: '3WN-16010055' // for legend
    }],
    labels: [
      'DTC'
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

  // var dougData = {
  //   labels: [
  //     'Perfil'
  //   ],
  //   datasets: [{
  //     data: [50],
  //     backgroundColor: [
  //       '#FF6384'
  //     ],
  //     hoverBackgroundColor: [
  //       '#FF6384'
  //     ]
  //   }]
  // };
  // var ctx = document.getElementById('canvas-99').getContext("2d");
  // var chart = new Chart(ctx, {
  //   type: 'doughnut',
  //   data: dougData,
  //   options: {
  //     responsive: true
  //   }
  // });



  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
  };
  var config = {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
                  randomScalingFactor(),
              ],
              backgroundColor: [
                  window.chartColors.red,
                  window.chartColors.orange,
                  window.chartColors.yellow,
                  window.chartColors.green,
                  window.chartColors.blue,
              ],
              label: 'Dataset 1'
          }],
          labels: [
              "Red",
              "Orange",
              "Yellow",
              "Green",
              "Blue"
          ]
      },
      options: {
          responsive: true,
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Chart.js Doughnut Chart'
          },
          animation: {
              animateScale: true,
              animateRotate: true
          }
      }
  };

  var ctx = document.getElementById("canvas-99").getContext("2d");
  var chart = new Chart(ctx, config);
  
  
// ----------------------------------------
var testdata = [
  {key: "One", y: 5},
  {key: "Two", y: 2},
  {key: "Three", y: 9},
  {key: "Four", y: 7},
  {key: "Five", y: 4},
  {key: "Six", y: 3},
  {key: "Seven", y: 0.5}
];
var height = 350;
var width = 350;
var chart1;
nv.addGraph(function() {
  var chart1 = nv.models.pieChart()
      .x(function(d) { return d.key })
      .y(function(d) { return d.y })
      .donut(true)
      .width(width)
      .height(height)
      .padAngle(.08)
      .cornerRadius(5)
      .id('donut1'); // allow custom CSS for this one svg
  chart1.title("100%");
  chart1.pie.donutLabelsOutside(true).donut(true);
  d3.select("#canvas-99")
      .datum(testdata)
      .transition().duration(1200)
      .call(chart1);





});

     

// var randomScalingFactor = function() {
//   return Math.round(Math.random() * 100);
// };

// var config = {
//   type: 'doughnut',
//   data: {
//       datasets: [{
//           data: [
//               randomScalingFactor()              
//           ],
//           backgroundColor: [
//               window.chartColors.blue
//           ],
//           label: '%'
//       }],
//       labels: [          
//           "Perfil"
//       ]
//   },
//   options: {
//       responsive: true,
//       legend: {
//           position: 'top',
//       },
//       title: {
//           display: true,
//           text: 'Direção'
//       },
//       animation: {
//           animateScale: true,
//           animateRotate: true
//       }
//   }
// };
// var ctx = document.getElementById("canvas-99").getContext("2d");
// window.myDoughnut = new Chart(ctx, config);