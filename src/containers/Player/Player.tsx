import React, { FC, useState, useRef, useEffect, useCallback } from 'react';

import { RandomMusicsTrue } from '../../icons/RandomMusicsTrue';
import { RandomMusicsFalse } from '../../icons/RandomMusicsFalse';
import { Button } from '../../components/Button/Button';

import { SkipBack } from '../../icons/SkipBack';
import { Pause } from '../../icons/Pause';
import { Play } from '../../icons/Play';
import { SkipForward } from '../../icons/SkipForward';
import { VolumeOff } from '../../icons/VolumeOff';
import { VolumeOn } from '../../icons/VolumeOn';

import style from './Player.module.scss';

interface PlayerProps {
  source?: string;
  onGoNext: (isRandom?: boolean) => void;
  onGoToPrev: () => void;
  onGoToRandomSong: () => void;
}

export const Player: FC<PlayerProps> = ({ source, onGoNext, onGoToPrev, onGoToRandomSong }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBar = useRef<HTMLInputElement | null>(null);
  const animationRef = useRef<number>(0);

  const whilePlaying = useCallback(() => {
    if (progressBar.current) {
      progressBar.current.value = `${audioRef?.current?.currentTime}`;
      animationRef.current = requestAnimationFrame(whilePlaying);
      changeCurrentTime();
    }
  }, []);

  useEffect(() => {
    if (source !== '' && audioRef?.current) {
      if (isPlaying) {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
        audioRef.current.volume = volume;

        if (isMuted) {
          audioRef.current.muted = true;
        } else {
          audioRef.current.muted = false;
        }

        const interval = setInterval(() => {
          if (audioRef?.current?.duration) {
            const seconds = Math.floor(audioRef.current.duration);
            setDuration(seconds);
            if (progressBar.current) {
              progressBar.current.max = `${seconds}`;
            }
          }
        }, 1000);

        setInterval(() => {
          if (duration > 0 || duration !== undefined) {
            clearInterval(interval);
            if (audioRef?.current?.currentTime === audioRef?.current?.duration) {
              isRandom ? onGoToRandomSong() : onGoNext();
            }
          }
        }, 1100);
      } else {
        audioRef.current.pause();
        audioRef.current.volume = Number(volume);
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMuted, isPlaying, isRandom, source, volume, duration, whilePlaying, onGoNext, onGoToRandomSong]);

  const calculateDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${newMinutes}:${newSeconds}`;
  };

  const changeCurrentTime = () => {
    setCurrentTime(Number(progressBar?.current?.value));
  };

  const changeRange = () => {
    if (audioRef.current && progressBar.current) {
      audioRef.current.currentTime = Number(progressBar.current.value);
      changeCurrentTime();
    }
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Player</h2>
      <audio ref={audioRef} src={source}>
        <source src={source} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className={style.player}>
        <div className={style.inputButtons}>
          <div className={style.progressBar}>
            <div className={style.currentTime}>
              {calculateDuration(currentTime)}
              <input
                type="range"
                className={style.currentProgress}
                ref={progressBar}
                defaultValue="0"
                onChange={changeRange}
              />

              <p className={style.duration}>{duration && !isNaN(duration) && calculateDuration(duration)}</p>
            </div>
          </div>

          <div className={style.buttons_container}>
            <div className={style.buttons}>
              <Button onClick={() => setIsRandom(!isRandom)}>
                {isRandom ? <RandomMusicsTrue /> : <RandomMusicsFalse />}
              </Button>
              <Button onClick={onGoToPrev}>
                <SkipBack />
              </Button>
              <Button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause /> : <Play />}</Button>
              <Button onClick={() => onGoNext(isRandom)}>
                <SkipForward />
              </Button>
            </div>

            <div className={style.volumeContainer}>
              <Button onClick={() => setIsMuted(!isMuted)}>{isMuted ? <VolumeOff /> : <VolumeOn />}</Button>
              <input
                type="range"
                step="0.01"
                onChange={(e) => setVolume(Number(e.target.value))}
                value={volume}
                max="1"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
