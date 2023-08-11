import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Admin.css";
import AllSongs from "../AllSongs/AllSongs";

function Admin() {
  const [allSongs, setAllSongs] = useState();
  const username = useSelector((state) => state.session.user?.username);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/admin");
      const { songs } = await response.json();
      setAllSongs(songs);
    })();
  }, []);

  if (username !== "admin") {
    return <AllSongs />;
  }

  return (
    <div>
      <table className="song-table">
        <thead className="song-table-head">
          <tr>
            <td>genre_id</td>
            <td>user_id</td>
            <td>url</td>
            <td>image_url</td>
            <td>title</td>
            <td>artist</td>
            <td>length</td>
            <td>description</td>
          </tr>
        </thead>
        <tbody className="song-table-body">
          {allSongs?.map((song) => {
            return (
              <tr key={song.url}>
                <td>{song.genre_id}</td>
                <td>{song.user_id}</td>
                <td>{song.url}</td>
                <td>{song.image_url}</td>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.length}</td>
                <td>{song.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
