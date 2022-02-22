import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import WaveSurfer from "wavesurfer.js";
import { addSongToPlayer, setRef } from "../../store/player";

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
  // Use the PeakCache to improve rendering speed of large waveforms.
  // partialRender: true
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
        wavesurfer.current.load(songUrl);
      }
      
      wavesurfer.current.on("ready", function () {
        wavesurfer.current.setMute(true);
        wavesurfer.current.seekTo(0);
        setLoaded(true);
      });
      
      wavesurfer.current.on("finish", function () {
        setPlay(false);
      });

      // wavesurfer.current.on("audioprocess", function () {
      //   setCurrentTime(wavesurfer.current.getCurrentTime());

      // });
      return () => wavesurfer.current.destroy();
    }
  }, [songUrl]);
  
    useEffect(() => async () => {
      if (!loaded && playTime && song && playerSong?.url === Object.values(song)[0]?.url) {
        setPlay(!playing);
        wavesurfer.current?.seekTo(playTime / Object.values(song)[0]?.length);
        wavesurfer.current?.playPause();
        console.log(wavesurfer.current?.getCurrentTime());
      }
    }, [playTime, dispatch, loaded, wavesurfer]);

    useEffect(() => {
      if (playTime && song && wavesurfer && playerSong?.url === Object.values(song)[0]?.url) {
        wavesurfer?.current?.seekTo(playTime / Object.values(song)[0]?.length);
      }
    }, [playTime]);

  useEffect(() => {
    if (!playState) {
      wavesurfer?.current?.pause();
    } else {
      wavesurfer?.current?.play();
    }
  }, [playState]);
  
  const handlePlayPause = async () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
    dispatch(addSongToPlayer(songId));
    dispatch(setRef(waveformRef));
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        {loaded ? <button onClick={handlePlayPause}>{!playing  || playerUrl !== song.current?.url ? "Play" : "Pause"}</button> : null}
      </div>
    </div>
  );
}
