import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
// import random from Math;
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getOneSong, getAllSongs } from '../../store/song';
import { playingState, timeRequest, setPlayerTime, addSongToPlayer, setPlayer } from '../../store/player'
import getCloudFrontDomain from '../../presignHelper';


function Footer() {
    const history = useHistory();
    const dispatch = useDispatch();
    const waveformRef = useSelector(state => state.player.ref);
    const song = useSelector(state => state.player.currentSong);
    const songsObj = useSelector(state => state.songs.songs);
    let songs;
    if (songsObj) {
      songs = Object.values(songsObj);
    }
    const player = useRef(null);

    const [signedSong, setSignedSong] = useState();

    useEffect(() => {
      (async () => {
        const signed = await getCloudFrontDomain(song?.url);
        setSignedSong(signed);
        await dispatch(getAllSongs());
      })()
    }, [song]);
    
    
    useEffect(() => {
      dispatch(setPlayer(player));
    }, [dispatch]);

    const changeSongPage = (e) => {
      e.preventDefault();
      history.push(`/songs/${song.id}`);
    };

    useEffect(() => {
      dispatch(timeRequest());
    }, [waveformRef]);

    const setPlay = async () => {
      dispatch(playingState(true));
    };

    const setPause = () => {
      dispatch(playingState(false));
    };

    const setTime = (e) => {
      if (e === 0) {
        dispatch(setPlayerTime(0));
      } else {
        dispatch(setPlayerTime(e.srcElement.currentTime));
      }
      // e.srcElement.pause();
      // player.current.audio.current.pause()
    };

    const newSong = async () => {
      const songsLength = songs.length;
      const randomSongIdx = Math.floor(Math.random() * songsLength);
      if (songs[randomSongIdx]) {
        await dispatch(addSongToPlayer(songs[randomSongIdx].id));
        setPlay();
        dispatch(setPlayerTime(0));
        dispatch(playingState(true));
      } else {
        dispatch(addSongToPlayer(songs[1].id));
        setPlay();
        dispatch(setPlayerTime(0));
        dispatch(playingState(true));
      }
    };
    

  return (
    <footer className={song ? "footer" : "footer-hidden"} >
      <AudioPlayer layout="horizontal-reverse"
        showSkipControls={true}
        showJumpControls={false}
        autoPlay={false}
        customAdditionalControls={[]}
        src={signedSong}
        ref={player}
        // onListen={setTime}
        onPlay={setPlay}
        onPause={setPause}
        onSeeked={setTime}
        onClickNext={newSong}
        onEnded={newSong}
        onCanPlay={e => setTime(0)}
      />
                    <button
                      onClick={e => changeSongPage(e)}
                      className="player-button" 
                    >
                        {song?.title}
                    </button>
      <div className = "player-title">{song?.artist}</div>
    </footer>
  );
}

export default Footer;
