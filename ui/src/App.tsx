import { useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Theme } from 'react-daisyui';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
// store
import { useSelector } from './store';
// components
import Header from './components/Header';
import { Home } from './pages';

const App = () => {
  ReactGA.initialize('G-Q0DJMJ6ZYK');
  

  ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });

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
