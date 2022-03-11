import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import './WaveForm.css';

import WaveSurfer from "wavesurfer.js";
import { addSongToPlayer, setRef } from "../../store/player";
import getPreSignedUrl from "../../presignHelper";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 1,
  responsive: true,
  height: 100,
  normalize: true,
  interact: false,
});

export default function WaveformTEST({ songId }) {
  const playerSong = useSelector(state => state.player.currentSong);
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const playTime = useSelector(state => state.player.time);
  const playerUrl = useSelector(state => state.player.currentSong?.url)
  const song = useSelector(state => state.songs.song);
  const playState = useSelector(state => state?.player.playing);
  const player = useSelector(state => state.player.player);
  const songUrl = Object.values(song)[0]?.url
  const [loaded, setLoaded] = useState(false);

  // create new WaveSurfer instance
  // On component mount and when url changes
  
  useEffect(() => {
    setPlay(false);

    if (songUrl) {
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      if (songUrl) {
        getPreSignedUrl(songUrl).then(signedSongUrl =>
          wavesurfer.current.load(signedSongUrl)
        );
      }
      
      wavesurfer.current.on("ready", function () {
        wavesurfer.current.setMute(true);
        wavesurfer.current.seekTo(0);
        setLoaded(true);
      });
  

      
      wavesurfer.current.on("finish", function () {
        setPlay(false);
      });

      return () => wavesurfer.current.destroy();
    }
  }, [songUrl]);

    // useEffect(() => {
    //   wavesurfer.current?.on("interaction", function () {
    //     console.log("you have scrolled");
    //     const surfTime = wavesurfer.current.getCurrentTime();
    //     if (Math.abs(surfTime - playTime) > 2) {
    //       // dispatch(setPlayerTime(wavesurfer.current.getCurrentTime()));
    //       console.log("THIS NEVER HAPPENS!!!")
    //     }
    //     console.log(wavesurfer.current.getCurrentTime());
    //     console.log(playTime);
    //   });
    // })
  
    useEffect(() => async () => {
      if (playTime === 0) {
        wavesurfer.current.seekTo(0);
        wavesurfer.current.pause();
      }
      if (!loaded && playTime && song && playing && playerSong?.url === Object.values(song)[0]?.url) {
        setPlay(!playing);
        wavesurfer.current?.seekTo(playTime / Object.values(song)[0]?.length);
        wavesurfer.current?.playPause();
      }
    }, [playTime, dispatch, loaded, wavesurfer]);

    useEffect(() => {
      if (loaded && playTime && song && playState && playerSong?.url === Object.values(song)[0]?.url) {
        wavesurfer?.current?.seekTo(playTime / Object.values(song)[0]?.length);
        // setLoaded(false);
        wavesurfer?.current.play();
      }
    }, [playTime, loaded, playState, song, playerSong?.url]);

  useEffect(() => {
    if (!playState) {
      wavesurfer?.current?.pause();
    } else {
      wavesurfer?.current?.play();
    }
  }, [playState]);
  
  const handlePlayPause = async () => {
    setPlay(!playState);
    if (playerSong?.url !== Object.values(song)[0]?.url){
      dispatch(addSongToPlayer(songId));
      dispatch(setRef(waveformRef));
      wavesurfer.current.play();
    } else if (playState){
      wavesurfer.current.pause();
      player.current.audio.current.pause();
    } else {
      player.current.audio.current.play();
      wavesurfer.current.play();

    }
  };

  return (
    <div className="waveform">
      <div className="controls">
        {loaded ? ((!playState || (playerUrl !== songUrl)) ? 
        <button
          className="waveform-play"
          onClick={handlePlayPause}
        >
            <FontAwesomeIcon icon={faPlay} />
        </button> : <button
          className="waveform-play"
          onClick={handlePlayPause}
        >
            <FontAwesomeIcon icon={faPause} />
        </button>) : null}
      </div>
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}
