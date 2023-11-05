import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/Auth/AuthPage';
import HomePage from '../pages/HomePage';
import { Divider } from '@mantine/core';
import '@mantine/core/styles/global.css';
import Header from '../widgets/Header/Header';
import styles from './App.module.css';

const App: FC = () => {
  return (
    <div className={styles.app}>
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
