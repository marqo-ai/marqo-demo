import { useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Theme } from 'react-daisyui';
import { Helmet } from 'react-helmet-async';
// store
import { useSelector } from './store';
// components
import Header from './components/Header';
import { Home } from './pages';

const App = () => {
  const { theme } = useSelector(({ app }) => app);
  const screenRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={screenRef} className={`App overflow-x-hidden w-screen`}>
      <Helmet>
        <title>Marqo</title>
      </Helmet>
      <Theme dataTheme={theme} className={`${theme === 'dark' ? 'bg-primary' : ''}`}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Theme>
    </div>
  );
};

export default App;
