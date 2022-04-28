import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("sidaroz");
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();
  const thisLocation = useLocation();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setUsername(e.target.user.value);
  };

  useEffect(() => {
    if (thisLocation.state == "null" || !thisLocation.state) {
      setUsername("sidaroz");
    } else {
      setUsername(thisLocation.state);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const user = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await user.json();
      setRepos(data);
    }

    fetchData();
  }, [username]);

  const repositories = repos.map((repo, i) => {
    return (
      <h3 key={i}>
        <a onClick={() => navigate(`/${username}/${repo.id}`)}>{repo.name}</a>
      </h3>
    );
  });

  return (
    <div className="content">
      <form onSubmit={handleSubmitForm}>
        <input
          className="user-input"
          name="user"
          required
          placeholder="Enter Username Here"
        ></input>
        <input className="search-btn" type="submit"></input>
      </form>

      <div className="userInfo">
        <h1> {username} </h1>
      </div>

      <div className="repoInfo">
        <div> {repositories} </div>
      </div>
    </div>
  );
}

export default Home;
