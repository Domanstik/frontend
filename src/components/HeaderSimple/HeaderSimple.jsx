import React from 'react';
import './HeaderSimple.css';

export default function HeaderSimple({ title, avatarSrc, right }) {
  return (
    <header className="header-simple">
      <img src={avatarSrc} alt="avatar" className="header-simple__avatar" />
      <h1 className="header-simple__title">{title}</h1>
      {right && <div className="header-simple__right">{right}</div>}
    </header>
  );
}

HeaderSimple.defaultProps = {
  title: '',
  avatarSrc: '',
  right: null,
};
