// import './Chart.css';
// import React from 'react';

//     export default function App({}) {
//       const data = {
//         labels: ['Jun 2018','Jul 2018','Aug 2018','Sep 2018','Oct 2018','Nov 2018', 'Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019',
//           'Jun 2019','Jul 2019','Aug 2019','Sep 2019','Oct 2019','Nov 2019', 'Dec 2019', 'Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020',
//           'Jun 2020','Jul 2020','Aug 2020','Sep 2020','Oct 2020','Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021', 'May 2021',
//           'Jun 2021','Jul 2021','Aug 2021','Sep 2021','Oct 2021','Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022',
//           'Jun 2022','Jul 2022','Aug 2022','Sep 2022','Oct 2022','Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023'],
//         datasets: [{
//           label: 'S&P 500 - 5 Year Historical Trend',
//           data: [2718.70,2704.95,2821.17,2896.96,2926.29,2717.58,2790.50,2476.96,2702.32,2798.22,2848.63,2952.33,2751.53,2971.41,2980.32,2909.01,2983.69,
//           3050.72,3143.85,3244.67,3235.66,2974.28,2498.08,2869.09,3038.78,3105.92,3288.26,3507.44,3385.87,3296.20,3645.87,3764.61,3731.17,3842.51,3992.78,
//           4191.98,4216.52,4300.73,4406.86,4528.80,4317.16,4610.62,4602.82,4778.14,4519.57,4363.14,4540.32,4130.61,4149.78,3781.00,4112.38,3936.73,3609.78,
//           3901.79, 4087.14, 3853.29, 4070.07, 3963.34, 4102.2, 4166.97],
//           backgroundColor: [
//             'rgba(255, 26, 104, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(0, 0, 0, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 26, 104, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)',
//             'rgba(0, 0, 0, 1)'
//           ],
//           borderWidth: 1
//         }]
//       };

//       const hoverline = {
//         id: 'hoverline',
//         afterDatasetsDraw(chart, args, plugings){
//           const {ctx, tooltip, chartArea: {top, bottom, left, right, width, 
//             height}, scales: {x, y}} = chart;
  
//             console.log(tooltip)
//         }
//       }
//       const hoverLine = {
//           id: 'hoverLine',
//           afterDatasetsDraw(chart, args, plugings){
//               const { ctx, tooltip ,chartArea: {top, bottom, left, right, width, height }, scales: {x,y} } = chart;
  
//               if(tooltip._active.length > 0){
//               const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
//               const yCoor = x.getPixelForValue(tooltip.dataPoints[0].parsed.y);
  
//               ctx.save();
//               ctx.beginPath();
//               ctx.lineWidth = 3;
//               ctx.strokeStyle =  'rgba(0, 0, 0, 1)';
//               ctx.moveTo(xCoor, yCoor)
//               ctx.lineTo(xCoor, yCoor);
//               ctx.stroke();
//               ctx.closePath();
//               }
//           }   
//       }
//       // config 
//       const config = {
//         type: 'line',
//         data,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         },
//         plugins:[hoverline]
//       };
  
//       // render init block
//       const myChart = new Chart(
//         document.getElementById('myChart'),
//         config
//       );
  
//       // Instantly assign Chart.js version
//       const chartVersion = document.getElementById('chartVersion');
//       chartVersion.innerText = Chart.version;

//   return (
//     <>
//     <h1>hey</h1>
//     <div className="chartCard">
//     <div className="chartBox">
//       <canvas id="myChart"></canvas>
//     </div>
//   </div>
//   </>
// );
// }
  

