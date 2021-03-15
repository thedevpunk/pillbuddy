import React, { useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import Question from './Question';

// const createPills = (count) => {
//    const pills = [];

//    for (let i = 0; i < count; i++) {
//       const pill = {
//          key: i,
//          isTaken: false
//       };

//       pills.push(pill);
//    }

//    return pills;
// }

const App = () => {
   // const [pills, setPills] = useState(createPills(12));
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

      // electron.customApi.receiveNotificationDateResponse((date) => {

      //    setNotificationDate(date);
      // });
   };

   const handleButtonClick = () => {
      electron.notificationApi.sendNotification('This is my Test');
   };

   return (
         <div className={styles.main}>

            <Question
               isPillTakenToday={isPillTakenToday}
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
