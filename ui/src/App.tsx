import React from 'react';
import { Theme } from "react-daisyui";
// components
import Header from "./components/Header";
import { SearchHero } from "./components/Search-Hero";
import { ImageResults } from "./components/Results";
import { FloatingControls } from "./components/FloatingControls";
import AppContext from "./store";
// import './App.css';

function App() {
  return (
    <AppContext.Consumer>
      {context => (
        <div className="App">
          <Theme dataTheme={context.theme}>
            <Header />

            <div className="container justify-center px-12 m-auto min-h-screen w-screen pb-24">
              {/* <div className="container justify-center px-12 m-auto h-screen overflow-hidden"> */}
              {/* <div className="overflow-y-scroll h-full  whitespace-nowrap scrollbar-hide"> */}
              {/* </div> */}
              {/* </div> */}
              {/* <Header /> */}
              <SearchHero />
              <ImageResults />
              {/* TODO: scroll to top */}
              {/* <FloatingControls /> */}
            </div>
          </Theme>
        </div>
      )}
    </AppContext.Consumer>

  );
}

export default App;
