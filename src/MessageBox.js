import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import './MessageBox.css';
import icon from './assets/error.png';

export default function (props) {
    let elem = (style) => (
        <div className="MessageBox" style={{ ...style, transform: 'translateY(' + style.y + 'px)' }}>
            <img className="MessageBox-icon" alt="icon" src={icon} />
            <div className="MessageBox-box">
                {props.message}
            </div>
        </div>
    );
    return (
        <Motion defaultStyle={{ opacity: 0, y: -100 }} style={{ opacity: spring(1.0), y: spring(0, presets.wobbly) }}>
            {elem}
        </Motion>
    );
}