import React, {useState} from 'react';
import formatRules from '../config/format-rules.json';

function RevealedCard(props)
{
    const [editMode, switchEditMode] = useState(false);
    const [name, setName] = useState(props.card.name);
    const [desc, setDesc] = useState(props.card.desc);
    const { type, id } = props.card;

    function stopPropagation(e) {
        e.stopPropagation();
    }

    function saveCard() {
        switchEditMode(false);
        props.cardChanged(type, id, name, desc);
    }

    if(!editMode)
    {
        return (
            <div className="reveal" onClick={props.onClose}>
                <div className={'reveal-inner ' + type} onClick={stopPropagation}>
                    <div className="reveal-name">{name}</div>
                    <div className="reveal-desc">{_formatDesc(desc)}</div>
                    <div className="reveal-footer">
                        <div className="reveal-btn red" onClick={() => {props.onClose(); props.removeCard(props.card)}}>Remove</div>
                        <div className="reveal-btn blue" onClick={() => switchEditMode(true)}>Edit</div>
                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className="reveal" onClick={props.onClose}>
                <div className={'reveal-inner ' + type} onClick={stopPropagation}>
                    <div className="reveal-name">
                        <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="reveal-desc">
                        <textarea defaultValue={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>

                    <div className="reveal-footer">
                        <div className="reveal-btn blue" onClick={saveCard}>Save</div>
                    </div>
                </div>
            </div>
        )
    }
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