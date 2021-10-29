import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card from './components/Card';
import RevealedCard from './components/RevealedCard';
import cards from './config/cards.json';

var settings = {
    max_cards: 3
}
function App()
{
    const [deck, updateDeck] = useState([]);
    const [revealedCard, revealCard] = useState(null);
    const [lanes, updateLanes] = useState({
        victory: [],
        flow: [],
        effect: []
    });

    function dealCards()
    {
        const { victory_cards, flow_cards, effect_cards } = JSON.parse(JSON.stringify(cards));

        let victory = victory_cards.map((a, i) => {
            return {id: i, type: 'victory', ...a,}
        });

        let flow = flow_cards.map((a, i) => {
            return {id: i, type: 'flow', ...a,}
        });

        let effect = effect_cards.map((a, i) => {
            return {id: i, type: 'effect', ...a,}
        });

        let victory_card = getRandomCard(victory);
        let flow_card = getRandomCard(flow);
        let effect_card = getRandomCard(effect);

        let deck = shuffle(victory.concat(flow).concat(effect));

        updateDeck(deck);
        updateLanes({
            victory: [victory_card],
            flow: [flow_card],
            effect: [effect_card],
        })
    }

    useEffect(dealCards, [])

    function addCard()
    {
        let newCard = getRandomCard(deck);

        if(newCard.type in lanes)
        {
            let lane = lanes[newCard.type];

            lane.push(newCard);
            limitLane(lane);

            updateLanes({
                victory: lanes.victory,
                flow: lanes.flow,
                effect: lanes.effect,
            });
        }
    }

    function removeCard(card) {
        if(card.type in lanes)
        {
            let cards = lanes[card.type];

            for(let i in cards)
            {
                if(cards[i].name === card.name)
                {
                    let c = cards.splice(i, 1)[0];
                    deck.push(c);

                    updateLanes({
                        victory: lanes.victory,
                        flow: lanes.flow,
                        effect: lanes.effect,
                    });
                    return;
                }
            }
        }
    }

    function updateCard(type, id, name, desc)
    {
        const allCards = {
            victory: cards.victory_cards,
            flow: cards.flow_cards,
            effect: cards.effect_cards,
        }

        if(type in allCards)
        {
            allCards[type][id] = {
                name: name,
                desc: desc
            }

            if(revealedCard)
            {
                revealedCard.name = name;
                revealedCard.desc = desc;
            }
        }
    }

    function limitLane(stack)
    {
        while(stack.length > settings.max_cards)
        {
            stack.splice(0, 1);
        }
    }

    function getRandomCard(stack)
    {
        var rand = Math.floor(Math.random() * stack.length);
        return stack.splice(rand, 1)[0];
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

    return (
        <div className="App">
            <div className="col">
                <div className="card-lane">
                    <div className="col">
                        <Link to="/cards/edit">
                            <button className="btn">
                                Edit Cards
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="card-lane">
                    <div className="col">
                        <Card action={addCard} flipped={true} card={{
                            name: 'Draw a rule (' + deck.length + ')'
                        }}/>
                    </div>
                </div>

                <div className="card-lane">
                    <div className="col">
                        <button className="btn" onClick={() => dealCards()}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div className="col col-9">
                <div className="card-lane">
                    {lanes.victory.map((card, index) => (
                        <div className="col col-4" key={index}>
                            <Card card={card} removeCard={removeCard} action={() => revealCard(card)}/>
                        </div>
                    ))}
                </div>
                <div className="card-lane">
                    {lanes.flow.map((card, index) => (
                        <div className="col col-4" key={index}>
                            <Card card={card} rank={card.rank} removeCard={removeCard} action={() => revealCard(card)}/>
                        </div>
                    ))}
                </div>
                <div className="card-lane">
                    {lanes.effect.map((card, index) => (
                        <div className="col col-4" key={index}>
                            <Card card={card} removeCard={removeCard} action={() => revealCard(card)}/>
                        </div>
                    ))}
                </div>
            </div>

            {revealedCard ? <RevealedCard card={revealedCard} onClose={() => revealCard(null)} removeCard={removeCard} cardChanged={updateCard}/> : ''}
        </div>
    );
}

export default App;
