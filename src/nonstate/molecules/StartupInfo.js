import Startups from '../../core/Startups.js';
import './StartupInfo.css';

// {"startup_id":"appempower-ai","name":"AppEmpower.ai","remote_img_url":"https://www.startupsl.lk/CompanyLogos/661-Logo.png","image_file_only":"image.appempower-ai.png","tagline":"We innovate on how software is being developed","description":"AppEmpower.ai develops products that reduce time, and cost in software development","url":"https://appempower.ai","business_registration_date":"2020-12-01","business_registration_ut":1606761000,"category_list":["IT Products","Platforms","UI / UX"],"startup_stage":"Traction","startup_stage_i":2,"funding_stage":"Angel","funding_stage_i":3,"founder_info":{"name":"+94719998797","email":"supun@appempower.ai"},"founder_info_list_raw":["Supun Dissanayake","supun@appempower.ai","+94719998797"]}

export default function StartupInfo(props) {
  const {startupID} = props;

  if (!startupID) {
    return (
      <div className="div-startup-info">
        {startupID}
      </div>
    )
    }
  const startup = Startups.getStartup(startupID);

  const imageFileOnly = startup['image_file_only'];
  const imgSrc = require("../../assets/images/startup_images/" + imageFileOnly)
    .default;

  const categoryStr = startup['category_list'].join(' · ');
  const stageStr = [startup['startup_stage'], startup['funding_stage']].join(' · ');
  const founderStr = startup['founder_info_list_raw'].join(' · ');

  return (
    <div className="div-startup-info div-startup-info-visible">
      <img className="img-startup" src={imgSrc}/ >
      <div className="div-startup-name">
        {startup['name']}
      </div>
      <div className="div-startup-tagline">
        "{startup['tagline']}"
      </div>
      <div className="div-startup-description">
        {startup['description']}
      </div>

      <div className="div-label">
        Categories
      </div>
      <div className="div-startup-categories">
        {categoryStr}
      </div>

      <div className="div-label">
        Funding & Progress
      </div>
      <div className="div-stages">
        {stageStr}
      </div>

      <div className="div-label">
        Business Registration
      </div>
      <div className="div-startup-business-registration">
          {startup['business_registration_date']}
      </div>

      <div className="div-label">
        Founder Details
      </div>
      <div>
        {founderStr}
      </div>

      <div className="div-label">
        Website
      </div>
      <div>
        <a href={startup['url']}>
          {startup['url']}
        </a>
      </div>

    </div>
  )
}
