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

   return (
         <div className={styles.main}>

            <Question
               isPillTakenToday={isPillTakenToday}
               takePill={handleTakePill}
            />

         </div>
   )
}

export default App;
