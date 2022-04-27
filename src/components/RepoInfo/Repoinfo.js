import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RepoInfo.css";

function RepoInfo() {
  const { username, repo } = useParams();
  const [thisRepo, setThisRepo] = useState([]);
  const [language, setLanguage] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchRepo() {
      try {
        const specificRepo = await fetch(
          `https://api.github.com/repositories/${repo}`
        );
        const repoData = await specificRepo.json();
        setThisRepo(repoData);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchLanguages() {
      try {
        const specificLanguages = await fetch(
          `https://api.github.com/repos/${username}/${thisRepo.name}/languages`
        );
        const languageData = await specificLanguages.json();
        setLanguage(languageData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRepo();
    fetchLanguages();
  }, [repo]);

  const date = new Date(thisRepo.created_at).toDateString();
  const updatedLanguage = Object.keys(language);
  console.log(updatedLanguage);

  return (
    <div className="repoMain">
      <h1>{thisRepo.name}</h1>
      <h2>Created: {date}</h2>
      <p>Forks: {thisRepo.forks}</p>
      <p>Stargazers: {thisRepo.stargazers_count}</p>
      <p>Issues: {thisRepo.open_issues}</p>
      <p>Languages: {Object.keys(language)}</p>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default RepoInfo;
