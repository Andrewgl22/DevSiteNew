import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const JobList = () => {

    const [jobList,setJobList] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/getAllJobs')
        .then((res)=>{
            console.log(res)
            setJobList(res.data)
        })
        .catch((err)=>console.log(err))
    },[]);

    return(
        <div className="ml-5 justify-content-between border border-dark" style={{overflow:"scroll", height:"430px"}}>
            <h3>Open Jobs</h3>
            {jobList.map((job,idx)=>(
                <p style={{color:"black"}}><b>{job.company}-</b><Link to={`/jobpost/${job._id}`} className="job-link" >{job.position}</Link></p>              
                )      
                
            )}


        </div>

    )
}

export default JobList;