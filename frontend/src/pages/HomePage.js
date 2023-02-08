import "../App.css"

export const HomePage = ({timer, update, changePage, cardCount, changeCardCount}) => {

    return (
        <div className="game">
            <h1 className="name">Time's Up</h1>
            <div title="Game Configuration" className="card-box">
                <div className="card-container">
                    <p><b>Welcome to Time's Up!</b> <br/>Work together as a team to guess the party clue!</p>
                </div>
                <div className="container">
                    <label>Seconds:</label>
                    <input type="number" defaultValue={timer} onChange={(e)=>{update(e.target.value)}}/>
                    <label>Cards:</label>
                    <input type="number" defaultValue={cardCount} onChange={(e)=>{changeCardCount(e.target.value)}}/>
                </div>
                {/* <div className="select-categories">
                    <button type="checkbox"></button>
                </div> */}
                <div className="submit-button">
                    <button className="cool-button" type="submit" onClick={()=>{changePage("game-page")}}>Submit</button>
                </div>
            </div>
    </div>
    )
}


{/* <div className='card-box'>
<Card name={cards[cardIndex].title} category={cards[cardIndex].category} description={cards[cardIndex].description}/>
<div className='button-container'>
<button className='red' onClick={()=>{
    hands.passCards.push(cards[cardIndex]);
    const newList = cards.filter((item) => item.id !== cards[cardIndex].id);
    setCards(newList);
    if (newList.length === 0) {
        setTimer("00");}
    }}>Wrong</button> */}
