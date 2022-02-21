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
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export default function WaveformTEST({ songId }) {
  const playerSong = useSelector(state => state.player.currentSong)
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const playerUrl = useSelector(state => state.player.currentSong?.url)
  const song = useSelector(state => state.songs.song);
  const songUrl = Object.values(song)[0]?.url
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);
    console.log(songUrl)
    if (songUrl) {
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      if (songUrl) {
        wavesurfer.current.load(songUrl);
      }

      wavesurfer.current.on("ready", function () {
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
        }
        wavesurfer.current.setMute(true);
      });
      
      wavesurfer.current.on("finish", function () {
        setPlay(false);
      });
      
      return () => wavesurfer.current.destroy();
    }
  }, [songUrl]);
  

  // useEffect(() => {
  //   dispatch(setRef(waveformRef))
  // }, [dispatch, songId]);
  
  const handlePlayPause = async () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
    dispatch(addSongToPlayer(songId));
    // console.log(wavesurfer.current.getCurrentTime());
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 0);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
}
