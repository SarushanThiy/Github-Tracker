import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [username, setUsername] = useState("sidaroz");
  const [repos, setRepos] = useState([]);
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setUsername(e.target.user.value);
  };

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
      <div key={i}>
        <a onClick={() => navigate(`/${username}/${repo.id}`)}>{repo.name}</a>
      </div>
    );
  });

  return (
    <div className="content">
      <form onSubmit={handleSubmitForm}>
        <input name="user" required placeholder="Enter Username Here"></input>
        <input type="submit"></input>
      </form>

      <div className="userInfo">
        <h1> {username} </h1>
      </div>

      <div className="repoInfo"></div>
      <h3> {repositories} </h3>
    </div>
  );
}

export default Home;
