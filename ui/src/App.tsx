import { Navigate, Route, Routes } from "react-router-dom";
import { Theme } from "react-daisyui";
// store
import { useSelector } from "./store";
// components
import Header from "./components/Header";
import { Home } from "./pages";
import { Helmet } from "react-helmet-async";

const App = () => {
  const { theme } = useSelector((state) => state.app)

  return (
    <div className={`App overflow-x-hidden w-screen`}>
      <Helmet>
        <title>Marqo</title>
      </Helmet>
      <Theme dataTheme={theme} className={`${theme === "dark" ? "bg-primary" : ""}`}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Theme>
    </div >
  );
}

export default App;
