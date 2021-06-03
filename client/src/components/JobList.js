import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const JobList = () => {

    const [devList,setDevList] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/devs')
        .then((res)=>{
            setDevList(res.data)
        })
        .catch((err)=>console.log(err))
    },[]);

    return(
        <div className="job-list col-2 ml-5 justify-content-between" style={{overflow:"scroll", height:"430px"}}>
            <h3>Open Jobs</h3>
            {devList.map((job,idx)=>(
                job.type === 'job' ?
                <p style={{color:"black"}}><b>{job.company}-</b><Link to={`/jobpost/${job._id}`} className="job-link" >{job.name}</Link></p>              
                :
                undefined
                )      
                
            )}


        </div>

    )
}

export default JobList;