import './App.css';
import Admin from './components/Admin/Admin';
import { useState , useEffect} from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Login from './components/Login/Login';
import { useCookies } from 'react-cookie';

function App() {


  const [secured, changeSecured] = useState(false)
  const [user, changeUser] = useState();
  return (
    <div className={ 'app' }>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login'></Redirect>
        </Route>
        <Route path='/login'>
          <Login secured={secured} user={user} changeUser={changeUser} changeSecured={changeSecured}></Login>
        </Route>
        <Route path='/adminPanel'>
            <Admin secured={secured} changeSecured={changeSecured} user={user}></Admin>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
