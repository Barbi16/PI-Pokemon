import React from "react";
import Home from "./views/Home/Home";
import { Route, useLocation } from "react-router-dom";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import Landing from "./views/Landing/Landing";
import NavBar from "./Components/NavBar/NavBar";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/"

function App() {
  //const location  =useLocation
  return (
    <div>
      {useLocation().pathname !== "/" && <NavBar/>}
      <Route exact path="/" component={Landing} />
      <Route exact path="/Home" component={Home} />
      <Route path="/pokemon/:id" component={Detail} />
      <Route path="/create" component={Form} />
    </div>
  );
}

export default App;
