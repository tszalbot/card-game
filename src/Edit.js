import cards from './config/cards';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Edit() {
    const { victory_cards, flow_cards, effect_cards } = cards;
    const [victoryCards, setVictoryCards] = useState(victory_cards);
    const [flowCards, setFlowCards] = useState(flow_cards);
    const [effectCards, setEffectCards] = useState(effect_cards);

    function onChange(type, cardId, card)
    {
        let cardsToChange = [victoryCards, flowCards, effectCards][type];
        let setCards = [setVictoryCards, setFlowCards, setEffectCards][type];

        cardsToChange[cardId] = card;

        setCards(cardsToChange);
    }

    return (
        <div className="App">
            <div className="col">
                <div style={{width: '100%'}}>
                    <Link to="/cards">
                        <button className="btn">
                            {'< Back'}
                        </button>
                    </Link>

                    <Link to="/cards/showjson">
                        <button className="btn">
                            Generate JSON
                        </button>
                    </Link>
                </div>

                <div className="editcards">
                    <h1 className="editcards-heading">Victory Cards</h1>
                    {victoryCards.map((card, id) => {
                        return <EditCard key={id} type="victory" name={card.name} desc={card.desc} rank={card.rank} onChange={(card) => {onChange(0, id, card)}}/>
                    })}

                    <AddBtn onClick={() => {
                        setVictoryCards([...victoryCards, {}])
                    }}/>

                    <h1 className="editcards-heading">Flow Cards</h1>
                    {flowCards.map((card, id) => {
                        return <EditCard key={id} type="flow" name={card.name} desc={card.desc} rank={card.rank} onChange={(card) => {onChange(1, id, card)}}/>
                    })}
                    
                    <AddBtn onClick={() => {
                        setFlowCards([...flowCards, {}])
                    }}/>

                    <h1 className="editcards-heading">Effect Cards</h1>
                    {effectCards.map((card, id) => {
                        return <EditCard key={id} type="effect" name={card.name} desc={card.desc} rank={card.rank} onChange={(card) => {onChange(2, id, card)}}/>
                    })}

                    <AddBtn onClick={() => {
                        setEffectCards([...effectCards, {}])
                    }}/>
                </div>
            </div>
        </div>
    )
}

function EditCard(props)
{
    let { name, desc, rank } = props;
    
    function onChange()
    {
        let card = {
            name: name || '',
            desc: desc || '',
            rank: parseInt(rank) || undefined
        }

        props.onChange(card);
    }

    return (
        <div className="editcard">
            <div className={"editcard-inner " + props.type}>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={name} onChange={e => {name = e.target.value; onChange()}}/>
                </label>

                <label>
                    Description:
                    <textarea name="desc" defaultValue={desc} onChange={e => {desc = e.target.value; onChange()}}></textarea>
                </label>

                <label>
                    Rank:
                    <input type="number" name="rank" defaultValue={rank} onChange={e => {rank = e.target.value; onChange()}}/>
                </label>
            </div>
        </div>
    )
}

function AddBtn(props)
{
    return (
        <div onClick={props.onClick} className="addcard">+</div>
    )
}