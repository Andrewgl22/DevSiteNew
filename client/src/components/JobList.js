import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import calculateMatchPercentage from './AlgoTest'

const JobList = () => {

    const [jobList,setJobList] = useState([])

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)
    console.log(loggedUser1)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/getAllJobs')
        .then((res)=>{
            for(let i=0;i<res.data.length;i++){
                let percentage = calculateMatchPercentage(loggedUser1.skills, res.data[i].skills)
                res.data[i].perc = percentage;
                console.log(res.data[i])
            }
            setJobList(res.data)
        })
        .catch((err)=>console.log(err))
    },[]);

    return(
        <div className="ml-5 justify-content-between border border-dark" style={{overflow:"scroll", height:"430px"}}>
            <h3>Open Jobs</h3>
            {jobList.sort((a,b)=>a.perc < b.perc ? 1:-1).map((job,idx)=>(
                <p style={{color:"black"}}><b>{job.company}-</b><Link to={`/jobpost/${job._id}`} className="job-link" >{job.position} {job.perc}</Link></p>              
                )      
                
            )}


        </div>

    )
}

export default JobList;