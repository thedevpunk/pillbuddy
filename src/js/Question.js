import React from 'react';
import styles from './Question.module.css';

const Question = ({ takePill, isPillTakenToday }) => {

  if (isPillTakenToday()) {
    return (
      <div className={styles.container}>
        <h1>Ich frage dich morgen wieder ob du deine Tablette genommen hast. 😉</h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* <img src="./static/pill.svg" width="40" /> */}
      <h1>Hast du heute schon deine Tablette genommen? 🤔</h1>
      <button
        onClick={takePill}
        className={styles.button}
      >Ja klar</button>
    </div>
  )
}

export default Question;
