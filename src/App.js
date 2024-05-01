import { useEffect, useState } from "react";
import "./App.css";
import { Octokit } from "octokit";
import Dropdown from "./components/Dropdown/Dropdown";
import DropdownTypes from "./store/DropdownTypes.json";

function App() {
  const [searchType, setSearchType] = useState();
  const [language, setLanguage] = useState();
  const [page, setPage] = useState();

  const callApi = async (type, language, query) => {
    let octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN,
    });

    let response = await octokit.request(`GET /search/${type}`, {
      q: query,
      language: language,
      per_page: 10,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    console.log("RESPONSE -> ", response);
  };

  const setFiltersState = (value, type) => {
    switch (type) {
      case "default":
        setSearchType(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "page":
        setPage(value);
        break;
      default:
        console.log("Wrong type");
    }
  };

  return (
    <div className="App">
      <div className="filtersAndSearch">
        {DropdownTypes.map((itm) => (
          <Dropdown type={itm} setFiltersState={setFiltersState} />
        ))}
      </div>
    </div>
  );
}

export default App;
