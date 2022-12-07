import React, { FC } from 'react';

import style from './Title.module.scss';

interface TitleProps {
  title: string;
}

export const Title: FC<TitleProps> = ({ title }) => {
  return <h2 className={style.title}>{title}</h2>;
};
