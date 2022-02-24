import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getOneSong } from '../../../store/song';
import { playingState, timeRequest, setPlayerTime } from '../../../store/player'


function Footer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const waveformRef = useSelector(state => state.player.ref)
    const song = useSelector(state => state.player.currentSong);
    const player = useRef(null);

    useEffect(() => {
      // dispatch(get)
      console.log(song?.id);
    });

    useEffect(() => {
      dispatch(timeRequest());
    }, [waveformRef]);

    const setPlay = () => {
      dispatch(playingState(true));
    };

    const setPause = () => {
      dispatch(playingState(false));
    };

    const setTime = e => {
      dispatch(setPlayerTime(e.srcElement.currentTime));
    };

  return (
    <footer className={song ? "footer" : "footer-hidden"} >
      <AudioPlayer layout="horizontal-reverse"
        showSkipControls={true}
        showJumpControls={false}
        autoPlay={false}
        src={song?.url}
        ref={player}
        onPlay={setPlay}
        onPause={setPause}
        onListen={setTime}
      />
      <div><Link to={`/songs/${song?.id}`}>{song?.title}</Link></div>
      <div>{song?.artist}</div>
    </footer>
  );
}

export default Footer;
