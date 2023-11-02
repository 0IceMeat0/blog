import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/app/App";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./component/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  toolkit: reducer,
});
export const store = configureStore(
  {
    reducer: rootReducer,
  },
  composeWithDevTools(),
);
export default store;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
