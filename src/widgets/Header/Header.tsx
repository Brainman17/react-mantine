import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, useMantineTheme, rem, Button } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import styles from './Header.module.css';
import logo from '../../../public/static/logo.png';

const Header: FC = () => {
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

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.header__group}>
        {/* <Select
          data={['Ru', 'En']}
          defaultValue={'Ru'}
          w={70}
          className={styles.select}
          value={value}
          onChange={setValue}
          onClick={() => changeLanguage}
        /> */}

        <Button onClick={() => changeLanguage('en')} mr={10}>
          EN
        </Button>
        <Button onClick={() => changeLanguage('ru')}>RU</Button>
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
