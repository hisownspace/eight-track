import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Footer.css';
// import random from Math;
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getOneSong, getAllSongs } from '../../store/song';
import { addSongToPlaylist, nextSong } from '../../store/playlist';
import { playingState, setPlayerTime, addSongToPlayer, setPlayer } from '../../store/player'
import getCloudFrontDomain from '../../presignHelper';
import playlistReducer from '../../store/playlist';


function Footer() {
    const history = useHistory();
    const dispatch = useDispatch();
    const waveformRef = useSelector(state => state.player.ref);
    const song = useSelector(state => state.player.currentSong);
    const songsObj = useSelector(state => state.songs.songs);
    const playlist = useSelector(state => state.playlist.playlist);
    const currentSongIdx = useSelector(state => state.playlist.currentSongIndex);

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

    const setPlay = async () => {
      dispatch(playingState(true));
    };

    const setPause = () => {
      dispatch(playingState(false));
    };

    const previousSong = () => {
      if (currentSongIdx > 0) {
        dispatch(nextSong("down"));
      } else {
        player.current.audio.current.currentTime = 0;
        dispatch(setPlayerTime(0));
      }
    };

    const setTime = (e) => {
      if (e === 0) {
        dispatch(setPlayerTime(0));
      } else {
        dispatch(setPlayerTime(e.srcElement.currentTime));
      }

      if (playlist.length === 0) {
        dispatch(addSongToPlaylist(song.id));
      }
      if (currentSongIdx >= playlist.length - 1) {
        const songsLength = songs.length;
        const randomSongIdx = Math.floor(Math.random() * songsLength);
        dispatch(addSongToPlaylist(songs[randomSongIdx].id))
      }
    };

    const newSong = () => {
      dispatch(nextSong("up"));
    };


    useEffect(() => {
      if (currentSongIdx) {
        dispatch(addSongToPlayer(playlist[currentSongIdx]));
        setPlay();
        dispatch(setPlayerTime(0));
        dispatch(playingState(true));
      }
    }, [currentSongIdx]);


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
        onClickPrevious={previousSong}
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
