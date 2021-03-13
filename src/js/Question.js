import React from 'react';

const Question = ({ takePill, pillTakenToday }) => {

  if (pillTakenToday) {
    return (
      <h1>Good</h1>
    )
  }

  return (
    <>
      <img src="./static/pill.svg" width="40" />
      <h1>Hast du heute schon deine Tablette genommen?</h1>
      <button onClick={takePill}>Ja klar</button>
    </>
  )
}

export default Question;
