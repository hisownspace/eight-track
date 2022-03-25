import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import DropZone from './components/DropZone';
import SongDetail from "./components/SongDetail";
import AllSongs from './components/AllSongs/AllSongs';
import Footer from './components/FooterPlayer';
import Search from './components/Search';
import { authenticate } from './store/session';
import AddPlaylist from './components/AddPlaylist';
import MyPlaylists from './components/MyPlaylists';
import EditPlaylist from './components/EditPlaylist';
import SinglePlaylist from './components/SinglePlaylist/SinglePlaylist';

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
            <Route path='/search'><Search /></Route>
            <ProtectedRoute path='/playlists/add' ><AddPlaylist /></ProtectedRoute>
            <ProtectedRoute exact path='/playlists'><MyPlaylists /></ProtectedRoute>
            <ProtectedRoute path='/playlists/:playlistId/edit'><EditPlaylist /></ProtectedRoute>
            <ProtectedRoute path='/playlists/:playlistId'><SinglePlaylist /></ProtectedRoute>
            <Route path='/' ><AllSongs /></Route>
            <Route path='' ><AllSongs /></Route>
          </Switch>
        </div>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
