import "./DisplayResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontAwesomeSetup";

const DisplayResult = ({ data }) => {
  console.log("ITM -> ", data);
  return (
    <div className="resultCard">
      {data?.repository?.owner?.avatar_url && (
        <img
          src={data?.repository?.owner?.avatar_url}
          alt="Owner Avatar"
          className="ownerImage"
        />
      )}
      <div className="container">
        {data?.name && data?.html_url && (
          <h4>
            <b>{data?.name}</b>{" "}
            <a href={data?.html_url} target="blank">
              <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
            </a>
          </h4>
        )}
      </div>
    </div>
  );
};

export default DisplayResult;
