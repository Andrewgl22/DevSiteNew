import React, {useContext} from 'react';
import {IconContext} from './IconProvider'

const ProgressBar = (props) => {

    const {progress} = useContext(IconContext)
    const [progressVal] = progress;

    const progColor = () => {
        if(progressVal < 33){
            return "bg-danger"
        } else if(progressVal >= 80){
            return "bg-success"
        }
        
        else if(33 < progressVal < 80){
            return "bg-warning"
        }
    }

    
 
    return (
        <div className="progress col-6 col-sm-4 mb-3 mt-3">
            <div className={`progress-bar ${progColor()} `} role="progressbar" style={{width: `${progressVal}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.round(progressVal)}%</div>
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