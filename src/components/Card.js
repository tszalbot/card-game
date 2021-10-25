import React from 'react';

class Card extends React.Component {
    constructor(props)
    {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick()
    {
        if(this.props.action)
        {
            this.props.action(this.props.card);
        }
    }

    render() {
        const { name, type } = this.props.card;

        return (
            <div className={'card ' + (type || '') + ' ' + (this.props.flipped ? 'flipped' : '')} onClick={this.onClick}>
                {name}
                <div className="card-rank">
                    {this.props.rank || ''}
                </div>
            </div>
        )
    }
}

export default Card;