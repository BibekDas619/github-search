import { useEffect, useState } from "react";
import "./App.css";
import { Octokit } from "octokit";

function App() {
  const [searchType, setSearchType] = useState();

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

  const shouldButtonDisable = () => {
    if (searchType !== undefined) {
      return false;
    }

    return true;
  };

  // useEffect(() => {
  //   callApi("users", "python", "BibekDas619");
  // }, []);

  useEffect(() => {
    console.log("SEARCH TYPE -> ", searchType);
  }, [searchType]);

  return (
    <div className="App">
      <label htmlFor="searchType">Select search type: </label>
      <select
        id="searchType"
        defaultValue={"DEFAULT"}
        onChange={(event) => setSearchType(event.target.value)}
      >
        <option value="DEFAULT" disabled>
          Choose a search type ...
        </option>
        <option value="code">Code</option>
        <option value="commits">Commits</option>
        <option value="users">Users</option>
        <option value="repositories">Repositories</option>
      </select>
      <button
        type="button"
        disabled={shouldButtonDisable()}
        onClick={() => callApi(searchType, "python", "BibekDas619")}
      >
        Search
      </button>
    </div>
  );
}

export default App;
