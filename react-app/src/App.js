import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import DropZone from './components/DropZone';
import SongDetail from "./components/SongDetail";
import AllSongs from './components/AllSongs/AllSongs';
import Footer from './components/FooterPlayer';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar isLoaded={loaded} />
      {loaded && (
        <div id="main">
          <Switch>
            <ProtectedRoute path='/users/:userId' ><User /></ProtectedRoute>
            <ProtectedRoute path='/users' ><UsersList /></ProtectedRoute>
            <Route path='/songs/:id'><SongDetail /></Route>
            <Route path='/songs' ><AllSongs /></Route>
            <ProtectedRoute path='/upload' ><DropZone /></ProtectedRoute>
            <Route path='/' ><AllSongs /></Route>
            <Route path='' ><AllSongs /></Route>
            <Route path='/signup'><SignUpForm /></Route>
          </Switch>
        </div>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
