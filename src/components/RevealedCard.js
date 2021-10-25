// { useState, useEffect }
import React from 'react';
import formatRules from '../config/format-rules.json';

function RevealedCard(props)
{
    const { name, desc, type } = props.card;

    return (
        <div className="reveal" onClick={() => props.onClose()}>
            <div className={'reveal-inner ' + type}>
                <div className="reveal-name">{name}</div>
                <div className="reveal-desc">{_formatDesc(desc)}</div>
                <div className="reveal-remove" onClick={() => props.removeCard(props.card)}>Remove</div>
            </div>
        </div>
    )
}

function _formatDesc(desc)
{
    function _formatText(rule)
    {
        return `<span class="desc-${rule[1]}">${rule[0]}</span>`;
    }

    formatRules.forEach(formatRule => {
        desc = desc
            .replaceAll(formatRule[0], _formatText(formatRule))
            .replaceAll('\n', '<br/>')
    })

    return <div dangerouslySetInnerHTML={{__html: desc}}></div>
}

export default RevealedCard;