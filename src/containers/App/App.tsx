import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Music } from '../Music/Music';

import { IMusicList } from '../../types';
import chillHop from '../../data';

import style from './App.module.scss';

export const App = () => {
  const musicList = useMemo(() => {
    return chillHop();
  }, []);

  const [currentId, setCurrentId] = useState<string>();
  const [currentSong, setCurrentSong] = useState<IMusicList | undefined>();

  const handleSetCurrentId = (id: string) => {
    setCurrentId(id);
  };

  useEffect(() => {
    const foundSong = musicList.find((song) => song.id === currentId);
    setCurrentSong(foundSong);
  }, [currentId, musicList]);

  const handleGoToRandomSong = useCallback(() => {
    const index = musicList.findIndex(({ id }) => id === currentId);
    const randomNum = Math.floor(Math.random() * musicList.length);
    if (randomNum === 0 || randomNum === index) {
      const newNum = randomNum + 1;
      setCurrentId(musicList[newNum].id);
    } else {
      setCurrentId(musicList[randomNum].id);
    }
  }, [currentId, musicList]);

  const handleGoNext = useCallback(
    (isRandom?: boolean) => {
      const index = musicList.findIndex(({ id }) => id === currentId);
      if (isRandom) {
        handleGoToRandomSong();
      } else {
        const currentIndex = index === musicList.length - 1 ? 0 : index + 1;
        setCurrentId(musicList[currentIndex].id);
      }
    },
    [currentId, musicList, handleGoToRandomSong]
  );

  const handleGoToPrev = useCallback(() => {
    const index = musicList.findIndex(({ id }) => id === currentId);
    const currentIndex = index === 0 ? musicList.length - 1 : index - 1;
    setCurrentId(musicList[currentIndex].id);
  }, [currentId, musicList]);

  return (
    <div className={style.wrapper}>
      <Sidebar data={musicList} onSetCurrentId={handleSetCurrentId} activeID={currentId} />
      <Music
        currentSong={currentSong}
        onGoNext={handleGoNext}
        onGoToPrev={handleGoToPrev}
        onGoToRandomSong={handleGoToRandomSong}
      />
    </div>
  );
};
