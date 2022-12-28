import React, { useEffect, useRef } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Theme } from "react-daisyui";
// import { toPng } from 'html-to-image';
import { Helmet } from "react-helmet-async";
// store
import { useDispatch, useSelector } from "./store";
// components
import Header from "./components/Header";
import { Home } from "./pages";
import { setTakeScreenshot } from "./store/slices/app-slice";

const App = () => {
  const { theme, takeScreenshot } = useSelector(({ app }) => app);
  const screenRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (takeScreenshot) {
  //     dispatch(setTakeScreenshot(false))
  //     if (screenRef.current === null) {
  //       return
  //     }

  // toPng(screenRef.current, { cacheBust: true, })
  //   .then((dataUrl) => {
  //     const link = document.createElement('a')
  //     link.download = 'my-image-name.png'
  //     link.href = dataUrl
  //     link.click()
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  //   }
  // }, [takeScreenshot])

  return (
    <div ref={screenRef} className={`App overflow-x-hidden w-screen`}>
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
