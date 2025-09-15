import { createContext, useState, useMemo } from 'react';
import avatarMale from '@icons/avatar/avatarMale.svg';
import avatarFemale from '@icons/avatar/avatarFemale.svg';

export const UIContext = createContext(null);

export function UIProvider({ children }) {
  const avatars = {
    male: avatarMale,
    female: avatarFemale,
  };

  const [header, setHeader] = useState({
    title: 'ПРОФИЛЬ',
    avatar: avatars.male,
  });

  const value = useMemo(
    () => ({ header, setHeader, avatars }),
    [header]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
