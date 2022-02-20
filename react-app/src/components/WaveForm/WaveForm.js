import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import './WaveForm.css';
import WaveSurfer from "wavesurfer.js";
import { useSelector } from 'react-redux';
import { addSongToPlayer } from '../../store/player'


const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "#eee",
    progressColor: "OrangeRed",
    cursorColor: "OrangeRed",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    xhr: { cache: 'default',
    mode: 'no-cors',}
  });


function WaveForm() {
    // const [waveformLoaded, setWaveformLoaded] = useState(false);
    // const dispatch = useDispatch();
    // const waveformRef = useRef(null);
    // const wavesurfer = useRef(null);
    // const [playing, setPlay] = useState(false);
    // const [volume, setVolume] = useState(0.5);
    // const song = useSelector(state => state.songs.song);
    // // const ref = useSelector(state => state.player.ref);
    // const playerSong = useSelector(state => state.player.currentSong)

    // useEffect(() => {
    //     if (playerSong?.url) {
    //         console.log(playerSong.url)
    //         setPlay(false);
            
    //         const options = formWaveSurferOptions(waveformRef.current);
    //         wavesurfer.current = WaveSurfer.create(options);

    //         wavesurfer.current.load(playerSong.url);
            
    //         wavesurfer.current.on('ready', function () {
    //             if (wavesurfer.current) {
    //                 wavesurfer.current.setVolume(volume);
    //                 setVolume(volume);
    //                 console.log(wavesurfer.current.getDuration())
    //                 wavesurfer.current.getDuration();
    //             }
    //             wavesurfer.getDuration();
    //         });
    //     }
    // }, [playerSong]);

    // const setSong = () => {
    //     // console.log("---------", Object.values(song)[0].id);
    //     dispatch(addSongToPlayer(Object.values(song)[0].id));
    // }

    // const handlePlayPause = () => {
    //     setPlay(!playing);
    //     wavesurfer.current.playPause();
    //   };
    
    //   const onVolumeChange = e => {
    //     const { target } = e;
    //     const newVolume = +target.value;
    
    //     if (newVolume) {
    //       setVolume(newVolume);
    //       wavesurfer.current.setVolume(newVolume || 1);
    //     }
    //   };

    // return (
    //     <div>
    //         <h1 id="waveform">WAVEFORM!!!!</h1>
    //         <button onClick={setSong} >Play Song</button>
    //         <div id="waveform" ref={waveformRef}></div>
    //         <div className="controls">
    //     <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
    //     <input
    //       type="range"
    //       id="volume"
    //       name="volume"
    //       // waveSurfer recognize value of `0` same as `1`
    //       //  so we need to set some zero-ish value for silence
    //       min="0.01"
    //       max="1"
    //       step=".025"
    //       onChange={onVolumeChange}
    //       defaultValue={volume}
    //     />
    //     <label htmlFor="volume">Volume</label>
    //   </div>
    //     </div>
    // )
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
  
    const url = "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3";
    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
      setPlay(false);
  
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
  
      wavesurfer.current.load(url);
  
      wavesurfer.current.on("ready", function() {
        // https://wavesurfer-js.org/docs/methods.html
        // wavesurfer.current.play();
        // setPlay(true);
  
        // make sure object stillavailable when file loaded
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
        }
      });
  
      // Removes events, elements and disconnects Web Audio nodes.
      // when component unmount
      return () => wavesurfer.current.destroy();
    }, [url]);
  
    const handlePlayPause = () => {
      setPlay(!playing);
      wavesurfer.current.playPause();
    };
  
    const onVolumeChange = e => {
      const { target } = e;
      const newVolume = +target.value;
  
      if (newVolume) {
        setVolume(newVolume);
        wavesurfer.current.setVolume(newVolume || 1);
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
            // waveSurfer recognize value of `0` same as `1`
            //  so we need to set some zero-ish value for silence
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
};

export default WaveForm;