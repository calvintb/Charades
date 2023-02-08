import { Card } from '../components/Card';
import axios from "axios";
import { Timer } from '../components/Timer';
import { useState, useEffect } from 'react';
import "./GamePage.css"
import "../App.css"

let hands = {scoreCards:[], passCards:[]};
let team1 = [];
let team2 = [];
let timerLength = "";
let scores = {"team1" : [],
              "team2":[]};

export const GamePage = ({timer, setTimer, cardCount}) => {
    const [cards, setCards] = useState([{"title":"loading"}]);
    const [cardIndex, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [team1Active, setteam1Active] = useState(true);
    const [endRound, setEndRound]= useState(false);
    const [roundIndex, setRoundIndex] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/cards/")
        .then((res => {
            shuffleArray(res.data);
            setCards(res.data.slice(0,cardCount));
            timerLength = "" + timer;
          }));
      },[]);


      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    const addPassList = (card) =>{
        hands.scoreCards.splice(hands.scoreCards.indexOf(card),1);
        hands.passCards.push(card)
        setScore(score - 1);
    }
    const addScoreList = (card) =>{
        hands.passCards.splice(hands.passCards.indexOf(card),1);
        hands.scoreCards.push(card)
        setScore(score + 1);
    }

    const nextPlayer = () => {
        hands.scoreCards.forEach(card => {
            if (team1Active) {team1.push(card);}
            else {team2.push(card);}
        });
        hands.passCards.forEach(card => {
            cards.push(card);
        });
       
        shuffleArray(cards);
        hands = {scoreCards:[], passCards:[]};
        setteam1Active(!team1Active);
        setScore(0);
        if (cards.length === 0){
            setEndRound(true);
        } else {
            setTimer(timerLength);
        }
    }
    const teamScore = (team) => {
        let sum = 0;
        scores[team].forEach(roundScore=>{
            sum += roundScore
        } );
        return sum;
    }

    const startNextRound = () => {
        setRoundIndex(roundIndex + 1);
        setEndRound(false);
        setTimer(timerLength);
        team1.forEach(card => {
            cards.push(card);
        });
        team2.forEach(card => {
            cards.push(card);
        });
        team1 = [];
        team2 = [];
        shuffleArray(cards);
        if (teamScore("team1") !== teamScore("team2")){
            setteam1Active(teamScore("team1") < teamScore("team2"));}
    }
    if (endRound === true && roundIndex === 2){
        scores.team1[roundIndex] =(team1.length);
        scores.team2[roundIndex] = (team2.length);
        return(
            <div className='end-game container'>
            <h1>That's the Game</h1>
            <table>
                <tbody><tr>
                    <td>&nbsp;</td>
                    <th>Round 1</th>
                    <th>Round 2</th>
                    <th>Round 3</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <th>Team 1</th>
                    <td>{scores.team1[0]}   </td>
                    <td>{scores.team1[1]}   </td>
                    <td>{scores.team1[2]}   </td>
                    <td>{teamScore("team1")}   </td>
                </tr>
                <tr>
                    <th>Team 2</th>
                    <td>{scores.team2[0]}   </td>
                    <td>{scores.team2[1]}   </td>
                    <td>{scores.team2[2]}   </td>
                    <td>{teamScore("team2")}   </td>
                </tr>
                </tbody>
            </table>
            {teamScore("team1") > teamScore("team2") &&  <h1>Team 1 Wins!!</h1>}
            {teamScore("team1") < teamScore("team2") &&  <h1>Team 2 Wins!!</h1>}
            {teamScore("team1") == teamScore("team2") &&  <h1>There has been a tie.</h1>}           
        </div>
        );
        
    }
    else if (endRound === true){
        scores.team1[roundIndex] =(team1.length);
        scores.team2[roundIndex] = (team2.length);
        return (
        <div className='end-round container'>
            <h1>That's the end of the round!</h1>
            <table>
                <tbody><tr>
                    <td>&nbsp;</td>
                    <th>Round 1</th>
                    <th>Round 2</th>
                    <th>Round 3</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <th>Team 1</th>
                    <td>{scores.team1[0]}   </td>
                    <td>{scores.team1[1]}   </td>
                    <td>{scores.team1[2]}   </td>
                    <td>{teamScore("team1")}   </td>
                </tr>
                <tr>
                    <th>Team 2</th>
                    <td>{scores.team2[0]}   </td>
                    <td>{scores.team2[1]}   </td>
                    <td>{scores.team2[2]}   </td>
                    <td>{teamScore("team2")}   </td>
                </tr></tbody>
            </table>
            <button onClick={()=>{startNextRound()}}>Start Next Round</button>
        </div>
        );
    }
    else if (timer !== "00" && cards.length !== 0){
    return (
            <div className='game'>
                <h1 className='name'>Team {team1Active ? "1": "2"}</h1>
                <div className='card-box'>
                    <Card name={cards[cardIndex].title} category={cards[cardIndex].category} description={cards[cardIndex].description}/>
                    <div className='button-container'>
                    <button className='red' onClick={()=>{
                        hands.passCards.push(cards[cardIndex]);
                        const newList = cards.filter((item) => item.id !== cards[cardIndex].id);
                        setCards(newList);
                        if (newList.length === 0) {
                            setTimer("00");}
                        }}>PASS</button>

                    <button className='green' onClick={()=>{
                        hands.scoreCards.push(cards[cardIndex]);
                        setScore(score + 1);
                        const newList = cards.filter((item) => item.id !== cards[cardIndex].id);
                        setCards(newList);
                        if (newList.length === 0) {
                            setTimer("00");}
                        }}>SCORE</button>
                    </div>

                    <Timer timer={timer} update={setTimer}/>
                </div>
            </div>
            )}
    else{
        return (
    <div className='game'>

            <div className='review-container'>
                <div className='review-div score'>
                    <h2>You scored these cards</h2> 
                    {hands.scoreCards && hands.scoreCards.map(card => 
                        <div className='review-card' key = {card.id} onClick={() => addPassList(card)} >{card.title}</div>
                        )}
                </div>
                <div className='review-div pass'>
                    <h2>You passed these cards</h2> 
                    {hands.passCards && hands.passCards.map(card => 
                        <div className='review-card' key = {card.id} onClick={() => addScoreList(card)}>{card.title}</div>
                        )}
                </div>
            </div>
            <div id='score'><h1>Your score is: {score}</h1></div>
            <div className='button-container'><button id='next-player' onClick={()=>{nextPlayer();}}>{cards.length === 0 && hands.passCards.length === 0 ?"Next Round": team1Active ? "Next Player from Team 2": "Next Player from Team 1"} </button></div>

            <h3>There are {cards.length} card{cards.length!==0 ? "s" : ""} in the deck.</h3>
    </div>
    )}
}
