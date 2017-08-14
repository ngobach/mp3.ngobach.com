import React from 'react';
import styled from 'styled-components';
import BUTTON_IMAGES from '../assets/buttons';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const TopZone = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-size: cover;
    background-position: center;
    background-color: #FF9A8B;
    background-image: -webkit-linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
    background-image: -moz-linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
    background-image: -o-linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
    background-image: linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
    background-image: ${props => (props.img && 'url(' + props.img + ')') || null}
`;

const BottomZone = styled.div`
    width: 100%;
    flex-basis: 180px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SDWrapper = styled.div`
    background: rgba(0,0,0,.3);
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SDTitle = styled.h2`
    margin: 0;
    font-size: 16pt;
    line-height: 18pt;
    font-weight: bold;
    color: #FFFFFF;
    margin-bottom: 4px;
    font-family: 'Bungee', cursive;
    text-shadow: 0 0 5px rgba(0, 0, 0, .5);
`;

const SDSubTitle = SDTitle.extend`
    font-size: 12pt;
    line-height: 14pt;
    font-weight: 900;
    font-family: Comfortaa, cursive;
`;

class SongDisplay extends React.Component {

    render() {

        return (
            <SDWrapper>
                <SDTitle>{this.props.title}</SDTitle>
                <SDSubTitle>{this.props.artist}</SDSubTitle>
            </SDWrapper>
        );
    }
}

const PlayerProgressStyles = {

    Wrapper: styled.div`
        background: rgba(0,0,0,.6);
        height: 48px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    `,
    Time: styled.span`
        color: #FFFFFF;
        display: inline-block;
        text-align: center;
        padding: 0 4px;
        flex-basis: 38px;
        font-size: 9pt;
    `,
    ProgressBar: styled.div`
        height: 10px;
        width: ${props => props.width || '100%'};
        background: ${props => props.background || '#888'};
        border-radius: 5px;
        overflow: hidden;
    `
}

class PlayerProgress extends React.Component {
    render() {
        const toMinutes = x => {
            const padded = x => x < 10 ? '0' + x : x;
            x = ~~x;
            return padded(~~(x / 60)) + ':' + padded(x % 60);
        };

        let current = this.props.total * this.props.progress;
        return (
            <PlayerProgressStyles.Wrapper>
                <PlayerProgressStyles.Time>{toMinutes(current)}</PlayerProgressStyles.Time>
                <PlayerProgressStyles.ProgressBar background="rgba(0, 0, 0, .5)">
                    <PlayerProgressStyles.ProgressBar width={this.props.progress * 100 + '%'} background="#FF6860" />
                </PlayerProgressStyles.ProgressBar>
                <PlayerProgressStyles.Time>{toMinutes(this.props.total)}</PlayerProgressStyles.Time>
            </PlayerProgressStyles.Wrapper>
        );
    }
}

const Button = styled.button`
    width: ${p => p.size};
    height: ${p => p.size};
    background: #DCE1E9;
    border-radius: 50%;
    border: none;
    outline: none;
    color: #FFFFFF;
    padding: 16px;
    cursor: pointer;
    margin: 8px;
    &:hover {
        background: #C1CAD9;
    }
`;

class RoundedButton extends React.Component {
    render() {
        return (
            <Button size={this.props.size} onClick={this.props.onClick}>
                <img src={this.props.img} alt="" style={{ width: '100%', height: '100%' }} />
            </Button>
        );
    }
}

export default class PlayerUI extends React.Component {
    togglePlay = () => {
        this.props.onAction('toggle');
    };

    prev = () => {
        this.props.onAction('prev');
    };

    next = () => {
        this.props.onAction('next');
    };

    render() {
        return (
            <Wrapper>
                <TopZone img={this.props.song.cover}>
                    <SongDisplay title={this.props.song.title} artist={this.props.song.artist} />
                    <PlayerProgress total={this.props.duration} progress={this.props.progress} />
                </TopZone>
                <BottomZone>
                    <RoundedButton size="80px" img={BUTTON_IMAGES.PREV} onClick={this.prev} />
                    <RoundedButton size="100px" img={this.props.playing ? BUTTON_IMAGES.PAUSE : BUTTON_IMAGES.PLAY} onClick={this.togglePlay} />
                    <RoundedButton size="80px" img={BUTTON_IMAGES.NEXT} onClick={this.next} />
                </BottomZone>
            </Wrapper>
        );
    }
};
