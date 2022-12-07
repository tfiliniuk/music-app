import React, { FC, useMemo } from 'react';
import { IMusicList } from '../../types';
import { Player } from '../Player/Player';

import style from './Music.module.scss';

interface MusicProps {
  currentSong?: IMusicList;
  onGoNext: (isRandom?: boolean) => void;
  onGoToPrev: () => void;
  onGoToRandomSong: () => void;
}

export const Music: FC<MusicProps> = ({ currentSong, onGoNext, onGoToPrev, onGoToRandomSong }) => {
  const customBG = useMemo(() => {
    return {
      background: `linear-gradient(90deg, ${currentSong?.color[0]} 0%, ${currentSong?.color[1]} 100%)`,
    };
  }, [currentSong?.color]);

  return (
    <div className={style.wrapper} style={customBG}>
      {currentSong ? (
        <>
          <div className={style.block}>
            <div className={style.img_block}>
              <img className={style.img} src={currentSong?.cover} alt={currentSong?.name} />
            </div>
            <p className={style.title}>{currentSong?.artist}</p>
          </div>
          <Player
            source={currentSong?.audio}
            onGoNext={onGoNext}
            onGoToPrev={onGoToPrev}
            onGoToRandomSong={onGoToRandomSong}
          />
        </>
      ) : (
        <div className={style.empty}>
          <h2>Please choose the song</h2>
        </div>
      )}
    </div>
  );
};
