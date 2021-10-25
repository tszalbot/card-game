// import React from 'react';
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import RevealedCard from './components/RevealedCard';
import cards from './config/cards.json';

var settings = {
    max_cards: 3
}
class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            deck: [],
            victory: [],
            flow: [],
            effect: [],
            revealedCard: null
        }

        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.revealCard = this.revealCard.bind(this);
    }

    componentDidMount()
    {
        const { victory_cards, flow_cards, effect_cards } = cards;

        victory_cards.map(function(a){a.type = 'victory'});
        flow_cards.map(function(a){a.type = 'flow'});
        effect_cards.map(function(a){a.type = 'effect'});

        let victory_card = _getRandomCard(victory_cards);
        let flow_card = _getRandomCard(flow_cards);
        let effect_card = _getRandomCard(effect_cards);

        let deck = _shuffle(victory_cards.concat(flow_cards).concat(effect_cards));

        this.setState({
            deck: deck,
            victory: [victory_card],
            flow: [flow_card],
            effect: [effect_card],
            revealedCard: null
        })
    }

    addCard()
    {
        let deck = this.state.deck;
        let newCard = _getRandomCard(deck);

        let state = this.state;

        if(newCard.type in state)
        {
            state[newCard.type].push(newCard);
        }

        _limitLane(state.victory, deck);
        _limitLane(state.flow, deck);
        _limitLane(state.effect, deck);

        state.deck = deck;

        this.setState(state);
    }

    removeCard(card) {
        let state = this.state;

        if(card.type in state)
        {
            let cards = state[card.type];

            for(let i in cards)
            {
                if(cards[i].name == card.name)
                {
                    let c = cards.splice(i, 1)[0];
                    state.deck.push(c);

                    let newState = {
                        deck: state.deck
                    }

                    newState[card.type] = cards;

                    this.setState(newState);
                    return;
                }
            }
        }
    }

    revealCard(card)
    {
        this.setState({revealedCard: card});
    }

    render() {
        return (
            <div className="App">
                <div className="left-row">
                    <Card action={this.addCard} flipped={true} card={{
                        name: this.state.deck.length
                    }}/>
                </div>

                <div className="right-row">
                    <div className="card-lane">
                        {this.state.victory.map((card, index) => (
                            <Card key={index} card={card} removeCard={this.removeCard} action={this.revealCard}/>
                        ))}
                    </div>
                    <div className="card-lane">
                        {this.state.flow.map((card, index) => (
                            <Card key={index} card={card} rank={card.rank} removeCard={this.removeCard} action={this.revealCard}/>
                        ))}
                    </div>
                    <div className="card-lane">
                        {this.state.effect.map((card, index) => (
                            <Card key={index} card={card} removeCard={this.removeCard} action={this.revealCard}/>
                        ))}
                    </div>
                </div>

                {this.state.revealedCard ? <RevealedCard card={this.state.revealedCard} onClose={this.revealCard} removeCard={this.removeCard}/> : ''}

                <div className="panel">
                    {/* <div className="btn">
                        Restart {this.state.deck.length}
                    </div> */}

                    {/* <div className="btn">
                        Undo
                    </div> */}
                </div>
            </div>
        );
    }
}

function _getRandomCard(stack)
{
    var rand = Math.floor(Math.random() * stack.length);
    return stack.splice(rand, 1)[0];
}

function _getTopCard(stack)
{
    return stack.splice(0, 1)[0];
}

function _limitLane(stack, deck)
{
    while(stack.length > settings.max_cards)
    {
        deck.push(stack.splice(0, 1)[0]);
    }
}

function _shuffle(array) {
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

export default App;
