import Startups from '../../core/Startups.js';
import './StartupInfo.css';


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

  return (
    <div className="div-startup-info div-startup-info-visible">
      {JSON.stringify(startup)}
    </div>
  )
}
