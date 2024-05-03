/** @format */

import React, {useEffect, useRef, useState} from 'react';
import {Table} from 'antd';
import axios from 'axios';
import {DatePicker, Space} from 'antd';
const {RangePicker} = DatePicker;
const onChange = (pagination = 5, filters, sorter, extra) => {
   console.log('params', (pagination = 5), filters, sorter, extra);
};
const ActionHistory = () => {
   const [data, setData] = useState([]);
   const data_old = useRef([]);
   const [selectedDate, setSelectedDate] = useState(null);
   const handleDateChange = (date, dateString) => {
      setSelectedDate(dateString);
   };

   useEffect(() => {
      axios
         .get('http://localhost:5500/get-all-action-history')
         .then((response) => {
            setData(response.data);
            data_old.current = response.data;
         })
         .catch((error) => {
            console.error('Error fetching data:', error);
         });
   }, []);

   useEffect(() => {
      const x = data_old.current.filter(
         (item) => item?.createdAt >= selectedDate[0] && item?.createdAt <= selectedDate[1],
      );
      setData(x);
   }, [selectedDate]);

   const newData = data.map((item, index) => {
      return {
         key: index + 1,
         ...item,
      };
   });
   const columns = [
      {
         title: 'Devide',
         dataIndex: 'devideId',
         filters: [
            {
               text: 'Quạt',
               value: 'quạt',
            },
            {
               text: 'Đèn',
               value: 'đèn',
            },
         ],
         onFilter: (value, record) => record.devideId.indexOf(value) === 0,
      },
      {
         title: 'Action',
         dataIndex: 'action',
         filters: [
            {
               text: 'ON',
               value: 'ON',
            },
            {
               text: 'OFF',
               value: 'OFF',
            },
         ],
         onFilter: (value, record) => record.action.indexOf(value) === 0,
      },
      {
         title: 'Time',
         dataIndex: 'createdAt',
         sorter: (a, b) => a.createdAt - b.createdAt,
      },
   ];

   return (
      <div style={{padding: '20px'}}>
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
         <Space direction='vertical' size={12} style={{marginTop: '20px'}}>
            <RangePicker onChange={handleDateChange} />
         </Space>
         <Table columns={columns} dataSource={newData} onChange={onChange} style={{marginTop: '20px'}} />
      </div>
   );
};
export default ActionHistory;
