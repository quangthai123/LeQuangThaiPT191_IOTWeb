/** @format */

import React, {useState, useEffect} from 'react'; // Import React and useState, useEffect hooks
import './App.css';
import ApexCharts from 'apexcharts';

function Dashboard() {
   // State variables for toggles and text
   const [toggle1Active, setToggle1Active] = useState(false);
   const [toggle2Active, setToggle2Active] = useState(false);
   const [text1, setText1] = useState('OFF');
   const [text2, setText2] = useState('OFF');

   // Function to handle toggle 1
   const handleToggleOne = () => {
      setToggle1Active((prevState) => !prevState);
      setText1((prevText) => (prevText === 'ON' ? 'OFF' : 'ON'));
   };

   // Function to handle toggle 2
   const handleToggleTwo = () => {
      setToggle2Active((prevState) => !prevState);
      setText2((prevText) => (prevText === 'ON' ? 'OFF' : 'ON'));
   };

   // Function to generate random numbers
   const getRandomNumber = () => {
      return Math.floor(Math.random() * 101);
   };

   const getRandomNumberLux = () => {
      return Math.floor(Math.random() * 1001);
   };

   // Function to update card values
   const updateCardValues = () => {
      const value1 = getRandomNumber();
      const value2 = getRandomNumber();
      const value3 = getRandomNumberLux();

      document.getElementById('temp_text').innerHTML = value1;
      document.getElementById('humi_text').innerHTML = value2;
      document.getElementById('illu_text').innerHTML = value3;

      document.getElementById('card1').style.backgroundImage = `linear-gradient(rgb(240, 130,130)${
         100 - value1
      }%, rgb(255, 0, 0))`;
      document.getElementById('card2').style.backgroundImage = `linear-gradient(rgb(168, 221, 220)${
         100 - value2
      }%, rgb(0, 30, 255))`;
      document.getElementById('card3').style.backgroundImage = `linear-gradient(rgb(240, 240, 175)${
         100 - value3 / 10
      }%, rgb(255, 247, 0))`;
   };

   // Effect to update card values every 2 seconds
   useEffect(() => {
      const interval = setInterval(updateCardValues, 2000);
      updateCardValues(); // Initial update
      return () => clearInterval(interval);
   }, []); // Empty dependency array ensures the effect runs only once after the initial render
   useEffect(() => {
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
         // Rest of your options...
      };

      const areaChart = new ApexCharts(document.querySelector('#area-chart'), areaChartOptions);
      areaChart.render();

      // Cleanup function
      return () => {
         areaChart.destroy();
      };
   }, []);
   // JSX content
   return (
      <div className='App'>
         <div className='grid-container'>
            {/* Header and navigation */}
            <header className='header'>
               <nav>
                  <div className='menu'>
                     <ul>
                        <li className='active'>
                           <a href='/'>Dashboard</a>
                        </li>
                        <li>
                           <a href='/data_sensor'>Data Sensors</a>
                        </li>
                        <li>
                           <a href='/action_history'>Action History</a>
                        </li>
                        <li>
                           <a href='/profile'>Profile</a>
                        </li>
                     </ul>
                  </div>
               </nav>
            </header>
            {/* Main content */}
            <div className='main-container'>
               <div className='main-cards'>
                  {/* Cards */}
                  {/* Card 1 */}
                  <div className='card' id='card1'>
                     <div className='card-inner'>
                        <h2>Temperature(℃)</h2>
                     </div>
                     <h1 id='temp_text'>24</h1>
                  </div>
                  {/* Card 2 */}
                  <div className='card' id='card2'>
                     <div className='card-inner'>
                        <h2>Humidity(%)</h2>
                     </div>
                     <h1 id='humi_text'>57</h1>
                  </div>
                  {/* Card 3 */}
                  <div className='card' id='card3'>
                     <div className='card-inner'>
                        <h2>Illuminance(Lux)</h2>
                     </div>
                     <h1 id='illu_text'>1500</h1>
                  </div>
               </div>
               {/* Charts and devices */}
               <div className='charts'>
                  {/* Chart */}
                  <div className='charts-card'>
                     <h2 className='chart-title'>Data chart</h2>
                     <div id='area-chart'></div>
                  </div>
                  {/* Devices */}
                  {/* Device 1 */}
                  <div className='device'>
                     <div className='device-inner'>
                        <div>
                           <img className='light1' id='light' src='images/denTat.jpg' alt='' />
                        </div>
                        <div className={`toggle-one ${toggle1Active ? 'active' : ''}`} onClick={handleToggleOne}>
                           <div className='toggle-button'></div>
                        </div>
                        <div className='text1'>{text1}</div>
                     </div>
                     <div className='device-inner'>
                        <div>
                           <img className='fan' id='fan' src='images/fan.jpg' alt='' />
                        </div>
                        <div className={`toggle-two ${toggle2Active ? 'active' : ''}`} onClick={handleToggleTwo}>
                           <div className='toggle-button'></div>
                        </div>
                        <div className='text2'>{text2}</div>
                     </div>
                  </div>
                  {/* Device 2 */}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
