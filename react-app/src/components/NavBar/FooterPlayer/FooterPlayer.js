import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
// import random from Math;
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getOneSong, getAllSongs } from '../../../store/song';
import { playingState, timeRequest, setPlayerTime, addSongToPlayer } from '../../../store/player'


function Footer() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const waveformRef = useSelector(state => state.player.ref);
    const song = useSelector(state => state.player.currentSong);
    const songsObj = useSelector(state => state.songs.songs);
    const songs = Object.values(songsObj);
    const player = useRef(null);

    useEffect(() => {
    });
    
    
    const changeSongPage = (e) => {
      e.preventDefault();
      dispatch(getOneSong(song.id));
      history.push(`/songs/${song.id}`);
    };

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

    const newSong = () => {
      dispatch(getAllSongs());
      const songsLength = songs.length;
      const randomSongIdx = Math.floor(Math.random() * songsLength);
      dispatch(addSongToPlayer(songs[randomSongIdx].id));
      setPlay();
      dispatch(setPlayerTime(0));
      dispatch(playingState(false));
    };
    

  return (
    <footer className={song ? "footer" : "footer-hidden"} >
      <AudioPlayer layout="horizontal-reverse"
        showSkipControls={true}
        showJumpControls={false}
        autoPlay={false}
        customAdditionalControls={[]}
        src={song?.url}
        ref={player}
        onPlay={setPlay}
        onPause={setPause}
        onListen={setTime}
        onEnded={newSong}
        onClickNext={newSong}
      />
                    <button onClick={e => changeSongPage(e)} >
                        {song?.title}
                    </button>
      <div>{song?.artist}</div>
    </footer>
  );
}

export default Footer;
