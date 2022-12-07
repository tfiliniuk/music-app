import React, { FC } from 'react';

import style from './Item.module.scss';

interface ItemProps {
  name: string;
  artist: string;
  cover: string;
  id: string;
  onSetCurrentId: (id: string) => void;
  active: boolean;
}

export const Item: FC<ItemProps> = ({ artist, cover, name, id, onSetCurrentId, active }) => {
  return (
    <div className={active ? `${style.item} ${style.active}` : style.item} onClick={() => onSetCurrentId(id)}>
      <img className={style.img} src={cover} alt={name} />
      <div>
        <p className={style.name}>{name}</p>
        <span className={style.artist}>{artist}</span>
      </div>
    </div>
  );
};
