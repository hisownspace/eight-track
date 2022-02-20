import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getOneSong } from '../../../store/song';

function Footer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const song = useSelector(state => Object.values(state.songs.song)[0]);

  return (
    <footer className="footer">
      <AudioPlayer layout="horizontal-reverse"
      showSkipControls={true}
      showJumpControls={false}
      autoPlay={false}
      src={song?.url} />
    </footer>
  );
}

export default Footer;
