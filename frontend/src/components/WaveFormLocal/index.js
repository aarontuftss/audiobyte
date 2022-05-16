import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

class WaveFormLocal extends Component {  
  state = {
    playing: false,
  };

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });

    this.waveform.load(track);
  };
  
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };
  
  render() {
    const url = this.props.song.songUrl

    return (
        <div className='mainDiv'>
            <WaveformContianer>
                <PlayButton onClick={this.handlePlay} >
                {!this.state.playing ? 'Play' : 'Pause'}
                </PlayButton>
                <Wave id="waveform" />
                <audio id="track" src={url} />
            </WaveformContianer>
        </div>
    );
  }
};

export default WaveFormLocal;