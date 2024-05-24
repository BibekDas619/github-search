import "./Dropdown.css";
import DropdownItems from "../../store/DropdownItems.json";

const Dropdown = ({
  type,
  setFiltersState,
  disableDropdowns,
  disableOtherDropdowns,
}) => {
  const determineDropdownDisable = () => {
    if (disableDropdowns === true) {
      return disableDropdowns;
    } else {
      return disableOtherDropdowns && type !== "default";
    }
  };

  return (
    <div className="dropdown">
      <label htmlFor="searchType">
        Select {type === "default" ? "search type: " : `${type}: `}{" "}
      </label>
      <select
        id="searchType"
        defaultValue={"DEFAULT"}
        disabled={determineDropdownDisable()}
        onChange={(event) =>
          setFiltersState(event.target.value.toLowerCase(), type)
        }
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
