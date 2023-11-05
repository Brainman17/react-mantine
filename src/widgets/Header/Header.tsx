import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, useMantineTheme, rem, Select } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import styles from './Header.module.css';
import logo from '../../../public/static/logo.png';

const Header: FC = () => {
  const [value, setValue] = useState('');
  const theme = useMantineTheme();
  const { i18n } = useTranslation();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.cyan[0]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[4]}
    />
  );

  const changeLanguage = async (language: string | null) => {
    await i18n.changeLanguage(language as string);
    setValue(value as string);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.group}>
        <Select
          data={['ru', 'en']}
          defaultValue="Ru"
          w={70}
          className={styles.select}
          value={value}
          onChange={changeLanguage}
        />
        <Switch
          size="lg"
          className={styles.switch}
          onLabel={sunIcon}
          offLabel={moonIcon}
        />
      </div>
    </header>
  );
};

export default Header;
