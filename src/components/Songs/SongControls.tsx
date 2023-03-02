import React, { useContext, useEffect, useRef, useState } from "react";
import classes from './SongControls.module.css';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"

const SongControls: React.FC<{ audio: string }> = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [length, setLength] = useState(0); // in seconds
    const [currentTimeMarker, setCurrentTimeMarker] = useState(0); // in seconds
    const [timePassed, setTimePassed] = useState('0'); // represented by a string
    const [timeLeft, setTimeLeft] = useState('0'); // represented by a string
    const songRef = useRef<HTMLAudioElement>(null);

    const clickHandler = (e: React.MouseEvent) => {
        setIsPlaying(prev => !prev);
        isPlaying ? songRef.current?.pause() : songRef.current?.play();
    };
    const loadedDataHandler = () => {
        const trackLength = convertToMinutes(songRef.current!.duration)
        setLength(songRef.current!.duration);
        setTimeLeft(trackLength)
    }

    const onPlaying = () => {
        const currentTime = songRef.current?.currentTime;
        setCurrentTimeMarker(Math.floor((currentTime! / length) * 100));
        setTimePassed(convertToMinutes(currentTime!))
        setTimeLeft(convertToMinutes(length));

    }

    const convertToMinutes = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
    }
    return (
        <div className={classes["audio-controls"]}>
            <audio
                preload="metadata"
                ref={songRef}
                src={props.audio}
                onTimeUpdate={onPlaying}
                onLoadedData={loadedDataHandler} />

            <div className={classes["progress-bar"]}>
                {/* Current Time */}
                <span>{timePassed}</span>
                {/* Progress Bar */}
                <input type="range" value={currentTimeMarker} readOnly />
                {/* Duration */}
                <span>{timeLeft}</span>
            </div>
            <button className={classes["play-pause"]} onClick={clickHandler}>{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}</button>
        </div>
    )
};

export default SongControls;

// To Do:
// 1. Convert to TSX
// 2. Line 50, change readOnly to onChange, to let user scroll through current song playing!