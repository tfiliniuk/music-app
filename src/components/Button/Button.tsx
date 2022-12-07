import React, { FC, MouseEventHandler } from 'react';

import style from './Button.module.scss';

interface ButtonProps {
  children: JSX.Element;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}
export const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={style.button}>
      {children}
    </button>
  );
};
