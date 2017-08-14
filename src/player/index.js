import React, { Component } from 'react';
import styled from 'styled-components';
import * as LOOP_MODES from './loop-modes';
import LeftBar from './LeftBar';
import PlayerUI from './PlayerUI';

const Wrapper = styled.div`
    width: 100%;
    max-width: 480px;
    height: 100%;
    max-height: 580px;
    display: flex;
    flex-direction: row;
`;

const MainWrapper = styled.div`
    background: #FFFFFF;
    height: 100%;
    flex: 1;
    border-radius: 16px;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0 0 18px rgba(0, 0, 0, .3);
`;


export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repeatMode: LOOP_MODES.LOOP_ONE,
            current: null,
            volume: 1,
            playing: false,
            showPlaylist: false,
            progress: 0,
            duration: 0
        };
        this.audio = window.nope = new Audio();
        this.audio.autoplay = true;
    }

    play(song) {
        this.setState({ current: song, playing: true });
        this.audio.src = song.source;
        this.audio.onended = () => {
            switch (this.state.repeatMode) {
                case LOOP_MODES.LOOP_ALL:
                    return this.onAction('next');
                case LOOP_MODES.LOOP_ONE:
                    return this.audio.play();
                case LOOP_MODES.SHUFFLE:
                    return this.play(this.props.songs[~~(Math.random() * this.props.songs.length)]);
            }
        };
        document.title = song.artist + ' - ' + song.title;
    }

    componentWillMount() {
        this.intervalRef = setInterval(() => {
            if (Number.isFinite(this.audio.currentTime) && this.audio.duration > 0) {
                this.setState({ progress: this.audio.currentTime / this.audio.duration, duration: this.audio.duration });
            } else {
                this.setState({ progress: 0, duration: 0 });
            }
        }, 100);
        this.play(this.props.songs[~~(Math.random() * this.props.songs.length)]);
    }

    componentWillUnmount() {
        clearInterval(this.intervalRef);
    }

    volumeChanged = e => {
        this.audio.volume = e;
        this.setState({ volume: e });
    };

    repeatModeChanged = e => {
        this.setState({ repeatMode: e });
    };

    /**
     * Player action from PlayerUI
     */
    onAction = e => {
        let i;
        switch (e) {
            case 'toggle':
                if (this.state.playing) {
                    this.audio.pause();
                    this.setState({ playing: false });
                } else {
                    this.audio.play();
                    this.setState({ playing: true });
                }
                break;
            case 'prev':
                i = this.props.songs.indexOf(this.state.current) - 1;
                if (i < 0) i += this.props.songs.length;
                this.play(this.props.songs[i]);
                break;
            case 'next':
                i = this.props.songs.indexOf(this.state.current) + 1;
                if (i >= this.props.songs.length) i = 0;
                this.play(this.props.songs[i]);
                break;
        }
    }

    render() {
        return (
            <Wrapper {...this.props}>
                <LeftBar onVolumeChanged={this.volumeChanged} onRepeatModeChanged={this.repeatModeChanged} volume={this.state.volume} repeatMode={this.state.repeatMode} />
                <MainWrapper>
                    {!this.state.showPlaylist ?
                        <PlayerUI song={this.state.current} duration={this.state.duration} progress={this.state.progress} onAction={this.onAction} playing={this.state.playing} />
                        :
                        <div>Todo Playlist display</div>
                    }
                </MainWrapper>
            </Wrapper>
        );
    }
}
