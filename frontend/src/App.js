import React, { useState } from 'react';

import "./App.css"
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

function App() {
  const [timer, setTimer] = useState("30");
  const [page, setPage] = useState("home");
  const [cardCount, setCardCount] = useState(50);





  if (page === "home")
   return(
      <HomePage timer={timer} update={setTimer} changePage={setPage} cardCount={cardCount} changeCardCount={setCardCount}/>)
  else if (page === "game-page")
  return(
  <GamePage timer={timer} setTimer={setTimer} cardCount={cardCount}/>
  );
}

export default App;