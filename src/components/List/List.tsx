import React, { FC } from 'react';
import { Item } from '../Item/Item';

import { IMusicList } from '../../types';

import style from './List.module.scss';

interface ListProps {
  data: Array<IMusicList>;
  onSetCurrentId: (id: string) => void;
  activeID?: string;
}

export const List: FC<ListProps> = ({ data, onSetCurrentId, activeID }) => {
  return (
    <ul className={style.list}>
      {data.map(({ name, artist, cover, id }) => (
        <Item
          key={id}
          artist={artist}
          cover={cover}
          name={name}
          onSetCurrentId={onSetCurrentId}
          id={id}
          active={activeID === id}
        />
      ))}
    </ul>
  );
};
