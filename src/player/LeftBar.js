import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import imgShuffle from '../assets/repeatShuffle.png';
import imgRepeatOne from '../assets/repeatOne.png';
import imgRepeatAll from '../assets/repeatAll.png';
import * as LOOP_MODES from './loop-modes';

const Wrapper = styled.div`
    width: 68px;
    height: 100%;
    padding: 16px 0;
    box-sizing: border-box;
`;

const Inner = styled.div`
    width: 100%;
    height: 100%;
    background: #444D56;
    border-radius: 16px 0 0 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Button = styled.button`
    width: 100%;
    height: 64px;
    padding: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    text-align: center;
    opacity: .5;
    background-image: url('${p => p.img}');
    ${p => p.selected && css`
        opacity: 1;
    `}
    background-size: 24px 24px;
    background-position: center;
    background-repeat: no-repeat;
    transition: all ease 250ms;
`;

export default class LeftBar extends Component {
    render() {
        let loopmode = this.props.repeatMode;
        return (
            <Wrapper>
                <Inner>
                    <Button selected={loopmode === LOOP_MODES.SHUFFLE} img={imgShuffle} onClick={() => this.props.onRepeatModeChanged(LOOP_MODES.SHUFFLE)} />
                    <Button selected={loopmode === LOOP_MODES.LOOP_ONE} img={imgRepeatOne} onClick={() => this.props.onRepeatModeChanged(LOOP_MODES.LOOP_ONE)} />
                    <Button selected={loopmode === LOOP_MODES.LOOP_ALL} img={imgRepeatAll} onClick={() => this.props.onRepeatModeChanged(LOOP_MODES.LOOP_ALL)} />
                </Inner>
            </Wrapper>
        );
    }
}
