import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/Auth/AuthPage';
import HomePage from '../pages/HomePage';
import '@mantine/core/styles/global.css';

const App: FC = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </main>
  );
};

export default App;
