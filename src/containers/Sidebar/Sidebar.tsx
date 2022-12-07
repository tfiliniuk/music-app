import React, { FC } from 'react';
import { List } from '../../components/List/List';
import { Title } from '../../components/Title/Title';

import { IMusicList } from '../../types';

import style from './Sidebar.module.scss';

interface SidebarProps {
  data: Array<IMusicList>;
  onSetCurrentId: (id: string) => void;
  activeID?: string;
}

export const Sidebar: FC<SidebarProps> = ({ data, onSetCurrentId, activeID }) => {
  return (
    <div className={style.container}>
      <Title title="Library" />
      <List data={data} onSetCurrentId={onSetCurrentId} activeID={activeID} />
    </div>
  );
};
