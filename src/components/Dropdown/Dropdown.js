import "./Dropdown.css";
import DropdownItems from "../../store/DropdownItems.json";

const Dropdown = ({ type, setFiltersState }) => {
  return (
    <div className="dropdown">
      <label htmlFor="searchType">
        Select {type === "default" ? "search type: " : `${type}: `}{" "}
      </label>
      <select
        id="searchType"
        defaultValue={"DEFAULT"}
        onChange={(event) => setFiltersState(event.target.value, type)}
      >
        <option value="DEFAULT" disabled>
          Choose a {type === "default" ? "search type" : type} ...
        </option>
        {DropdownItems[type].map((itm) => (
          <option value={itm}>{itm}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
