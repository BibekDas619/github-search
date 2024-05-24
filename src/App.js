import { useEffect, useState } from "react";
import "./App.css";
import { Octokit } from "octokit";
import Dropdown from "./components/Dropdown/Dropdown";
import DropdownTypes from "./store/DropdownTypes.json";
import Searchbox from "./components/Searchbox/Searchbox";

function App() {
  const [searchType, setSearchType] = useState();
  const [language, setLanguage] = useState();
  const [page, setPage] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [disableDropdowns, setDisableDropdowns] = useState(false);
  const [disableOtherDropdowns, setDisableOtherDropdowns] = useState(false);
  const [disableApiCall, setDisableApiCall] = useState(true);

  useEffect(() => {
    if (searchPhrase === "") {
      setDisableDropdowns(true);
    } else {
      setDisableDropdowns(false);
    }
  }, [searchPhrase]);

  useEffect(() => {
    if (searchType === undefined) {
      setDisableOtherDropdowns(true);
    } else {
      setDisableOtherDropdowns(false);
    }
  }, [searchType]);

  useEffect(() => {
    if (searchPhrase !== "" && searchType !== undefined) {
      setDisableApiCall(false);
    } else {
      setDisableApiCall(true);
    }
  }, [searchPhrase, searchType]);

  const resetFiltersAndSearchbox = () => {
    setSearchType();
    setLanguage();
    setPage();
    setSearchPhrase("");
  };

  const callApi = async (type, language, query, page) => {
    //Ocktokit is used to call a github Api.It integrates Api client, App client & Action client.
    let octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_AUTH_TOKEN,
    });

    let response = await octokit.request(`GET /search/${type}`, {
      q: query,
      language: language,
      per_page: page,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    console.log("RESPONSE -> ", response);
    resetFiltersAndSearchbox();
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
      <div className="header">
      <center> <h1> <p>Git Hub Search</p></h1></center>
        <br/> 
      </div> 
      <div className="filtersAndSearch">
        
        <Searchbox
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
        />
        {DropdownTypes.map((itm) => (
          <Dropdown
            type={itm}
            setFiltersState={setFiltersState}
            disableDropdowns={disableDropdowns}
            disableOtherDropdowns={disableOtherDropdowns}
          />
        ))}
        <button
          type="button"
          disabled={disableApiCall}
          onClick={() => callApi(searchType, language, searchPhrase, page)}
        >
          Search..
        </button>
      </div>
    </div>
  );
}

export default App;
