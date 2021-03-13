import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import Question from './Question';

const createPills = (count) => {
   const pills = [];

   for (let i = 0; i < count; i++) {
      const pill = {
         key: i,
         isTaken: false
      };

      pills.push(pill);
   }

   return pills;
}

const App = () => {
   const [pills, setPills] = useState(createPills(12));
   const [notificationTime, setNotificationTime] = useState(new Date('2021-03-13T16:05:00'));
   const [pillTakenToday, setPillTakenToday] = useState(false);

   const [seconds, setSeconds] = useState(0);
   let interval;

   useEffect(() => {
      interval = setInterval(() => {

         console.log('Date now', new Date(Date.now()));
         console.log('Date notification', notificationTime);
         console.log('It bis', new Date(Date.now()) - notificationTime);

         if (new Date(Date.now()) - notificationTime >= -500 && new Date(Date.now()) - notificationTime <= 500) {
            electron.notificationApi.sendNotification('It is time ti take your pill.');
            setNotificationTime(new Date(Date.now() + 10*60000));
         }

         setSeconds(seconds => seconds + 1);
      }, 1000);

      return () => clearInterval(interval.current);
   }, []);

   const handleTakePill = () => {
      setPillTakenToday(true);
   }

   const handleButtonClick = () => {
      electron.notificationApi.sendNotification('This is my Test');
   };

   return (
         <div className={styles.main}>

            <p>{seconds}</p>

            <Question
               pillTakenToday={pillTakenToday}
               takePill={handleTakePill}
            />

            {/* <div className={styles.blister}>
               {pills.map(pill => (
                  <button key={pill.key} className={styles.pill}>
                     <img src="./static/pill.svg" width="40" />
                  </button>
               ))}
            </div> */}


            {/* <button onClick={handleButtonClick}>Notify</button> */}

         </div>
   )
}

export default App;
