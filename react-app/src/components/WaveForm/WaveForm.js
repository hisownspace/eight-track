import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import './WaveForm.css';

import WaveSurfer from "wavesurfer.js";
import { addSongToPlayer } from "../../store/player";
import getCloudFrontDomain from "../../presignHelper";
import { clearPlaylist, addSongToPlaylist } from "../../store/playlist";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#FF4500",
  cursorColor: "OrangeRed",
  barWidth: 2,
  barRadius: 2,
  cursorWidth: 0,
  responsive: true,
  height: 100,
  partialRender: true,
  pixelRatio: 1,
  // normalize: true,
  interact: true,
  hideScrollbar: true,
  autoCenter: true,
});

export default function WaveForm({ songId }) {
  const playerSong = useSelector(state => state.player.currentSong);
  const dispatch = useDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const playTime = useSelector(state => state.player.time);
  const song = useSelector(state => Object.values(state.songs.song));
  const playState = useSelector(state => state?.player.playing);
  const player = useSelector(state => state.player.player);
  const songUrl = Object.values(song)[0]?.url
  const [loaded, setLoaded] = useState(false);


  // create new WaveSurfer instance
  // On component mount and when url changes
  
  useEffect(() => {
    if (songUrl) {
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      if (songUrl) {
        getCloudFrontDomain(songUrl).then(signedSongUrl =>{
          wavesurfer.current?.load(signedSongUrl);
        }
          
        );
      }
      wavesurfer.current.on("ready", async function () {
        setLoaded(true);
        wavesurfer.current.setMute(true);
        // syncs waveform with song playing if they match
        if (playerSong?.url === songUrl) {
          const currentTime  = player.current?.audio.current.currentTime;
          const songLength = Object.values(song)[0].length;
          const seek = currentTime / songLength;
          if (seek > 0 && seek < 1) {
            wavesurfer.current.seekTo(currentTime / songLength);
          }
          // if song is playing, starts waveform
          if (playState) {
            wavesurfer.current.play();
          }
        } else {
          wavesurfer.current.seekTo(0);
        }
      });
      
      // when the waveform ends, it resets
      wavesurfer.current.on("finish", function () {
        wavesurfer.current.seekTo(0);
        wavesurfer.current.pause();
      });
      return () => wavesurfer.current.destroy();
    }
  }, [songUrl]);
  

  useEffect(() => {
    if (playState && songUrl === playerSong?.url) {
      wavesurfer.current?.play();
    } else {
      wavesurfer.current?.pause();
    }
  }, [playState, songUrl, playerSong?.url]);


  // allows the waveform to control the position of the
  // footer player
  useEffect(() => {
    wavesurfer.current?.on("seek", function (e) {
      const surfTime = wavesurfer.current.getCurrentTime();
      const playerTime = player.current?.audio.current.currentTime;
      // loopSeparator prevents infinite loop between
      // the two player control interfaces
      const loopSeparator = (Math.abs(playerTime - surfTime));
      if(playerSong?.url === songUrl && surfTime !== 0 && loopSeparator > 1) {
        player.current.audio.current.currentTime = surfTime;
      }
    });
    // this event listener can be used to toggle the
    // traveling comments
    wavesurfer.current?.on("audioprocess", function (e) {
    });
  }, [songUrl, playerSong, player]);


  // causes the waveform to seek to the appropriate position
  // once it loads
  // if the player is playing and the songs are the same
  useEffect(() => {
    if (playerSong?.url === songUrl) {
      const currentTime  = player?.current?.audio.current.currentTime;
      const songLength = Object.values(song)[0]?.length;
      const seek = currentTime / songLength;
      if (seek > 0 && seek < 1) {
        wavesurfer.current?.seekTo(currentTime / songLength);
      }
    }
  }, [playTime, player, song, songUrl, playerSong?.url]);


  // seeks the waveform appropriately when the song changes
  useEffect(() => {
    if (songUrl !== playerSong?.url && wavesurfer) {
      wavesurfer.current?.seekTo(0);
      wavesurfer.current?.pause();
    } else if (songUrl === playerSong?.url) {
      wavesurfer.current?.seekTo(0);
      wavesurfer.current?.play();

    }
  }, [songUrl, playerSong?.url]);


  // handles the waveform play/pause buttons
  const handlePlayPause = async () => {
    if (playerSong?.url !== songUrl){
      dispatch(clearPlaylist());
      addSongToPlaylist(song.id)
      dispatch(addSongToPlayer(songId));
      wavesurfer.current.play();
    } else if (playState){
      wavesurfer.current.pause();
      player.current.audio.current.pause();

    } else {
      player.current.audio.current.play();
      wavesurfer.current.play();
    }
  };

  useEffect(() => {

  }, []);


  return (
    <div className="waveform">
      <div className="controls">
        {loaded || true ? ((!playState || (playerSong?.url !== songUrl)) ? 
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
