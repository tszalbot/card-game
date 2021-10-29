import cards from './config/cards';
import React from 'react';
import { Link } from "react-router-dom";

export default function Edit() {
    return (
        <div className="App">
            <div className="col">
                <div style={{width: '100%'}}>
                    <Link to="/cards/edit">
                        <button className="btn">
                            {'< Back'}
                        </button>
                    </Link>
                </div>

                <textarea style={{background: 'white', height: '100%'}} defaultValue={JSON.stringify(cards, null, 4)}></textarea>
            </div>
        </div>
    )
}