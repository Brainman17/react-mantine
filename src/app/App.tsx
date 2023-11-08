import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Divider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles/global.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import styles from './App.module.css';
import HomePage from '../pages/Home/HomePage';
import Header from '../widgets/Header/Header';
import { selectAuth } from '../entities/auth/model/selectors';
import componentMap from '../shared/config/components';

const App: FC = () => {
  const { componentKey } = useSelector(selectAuth);
  const AuthPage = componentMap[componentKey];

  return (
    <div className={styles.app}>
      <Notifications autoClose={4000} position="top-center" />
      <Header />
      <Divider my="xs" />
      <main>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
