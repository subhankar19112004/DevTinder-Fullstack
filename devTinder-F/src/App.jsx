import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Error from "./components/Error";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Feed />} />              
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/error" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
