import { useEffect, useRef, useState } from 'react';
import './WaveForm.css';
import WaveSurfer from "wavesurfer.js";
import { useSelector } from 'react-redux';




function WaveForm() {
    const [waveformLoaded, setWaveformLoaded] = useState(false);
    const websurfer = useRef(null);
    const audioData= useRef(null);
    const song = useSelector(state => state.songs.song);


    useEffect(() => {
        websurfer.current = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#FF3300",
            progressColor: "black",
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 1,
            height: 200,
            barGap: 3
        });
        websurfer.current.on("ready", () => {
            setWaveformLoaded(true);
        });
        websurfer.current.on("region-created", e => {

        });
    }, []);

    const createWaveForm = e => {
        setWaveformLoaded(false);
        const file = e.target.files[0];
        const reader = new FileReader();
        // reader.onload = async e => {
        //     audioData.current = 
        // }
    };

    const setSong = () => {
        console.log("---------", song);
    }

    return (
        <div>
            <h1 id="waveform">WAVEFORM!!!!</h1>
            <button onClick={setSong} >Play Song</button>
        </div>
    )
};

export default WaveForm;