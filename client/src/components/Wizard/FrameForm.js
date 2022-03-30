import React, {useContext} from 'react';
import {Button} from 'react-bootstrap';

import {IconContext} from '../IconProvider';


const FrameForm = ({setIconComp, skillsArr, setSkillsArr}) => {

    const {icons,progress} = useContext(IconContext)
    const [progressValue, setProgressValue] = progress;
    const [enumObj] = icons

    const setSkill = (val) =>{
        if(skillsArr.length===10){return}
        if(skillsArr.includes(val)){return}
        setProgressValue(progressValue + 4);
        setSkillsArr([...skillsArr,val]);   
    } 

    return(
        <div className="form-box">
        
            <h2>Pick your top 5 frameworks</h2>
            <div className="iconBox">
            <img src={enumObj.angular} alt="" height="40" width="40" value="html" onClick={()=>setSkill('angular')} disabled={skillsArr.includes("html")} />
                    <img src={enumObj.bootstrap} alt="" height="40" width="40" value="css" className="mr-1" onClick={()=>setSkill('bootstrap')} />
                    <img src={enumObj.django} alt="" height="40" width="40" value="js" onClick={()=>setSkill('django')} />
                    <img src={enumObj.react} alt="" height="40" width="40" value="ruby" onClick={()=>setSkill('react')} />
                    <img src={enumObj.jquery} alt="" height="40" width="40" value="python" onClick={()=>setSkill('jquery')} />
                    <img src={enumObj.node} alt="" height="40" width="40" value="java" onClick={()=>setSkill('node')} />
                    <img src={enumObj.vue} alt="" height="40" width="40" value="java" onClick={()=>setSkill('vue')} />
            </div>
            {skillsArr.length === 10 ? 
            <Button className="mt-2" onClick={(e)=>setIconComp('uploadForm')}>Next Step</Button> : "" }
        </div>

    )
}

export default FrameForm;




