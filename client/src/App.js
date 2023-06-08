import "./App.css";
import {Route, Switch} from 'react-router-dom'
import LandingPage from "./pages/LandingPage";
import Home from './pages/Home.jsx'
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import Notfound from "./pages/Notfound";

import axios from 'axios'
axios.defaults.baseURL =
  "http://locapi-dogs-deploy-production.up.railway.app";


function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home} />
        <Route path='/detail' component={Detail}/>
        <Route path='/form' component={Form}/>
        <Route path={"*"} component={Notfound} />
      </Switch>
    </div>
  );
}

export default App;
