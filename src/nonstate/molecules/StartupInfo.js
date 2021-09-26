import Startups from "../../core/Startups.js";
import "./StartupInfo.css";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

function renderLinkableItems(itemsList) {
  const renderedInner = itemsList.map(function (item, iItem) {
    const key = "item-" + iItem;
    let renderedItem;
    if (item.includes("@")) {
      renderedItem = (
        <div className="div-link-item">
          <PhoneIcon />
          <a
            className="a-lint-item"
            href={"mailto:" + item}
            target="_blank"
            rel="noreferrer"
          >
            {item}
          </a>
        </div>
      );
    } else if (!Number.isNaN(parseInt(item))) {
      renderedItem = (
        <div className="div-link-item">
          <EmailIcon />
          <a
            className="a-lint-item"
            href={"tel:" + item}
            target="_blank"
            rel="noreferrer"
          >
            {item}
          </a>
        </div>
      );
    } else {
      const linkedInURL =
        "https://www.linkedin.com" +
        "/search/results/all/?keywords=" +
        item.replaceAll(" ", "+");
      renderedItem = (
        <div className="div-link-item">
          <a href={linkedInURL} target="_blank" rel="noreferrer">
            {item}
          </a>
        </div>
      );
    }
    return <div key={key}>{renderedItem}</div>;
  });
  return <div className="div-link-items">{renderedInner}</div>;
}

export default function StartupInfo(props) {
  const { startupID } = props;
  if (!startupID) {
    return null;
  }
  const startup = Startups.getStartup(startupID);

  const imageFileOnly = startup["image_file_only"];
  const imgSrc = require("../../assets/images/startup_images/" +
    imageFileOnly).default;

  const categoryStr = startup["category_list"].join(" · ");
  const stageStr = [startup["startup_stage"], startup["funding_stage"]].join(
    " · "
  );
  const founderStr = renderLinkableItems(startup["founder_info_list_raw"]);

  let url = startup["url"];
  if (!url.toLowerCase().includes("http")) {
    url = "http://" + url;
  }

  return (
    <div className="div-startup-info">
      <img className="img-startup-info" src={imgSrc} alt={startup["name"]} />
      <div className="div-startup-name">{startup["name"]}</div>
      <div className="div-startup-tagline">"{startup["tagline"]}"</div>
      <div className="div-startup-description">{startup["description"]}</div>

      <div className="div-label">Categories</div>
      <div className="div-startup-categories">{categoryStr}</div>

      <div className="div-label">Funding & Progress</div>
      <div className="div-stages">{stageStr}</div>

      <div className="div-label">Business Registration</div>
      <div className="div-startup-business-registration">
        {startup["business_registration_date"]}
      </div>

      <div className="div-label">Founder Details</div>
      <div>{founderStr}</div>

      <div className="div-label">Website</div>
      <div>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
    </div>
  );
}
