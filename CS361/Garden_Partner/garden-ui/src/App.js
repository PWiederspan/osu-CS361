import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import useToken from './components/useToken.js';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Navbar from './components/Navbar.js';
import Home from './pages/home';
import Calendar from './pages/calendar';
import Search from './pages/search';

function App() {
  const { token, setToken } = useToken();
  const [plantToEdit, setPlantToEdit] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }


  return (

    <div className="wrapper">
      <h1>Garden Partner</h1>
      <BrowserRouter>
        <Navbar/>
          <Switch>
          <Route path='/' exact component={Home}>
            <Home setPlantoEdit={setPlantToEdit}/>
          </Route>
          <Route path='/calendar' component={Calendar} />
          <Route path='/search' component={Search} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
