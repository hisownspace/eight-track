import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getOneSong } from '../../../store/song';
import { setRef } from '../../../store/player'

function Footer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const waveformRef = useSelector(state => state.player.ref)
    const song = useSelector(state => state.player.currentSong);

    const player = useRef();

    useEffect(() => {
        console.log(player?.current?.audio?.current.currentTime);
        // dispatch(setRef(player));
    }, [song, dispatch]);

  return (
    <footer className="footer">
      <AudioPlayer layout="horizontal-reverse"
        showSkipControls={true}
        showJumpControls={false}
        autoPlay={false}
        src={song?.url}
        ref={player}
      />
      {/* <audio src={song?.url} ref={player} controls></audio> */}
      <div ref={waveformRef}></div>
    </footer>
  );
}

export default Footer;
