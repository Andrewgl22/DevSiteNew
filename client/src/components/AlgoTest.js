// var UserList = ["html","css","js"]
// var JobList = ["html","css","python"]


const calculateMatchPercentage = (UserList, JobList) => {
    const map1 = new Map();
    
    // store all jobs in a map
    for(let i=0;i<JobList.length;i++){
        map1.set(JobList[i])
        // console.log(JobList[i])
    }
    
    // compare users skills to job skills
    var count = 0
    for(let i=0;i<UserList.length;i++){
        if(map1.has(UserList[i])){
            count++;
        }
    }
    // calculate percentage match
    var percentage = Math.floor((count / JobList.length) * 100)
    // console.log(map1)
    // console.log(count)
    // console.log(percentage)

    // add percentage on to job
    return percentage;



}

//is this how you export a function?
export default calculateMatchPercentage;

// store job list into a hash map
// loop through hashmap and compare all values, counting # of matches
// use num of matches to create a percentage
// sort job list for user by percentages