import React, {useContext} from 'react';
import {Button} from 'react-bootstrap';

import {IconContext} from '../IconProvider';


const LangForm = ({iconComp, setIconComp, skillsArr, setSkillsArr}) => {

    const {icons,progress} = useContext(IconContext)
    const [progressValue, setProgressValue] = progress;
    const [enumObj] = icons

    const setSkill = (val) =>{
        if(skillsArr.length===5){return}
        if(skillsArr.includes(val)){return}
        setProgressValue(progressValue + 8.3);
        setSkillsArr([...skillsArr,val]);   
    } 

    return(
        <div className="form-box">
            <h2>Pick your top 5 languages</h2>
            <div className="iconBox">
            <img src={enumObj.html} alt="" height="40" width="40" value="html" onClick={(e)=>setSkill('html')} disabled={skillsArr.includes("html")}  />
                <img src={enumObj.css} alt="" height="40" width="40" value="css" onClick={()=>setSkill('css')} />
                <img src={enumObj.js} alt="" height="40" width="40" value="js" onClick={()=>setSkill('js')} />
                <img src={enumObj.ruby} alt="" height="40" width="40" value="ruby" onClick={()=>setSkill('ruby')} />
                <img src={enumObj.python} alt="" height="40" width="40" value="python" onClick={()=>setSkill('python')} />
                <img src={enumObj.java} alt="" height="40" width="40" value="java" onClick={()=>setSkill('java')} />
                <img src={enumObj.swift} alt="" height="40" width="40" value="swift" onClick={()=>setSkill('swift')} />
            </div>
            {skillsArr.length === 5 ? 
            <Button className="mt-2" onClick={(e)=>setIconComp('frameForm')}>Next Step</Button> : "" }
        </div>

    )
}

export default LangForm;




