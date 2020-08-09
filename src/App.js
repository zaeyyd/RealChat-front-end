import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./pages/Join/Join";
import Chat from "./pages/Chat/Chat";

// Note: if there is only a return in the function, no need for {}
const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
