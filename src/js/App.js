import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import Question from './Question';

const App = () => {
   const [notificationDate, setNotificationDate] = useState(new Date(Date.now()));

   useEffect(() => {
      electron.customApi.sendNotificationDateRequest();

      electron.customApi.receiveNotificationDateResponse((date) => {
         console.log(date);
         setNotificationDate(date);
      });
   }, []);

   const isPillTakenToday = () => {

      if (notificationDate.getDay() === new Date(Date.now()).getDay()) {
         return false;
      }

      return true;
   };

   const handleTakePill = () => {
      electron.customApi.sendPillTaken(true);

      electron.customApi.sendNotificationDateRequest();
   };

   const handleToggleSettings = () => {

   }

   return (
      <div className={styles.root}>

         <div className={styles.header}>
            <div className={styles.link} onClick={handleToggleSettings}>Settings</div>
         </div>

         <div className={styles.main}>

            <div className={styles.settings}>

            </div>
            <div className={styles.question}>
               <Question
                  isPillTakenToday={isPillTakenToday}
                  takePill={handleTakePill}
               />
            </div>

         </div>
      </div>
   )
}

export default App;
