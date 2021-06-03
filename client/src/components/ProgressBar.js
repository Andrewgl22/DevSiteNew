import React, {useContext} from 'react';
import {IconContext} from './IconProvider'

const ProgressBar = (props) => {

    const {progress} = useContext(IconContext)
    const [progressVal] = progress;

    
 
    return (
        <div className="progress mb-3 ml-2 mt-3" style={{width: "20%"}}>
            <div className={`progress-bar ${progressVal < 33 ? "bg-danger" : "bg-warning"} ${progressVal > 66 ? "bg-success" : "bg-warning"}`} role="progressbar" style={{width: `${progressVal}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.round(progressVal)}%</div>
        </div>
    )
  };

export default ProgressBar;


// switch (iconComp) {
//     case 'langForm':
//         return (
//             <LangForm iconComp={iconComp} setIconComp={setIconComp} />
//         )
//     case 'frameForm':
//         return (
//             <FrameForm setIconComp={setIconComp} />
//         )
//     case 'photoForm':
//         return (
//             <UploadForm setProfilePhoto={setProfilePhoto} setIconComp={setIconComp} />
//         )
//     case 'bioForm':
//         return (
//             <BioForm setIconComp={setIconComp} />
//         )
//     case 'siteForm':
//     return (
//         <SiteForm />
//     )
//     default:
//         return (
//         <div>You are a User.</div>
//         )
// }