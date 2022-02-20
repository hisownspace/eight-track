import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getOneSong } from '../../../store/song';
import { setRef } from '../../../store/player'

const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
// audioContext.crossOrigin = "anonymous";

function Footer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const waveformRef = useSelector(state => state.player.ref)
    const song = useSelector(state => state.player.currentSong);
    let audioElement;
    const player = useRef();

    useEffect(() => {
        // console.log(player?.current?.audio?.current.currentTime);
        // dispatch(setRef(player));
        audioElement = player.current;
        audioElement.crossOrigin = "anonymous";
        // pass it into the audio context
        const track = audioContext.createMediaElementSource(audioElement);
        console.log(track);
        track.connect(audioContext.destination);
    }, [song, dispatch]);

    const playAction = () => {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (audioContext.dataset.playing === 'false') {
        audioElement.play();
        audioContext.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        audioContext.dataset.playing = 'false';
    }
    };

  return (
    <footer className="footer">
      {/* <AudioPlayer layout="horizontal-reverse"
        showSkipControls={true}
        showJumpControls={false}
        autoPlay={false}
        src={song?.url}
        ref={player}
      /> */}
      <audio src={"http://hisownbucket.s3.amazonaws.com/fb05f2ebc96740d6847058c841e8efa3.mp3"} ref={player}></audio>
      <button onClick={playAction} data-playing="false" role="switch" aria-checked="false">
    <span>Play/Pause</span>
</button>
      {/* <div ref={waveformRef}></div> */}
    </footer>
  );
}

export default Footer;
