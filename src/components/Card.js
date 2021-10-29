import React from 'react';

function Card(props) {
    const { name, type, rank, flipped } = props.card;

    function onClick()
    {
        if(props.action)
        {
            props.action(props.card);
        }
    }

    return (
        <div className="card" onClick={onClick}>
            <div className={'card-inner ' + (type || '') + ' ' + (flipped ? 'flipped' : '')}>
                {name}
                <div className="card-rank">
                    {rank || ''}
                </div>
            </div>
        </div>
    )
}

export default Card;