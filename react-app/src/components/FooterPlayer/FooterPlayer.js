import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Footer.css";
// import random from Math;
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAllSongs, getOneSong } from "../../store/song";
import { addSongToPlaylist, nextSong } from "../../store/playlist";
import {
  playingState,
  setPlayerTime,
  addSongToPlayer,
  setPlayer,
} from "../../store/player";
import getCloudFrontDomain from "../../presignHelper";

function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [volume, setVolume] = useState("100%");
  const song = useSelector((state) => state.player.currentSong);
  const songsObj = useSelector((state) => state.songs.songs);
  const playlist = useSelector((state) => state.playlist.playlist);
  // let volumeBar = useRef(null);
  // let volumeIndicator = useRef(null);
  const currentSongIdx = useSelector(
    (state) => state.playlist.currentSongIndex
  );

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
    })();
  }, [song, dispatch]);

  useEffect(() => {
    dispatch(setPlayer(player));
  }, [dispatch]);

  // const changeSongPage = (e) => {
  //   e.preventDefault();
  //   dispatch(getOneSong(song.id));
  //
  //   history.push(`/songs/${song.id}`);
  // };

  const setPlay = async () => {
    dispatch(playingState(true));
  };

  useEffect(() => {
    const volumeBar = document.querySelector(".rhap_volume-bar");
    const volumeProgress = document.createElement("div");
    volumeProgress.className = "volume-progress";
    player.current.audio.current.addEventListener("volumechange", (e) => {
      setVolume(`${(e.target.volume * 100).toFixed(0)}%`);
    });
    const volumeIndicator = document.querySelector(".rhap_progress-indicator");
    document
      .querySelector(".rhap_progress-container")
      .addEventListener("mouseleave", (e) => {
        document.querySelector(".rhap_progress-indicator").style.display =
          "none";
      });
    document
      .querySelector(".rhap_progress-container")
      .addEventListener("mouseover", (e) => {
        document.querySelector(".rhap_progress-indicator").style.display =
          "block";
      });
    volumeProgress.style.width = volume;

    volumeBar.appendChild(volumeProgress);
    return () => {
      volumeBar.removeChild(volumeProgress);
    };
  }, [volume]);

  const setPause = () => {
    dispatch(playingState(false));
  };

  const previousSong = () => {
    if (currentSongIdx > 0) {
      dispatch(nextSong("down"));
      dispatch(addSongToPlayer(playlist[currentSongIdx - 1]));
    } else {
      player.current.audio.current.pause();
      player.current.audio.current.currentTime = 0;
      dispatch(setPlayerTime(0));
      player.current.audio.current.play();
    }
  };

  const setTime = (e) => {
    if (e === 0) {
      dispatch(setPlayerTime(0));
    } else {
      dispatch(setPlayerTime(e.srcElement.currentTime));
    }

    if (playlist?.length === 0) {
      dispatch(addSongToPlaylist(song.id));
    }
    if (currentSongIdx === playlist?.length - 1) {
      const songsLength = songs.length;
      let randomSongIdx = Math.floor(Math.random() * songsLength);
      while (songs[randomSongIdx].id === playlist[playlist.length - 1]) {
        randomSongIdx = Math.floor(Math.random() * songsLength);
      }
      dispatch(addSongToPlaylist(songs[randomSongIdx].id));
    }
    if (currentSongIdx >= playlist?.length) {
      dispatch(nextSong("down"));
    }
  };

  const newSong = () => {
    if (playlist[currentSongIdx] === playlist[currentSongIdx + 1]) {
      player.current.audio.current.pause();
      player.current.audio.current.currentTime = 0;
      dispatch(setPlayerTime(0));
      player.current.audio.current.play();
      dispatch(nextSong("up"));
    } else {
      setTime(0);
      dispatch(nextSong("up"));
    }
  };

  const searchArtist = () => {
    history.push(`/search?q=${song?.artist}`);
  };

  // useEffect(() => {
  //
  // }, [player]);

  useEffect(() => {
    if (currentSongIdx) {
      dispatch(addSongToPlayer(playlist[currentSongIdx]));
      setPlay();
      dispatch(setPlayerTime(0));
      dispatch(playingState(true));
    }
  }, [currentSongIdx]);

  return (
    <footer className={song ? "footer" : "footer-hidden"}>
      <div className="footer-div">
        <AudioPlayer
          layout="horizontal-reverse"
          showSkipControls={true}
          showJumpControls={false}
          customAdditionalControls={[]}
          src={signedSong}
          ref={player}
          onPlay={setPlay}
          onPause={setPause}
          onSeeked={setTime}
          onClickNext={newSong}
          onClickPrevious={previousSong}
          onEnded={newSong}
          onCanPlay={(e) => setTime(0)}
          className="footer-player"
        />
        <div className="footer-player-info">
          <div className="player-art-container">
            <Link to={`/songs/${song?.id}`}>
              <img className="player-art" src={song?.image_url} />
            </Link>
          </div>
          <div className="player-text-info">
            <Link className="player-song-title" to={`/songs/${song?.id}`}>
              <div className="player-button">{song?.title}</div>
            </Link>
            <Link to={`/search?q=${song?.artist}`}>
              <div className="player-title">{song?.artist}</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
