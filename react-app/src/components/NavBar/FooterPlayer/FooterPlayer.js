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
    const player = useRef(null);
    const playButton = useRef(null);

    useEffect(() => {
        // console.log(player?.current?.audio?.current.currentTime);
        // dispatch(setRef(player));
        audioElement = player.current;
        audioElement.crossOrigin = "anonymous";
        // pass it into the audio context
        console.log(audioElement.audio.current.dataset);
        // const track = audioContext.createMediaElementSource(audioElement.audio.current);
        // console.log(track);
        // track.connect(audioContext.destination);
    }, [song, dispatch]);

    // const playAction = () => {
    //     // check if context is in suspended state (autoplay policy)
    //     if (audioContext.state === 'suspended') {
    //         audioContext.resume();
    //     }
    //     console.log(audioContext);
    //     console.log(playButton.current.dataset);
    //     // play or pause track depending on state
    //     if (playButton.current.dataset.playing === 'false') {
    //         audioElement.play();
    //         playButton.current.dataset.playing = 'true';
    //     } else if (playButton.current.dataset.playing === 'true') {
    //         audioElement.pause();
    //         playButton.current.dataset.playing = 'false';
    //     }
    // };

  return (
    <footer className={song ? "footer" : "footer-hidden"} >
      <AudioPlayer layout="horizontal-reverse"
        showSkipControls={true}
        showJumpControls={false}
        autoPlay={false}
        src={song?.url}
        ref={player}
      />
      {/* <audio src={song?.url} ref={player}></audio> */}
      {/* <button ref={playButton} onClick={playAction} data-playing="false" role="switch" aria-checked="false"> */}
    {/* <span>Play/Pause</span> */}
{/* </button> */}
      {/* <div ref={waveformRef}></div> */}
    </footer>
  );
}

export default Footer;
