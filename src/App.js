import React, { Component } from 'react';
import MessageBox from './MessageBox';
import { Motion, spring } from 'react-motion';
import Loader from 'halogen/RingLoader';
import Player from './player';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current: null,
      error: null
    };
  }

  componentWillMount() {
    fetch(process.env.REACT_APP_API + (process.env.NODE_ENV === 'production' ? '' : '?domain=ngobach.com')).then(resp => resp.json()).then(json => {
      this.albums = json;
      let map = new Map();
      json.forEach(a => {
        a.songs.forEach(song => {
          map.set(song.id, song);
        });
      });
      this.songs = [...map.values()];
      this.setState({ current: 'all' });
    }).catch(err => {
      console.error(err);
      this.setState({ error: err });
    });
  }

  render() {
    let el = null;
    if (this.state.current) {
      let songs;
      if (this.albums.some(a => a.id === this.state.current)) {
        songs = this.albums.find(a => a.id === this.state.current).songs;
      } else {
        songs = this.songs;
      }
      el = (
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
          {styles => (<Player style={styles} songs={songs} albums={this.albums} />)}
        </Motion>
      );
    } else if (this.state.error) {
      // Showing error
      el = <MessageBox message={this.state.error.message || 'Unknown error'} />;
    } else {
      el = (
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
          {styles => (<div style={styles}><Loader /></div>)}
        </Motion>
      );
    }
    return (
      <div className="App">
        {el}
      </div>
    );
  }
}

export default App;
