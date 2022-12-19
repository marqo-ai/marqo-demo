import React, { useContext, useEffect, useReducer } from 'react';
import { Theme } from "react-daisyui";
// store
import AppContext, { initialState } from "./store";
import appReducer from "./store/app-reducer";
// components
import Header from "./components/Header";
import { SearchHero } from "./components/Search-Hero";
import { ImageResults, ListResults } from "./components/Results";
import { FloatingControls } from "./components/FloatingControls";
// import './App.css';

function App() {
  const { dataset } = useContext(AppContext)
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { theme } = state;
  // const { theme, dataset } = state;

  useEffect(() => {
    // core api req
    console.log(dataset)
  }, [dataset])

  return (
    // <AppContext.Provider value={initialState}>
    <div className="App">
      <Theme dataTheme={theme}>
        <Header />

        <div className="container justify-center px-12 m-auto min-h-screen w-screen pb-24">
          {/* <div className="container justify-center px-12 m-auto h-screen overflow-hidden"> */}
          {/* <div className="overflow-y-scroll h-full  whitespace-nowrap scrollbar-hide"> */}
          {/* </div> */}
          {/* </div> */}
          {/* <Header /> */}
          <SearchHero />
          {dataset === "boredapes" && <ImageResults />}
          {dataset === "simplewiki" && <ListResults />}
          {/* TODO: scroll to top */}
          {/* <FloatingControls /> */}
        </div>
      </Theme>
    </div>


    // </AppContext.Provider>
  );
}

export default App;
