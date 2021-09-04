import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import './index.css';

import { theme } from "./themes/theme";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <div className='root-element'>
              <BrowserRouter>
                  <Routes />
              </BrowserRouter>
          </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
